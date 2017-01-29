import angular from 'angular';

angular
  .module('TeatrClubCommon')
  .directive('imageFromSvg', /* @ngInject */ ($document) => {
    return {
      restrict: 'E',
      templateUrl: 'app/common/views/image-from-svg.html',
      require: 'ngModel',
      scope: {
        imageSVG: '=ngModel'
      },
      link: function ($scope) {
        const image = $scope.$watch(() => $scope.imageSVG, (value) => {
            if (value != '') {
              const svg64 = btoa($scope.imageSVG);
              const b64Start = 'data:image/svg+xml;base64,';
              const image64 = b64Start + svg64;
              $scope.image = image64;
              image();
            }
          });
      }
    }
  });