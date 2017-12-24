"use strict";

var app = angular.module("game", ["ngRoute", "ngResource"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/page/:name", {
            templateUrl : function (page) {
             //   console.log(page.name);
                return "assets/"+page.name+".html"
            },
            controller: "pagesController"
        })
        .otherwise("/page/start");
})

.controller("pagesController",function($scope, $http){
    $http({
        method: 'GET',
        url: '?controller=user'
    }).then(function (data){
        $scope.users = data;
        console.log("pagesController" + $scope);
    },function (error){
        console.log(error);
    })
})

.controller("menuController", function ($scope, $http) {
    $http({
        method: 'GET',
        url: '?controller=menu'
    }).then(function (data){
        console.log("menu controller active");
        $scope.items = data;
    },function (error){
        console.log(error + "menu error");
    });
})

.controller("gameController", function ($scope, $rootScope, $http, $location) {

    $scope.level = 1;
    $scope.health = 100;
    $scope.score = 0;

    $rootScope.$on('EnemyIsAlive', function () {
        $scope.level++;
        $scope.power = 20 + $scope.level;
        $scope.health = $scope.health - $scope.power;
        if($scope.health<=0) $rootScope.$emit('endGame');
    });

    $rootScope.$on('EnemyIsDead', function () {
        $scope.level++;
        $scope.score += 100*parseInt($scope.level);

    });

    $rootScope.$on('HealUser', function () {
        if($scope.health<=95)
            $scope.health+=5;
        else $scope.health = 100;
    });


    $rootScope.$on('endGame', function () {
        $rootScope.totalScore = $scope.score;
        $location.path('/page/game_over');
    });

    $scope.sendData = function () {
        $http.post("?controller=user",
            {id:0, name: $scope.entername.username.$modelValue, score: $rootScope.totalScore})
            .success(function () {
                $location.path('/page/start');
            })
    }
})

.controller("EnemyController", function ($http, $scope, $interval, $timeout, $rootScope) {

    $scope.image = "/images/enemy.png";
    $scope.speed = 1;
    $scope.active = "hidden";

    var timer;
    var timer2;
    var animation, time = 0;

    $scope.move = function ()
    {
        $scope.active = "visible";
        var randomParameter1 = Math.random()*40;
        var randomParameter2 = Math.random()*15;
        var randomParameter3 = Math.random()*40;
        var randomParameter4 = Math.random()*20;
        animation = $interval(function () {
            time += parseInt($scope.speed) / 8;
            $scope.x = randomParameter1 * Math.sin(time / 40) + randomParameter3;
            $scope.y = randomParameter2 * Math.cos(time / 10) + randomParameter4;
        }, 30);

        timer = $timeout(function () {
            $scope.notKilled();

        }, 5000);

        timer2 = $timeout(function () {
            $scope.heal();
        }, 3000)

    };

    $scope.move();

    var isEnd = false;
    $scope.heal = function () {
        $rootScope.$emit('HealUser');
    };

    $scope.notKilled = function () {
        $rootScope.$emit('EnemyIsAlive');
        $scope.stop();
    };

    $scope.killed = function () {
        $rootScope.$emit('EnemyIsDead');
        $scope.stop();

    };

    $scope.stop = function () {
        $timeout.cancel(timer);
        $scope.active = "hidden";
        if($scope.speed < 16)
            $scope.speed+=0.5;
        $interval.cancel(animation);
        time = 0;

        if(!isEnd) $scope.move();

    };

    $rootScope.$on('endGame', function () {
        isEnd = true;
    });
})


.directive("header", function(){
    return {
        templateUrl:"./assets/directives/header.html",
        replace: true,
        restrict: 'E',
        scope:{},
        controller: "menuController"
    }
})

.directive("enemy", function () {
    return {
        templateUrl: "./assets/directives/enemy.html",
        replace: true,
        restrict: 'E',
        scope: {},
        controller: "EnemyController"
    }
});