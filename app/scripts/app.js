define(['router'],function(){
    var app = angular.module("myapp", ['ui.router'])
    app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){      
        app.register = {
            //得到$controllerProvider的引用
            controller : $controllerProvider.register,
            //同样的，这里也可以保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            service: $provide.service
        };
    })
    .run(function($rootScope,$state,$stateParams,$templateCache){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $templateCache.put("tpls/carousel.html");
        $rootScope.tab = 1;//default
    })
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/index');
        $stateProvider
        //新闻页面-主界面
        .state('index',{
            url:"/index",
            controller: 'homeCtrl',
            templateUrl: 'tpls/home.html',
            resolve: {
                loadCtrl: ["$q", function($q) { 
                    var deferred = $q.defer();
                    //异步加载controller／directive/filter/service
                    require([
                        'controllers/mainController' 
                    ], function() { deferred.resolve(); });
                    return deferred.promise;
                }]
            }
        })
        .state('detail',{
            url:'/detail/{articleId:[0-9]{1,4}}',
            controller:'detailCtrl',
            templateUrl:'tpls/detail.html',
            resolve: {
                loadCtrl: ["$q", function($q) { 
                    var deferred = $q.defer();
                    //异步加载controller／directive/filter/service
                    require([
                        'controllers/detailController' 
                    ], function() { deferred.resolve(); });
                    return deferred.promise;
                }]
            }
        })
        .state('register',{
            url:'/register',
            controller:'registerCtrl',
            templateUrl:'tpls/register.html',
            resolve:{
                loadCtrl: ["$q", function($q) { 
                    var deferred = $q.defer();
                    //异步加载controller／directive/filter/service
                    require([
                        'controllers/registerController' 
                    ], function() { deferred.resolve(); });
                    return deferred.promise;
                }]
            }
        })
    }) 
　　return app;
})