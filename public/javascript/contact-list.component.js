angular.
  module('contactApp').
  component('contactList', {
    templateUrl: '/api/template/',
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
          $scope.all();
          self.newUser = response.data;
          $scope.firstName = "";
          $scope.lastName = "";
          $scope.email = "";
          $scope.phoneNumber = "";
        });
      };

      $scope.delete = function(item){
        console.log(item.id);
        var id = item.id;
        var data = {
          id: id
        };
        $http.post('/api/delete/', JSON.stringify(data)).then(function(response){
          $scope.all();
        });
      };
    }
    
  });