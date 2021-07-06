var app = angular.module('myApp',['ngRoute']);

app.controller('myController',['$scope','dataService',function($scope,dataService){
    
    $scope.store = dataService.store;
    $scope.cart = dataService.cart;
    
    $scope.addProductToCart = function(product){        
        $scope.cart.addProduct(product);
        console.log('$scope.cart=',$scope.cart);
    }
    
     $scope.removeProductToCart = function(product){        
        $scope.cart.removeProduct(product);
        console.log('$scope.cart=',$scope.cart);
    }
     
    $scope.filterNotInCart = function(prod){
        let result = true;
        $scope.cart.products.forEach(function(product,index){
            if(product.id===prod.id){
                result=false;
            }
        });
        return result;
    }
     
      // save items to local storage when unloading
    let _cart = $scope.cart;
    $scope.$on('onBeforeUnload', function (e, confirmation) {
          _cart.saveItems();
        confirmation.message = "All data willl be lost.";
        e.preventDefault();
    });
    $scope.$on('onUnload', function (e) {
        console.log('leaving page'); // Use 'Preserve Log' option in Console
    });
    
}]);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
     $routeProvider
        .when("/viewcart", {
            templateUrl: "templates/myCart.html"
        })
        .when("/", {
            templateUrl: "templates/main.html"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.factory('beforeUnload', function ($rootScope, $window) {

    // Events are broadcast outside the Scope Lifecycle
    
    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };
    
    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };

    return {};
})
.run(function (beforeUnload) {
    // Must invoke the service at least once
});


app.factory('dataService',function(){
    var myStore = new store();
    myStore.addProducts();
    
    var myCart = new Cart();
    
    return {
        store: myStore,
        cart: myCart
    };
    
});