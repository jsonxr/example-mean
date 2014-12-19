
  

var app = angular.module('example', ['ngRoute']);

// Config
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'app/list.html',
    controller: 'CustomerListCtrl'
  });
  $routeProvider.when('/new', {
    templateUrl: 'app/new.html',
    controller: 'CustomerNewCtrl'
  });
  $routeProvider.when('/view/:id', {
    templateUrl: 'app/view.html',
    controller: 'CustomerViewCtrl'
  });
  $routeProvider.when('/edit/:id', {
    templateUrl: 'app/edit.html',
    controller: 'CustomerEditCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  
  
}]);


app.controller('CustomerListCtrl', ['$scope', '$http', '$location', CustomerListCtrl]);
function CustomerListCtrl($scope, $http, $location) {
  $http( { method: 'GET', url: 'customers' })
    .success(function (data) {
      console.log(data);
      $scope.customers = data;
    });

  $scope.delete = function (id) {
    $http.delete('/customers/' + id)
      .success(function () {
        // Find element from array
        for (var i = 0; i < $scope.customers.length; i++) {
          var c = $scope.customers[i];
          if (c._id === id) {
            $scope.customers.splice(i,1);
            break;
          }
        }
      })
  }
}

app.controller('CustomerViewCtrl', ['$scope', '$http', '$routeParams', '$location', CustomerViewCtrl]);
function CustomerViewCtrl($scope, $http, $routeParams, $location) {
  var id = $routeParams.id;
  $http( { method: 'GET', url: 'customers/' + id })
    .success(function (data) {
      console.log(data);
      $scope.customer = data;
    });
    
    $scope.edit = function () {
      $location.url('edit/' + id);
    }
}

app.controller('CustomerEditCtrl', ['$scope', '$http', '$routeParams', '$location', CustomerEditCtrl]);
function CustomerEditCtrl($scope, $http, $routeParams, $location) {
  var id = $routeParams.id;
  $http( { method: 'GET', url: 'customers/' + id })
    .success(function (data) {
      $scope.customer = data;
  });

  $scope.submit = function () {
    var json = $scope.customer;
    $http.put('customers/' + id, json)
      .success(function (data) {
        $location.url('view/'+id);
    });
  }
}


app.controller('CustomerNewCtrl', ['$scope', '$http', '$location', CustomerNewCtrl]);
function CustomerNewCtrl($scope, $http, $location) {
  $scope.customer = {};

  $scope.submit = function () {
    var json = $scope.customer;
    $http.post('customers', json)
      .success(function (data) {
        $location.url('/')
      });
  }
  
}
