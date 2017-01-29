const express = require('express');
const mysql = require('mysql');
const qr = require('qr-image');
const md5 = require('md5');

const router = express.Router();

const response = {
	'status': 'success',
	'data': null,
	'message': ''
};

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'manager'
});

router.get('/:id/:party_id', function (req, res) {
	const facebook_id = req.params.id;
	const party_id = req.params.party_id;

	var a = db.query(`SELECT * FROM tickets WHERE facebook_id = ${db.escape(facebook_id)} and party_id = ${db.escape(party_id)}`, function (err, result) {
		if (result.length > 0) {
			const hash = md5(result[0].email + facebook_id + result[0].party_id);
			console.log(md5, result[0].email + facebook_id + result[0].party_id)
			response.status = 'success';
			response.message = 'ticked_already_created';
			response.data = qr.imageSync(`https://teatrclub.pl/tickets/check/${hash}`, { type: 'svg' });
		} else {
			response.status = 'success';
			response.message = 'no_ticket';
		}
		return res.json(response);
	});
	console.log(a.sql);
});

router.post('/', function (req, res) {
	const name = req.body.name;
	const email = req.body.email;
	const facebook_id = req.body.id;
	const party_id = 1;

	db.query(`SELECT COUNT(facebook_id) as fb_count FROM tickets WHERE ?`, [facebook_id, party_id],
		function (err, result) {
			if (err) {
				response.status = 'error';
				response.message = 'error';
				return res.json(response);
			}

			if (result[0].fb_count > 0) {
				response.status = 'error';
				response.message = 'error';
				return res.json(response);
			} else {
				db.query(`INSERT INTO tickets (facebook_id, party_id, name, email) VALUES (?)`, [[facebook_id, party_id, name, email]],
					function(err, result) {
						if (err) {
							response.status = 'error';
							response.message = 'error';
						}

						if (res) {
							const hash = md5(email + facebook_id + party_id);
							console.log(md5, email + facebook_id + party_id)
							response.status = 'success';
							response.message = 'ticket_ready';
							response.data = qr.imageSync(`https://teatrclub.pl/tickets/check/${hash}`, { type: 'svg' });
						}
						return res.json(response);
					}
				);
			}
		}
	);
});


module.exports = router;