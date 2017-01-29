import angular from 'angular';

angular
  .module('TeatrClubCommon')
  .directive('selectBox', /* @ngInject */ ($document) => {
    return {
      restrict: 'E',
      templateUrl: 'app/common/views/select-box.html',
      require: 'ngModel',
      scope: {
        values: '=',
        value: '=ngModel'
      },
      link: function ($scope, $element, $attrs) {
        $scope.isOpen = false;
        $scope.name = $attrs.name;
        $scope.required = ($attrs.required) ? true : false;

        $scope.setValue = (value) => {
          $scope.isOpen = false;
          $scope.value = value;
        };

        $scope.open = () => {
          $scope.isOpen = !$scope.isOpen;
        };

        $element.on('click', (event) =>{
          event.selectBoxOrigin = $element;
        });

        $document.on('click', (event) => {
          if (event.selectBoxOrigin !== $element) {
            $scope.$apply(()=> {
              $scope.isOpen = false;
            })
          }
        });
      }
    }
  });