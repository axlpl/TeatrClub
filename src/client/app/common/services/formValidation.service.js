import angular from 'angular';

angular
  .module('TeatrClubCommon')
  .factory('FormValidation', () => {
    return {
      hasError
    };

    function hasError(name, form, hasClickedOnSubmit) {
      if (!form[name]) return;

      return form[name].$error &&
        form[name].$invalid &&
        (form.$submitted || form[name].$touched || hasClickedOnSubmit);
    }
  });
