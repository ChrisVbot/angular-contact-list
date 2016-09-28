angular.
  module('contactApp').
  component('contactList', {
    template: 
    '<button ng-click="all()">' + 'Click for all contacts' + '</button>' + 
    'Search: ' +
      '<input ng-model="$ctrl.query" />' + 
    'Sort by: ' +
      '<select ng-model="$ctrl.orderProp">' + 
        '<option value="first_name">First name</option>' + 
        '<option value="last_name">Last name</option>' + 
        '<option value="phone_number">Phone number</option>' + 
        '<option value="email">Email</option>' + 
      '</select>' + 
      '<ul>' + 
        '<li ng-repeat="name in $ctrl.users | filter: $ctrl.query | orderBy: $ctrl.orderProp">' +
          '{{name.first_name}}' + ' ' + 
          '{{name.last_name}}' + ' ' + 
          '{{name.phone_number}}' + ' ' +
          '{{name.email}}' + 
        '</li>' +
      '</ul>' + 
      '<input type="text" name="firstName" placeholder="First name" ng-model="firstName" required />' +
      '<input type="text" name="firstName" placeholder="Last name" ng-model="lastName" required />' +
      '<input type="text" name="firstName" placeholder="Email" ng-model="email" required />' +
      '<input type="text" name="firstName" placeholder="Phone number" ng-model="phoneNumber" required />' +
      '<button ng-click="newEntry()">Submit</button>' + 
      '<p>{{newUser}}</p>'
      ,
    controller: function ContactListController($scope, $http){
      var self = this;
      self.orderProp = 'first_name';

      $scope.all = function(){
      $http.get('/api/contacts/').then(function(response){
        self.users = response.data
      });
      };

      $scope.newEntry = function(){
        var data = {
          firstname: $scope.firstName,
          lastname: $scope.lastName,
          email: $scope.email,
          phoneno: $scope.phoneNumber
        };
        $http.post('/api/new/', JSON.stringify(data)).then(function(response){
          console.log(response.data)
          self.newUser = response.data
        });
      }
    }
  })