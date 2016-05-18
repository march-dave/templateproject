var app = angular.module('gulpApp');

app.controller('mainCtrl', function($scope) {
  console.log('HEY!!! mainCtrl!');

  $scope.alert = () => {
    alert('ALERT!');
    console.log('this:', this);
  };
});
