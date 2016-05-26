define(['app','animation'],function(app){
    app.register
    //初始化控制器
    .controller('detailCtrl', function($scope,$http,$stateParams,$templateCache){
    	//get news info
    });
    //初始化过滤器
    app.register
    .filter('trustHtml', function ($sce) {
        return function(input){
            return $sce.trustAsHtml(input);
        }
    });
    //初始化指令
    app.register
    //轮播指令
    .directive('lunbo',['readJSON','apis_swipe', function (readJSON,apis_swipe) {
        return{
            restrict:'EA',
            templateUrl:'tpls/carousel.html',
            scope:{},
            replace:true,
            link: function (scope, element, attr) {
                //创建轮播信息
                var promise=readJSON.query();
                var step=0;
                promise.then(function (data) {
                    scope.images=data.data.img;
                    scope.$parent.detailInfo = data.data;
                    setTimeout(function(){
                        var li = element.find("li");
                        element.css({
                            "width":$(window).width()*li.length,
                            "overflow":"hidden"
                        }).find("li").css({
                            "width":$(window).width(),
                            "float":"left"
                        })
                        //绑定滑动事件
                        apis_swipe.qurey({
                            div:element[0],
                            left:function(){
                                step--;
                                var index = Math.abs(step%li.length);
                                element.animate({"margin-left":$(window).width()*(-1)*index},300);
                            },
                            right:function(){
                                step++;
                                var index = Math.abs(step%li.length);
                                element.animate({"margin-left":$(window).width()*(-1)*index},300);
                            }
                        });
                    },0)
                });
            }
        }
    }]);
    //轮播服务（延迟加载）
    app.register
    .service('readJSON',['$http','$q', function ($http,$q) {
        return {
            query: function () {
                var deferred=$q.defer();
                $http({
                    method:'GET',
                    url:'scripts/fileJson/detail.json'
                }).success(function (data, status, header, config) {
                    deferred.resolve(data);
                }).error(function (data, status, header, config) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
    }]);
    //滑动服务
    app.register
    .service('apis_swipe',['$http',function(){
        return {
            pressX:0,
            pressY:0,
            limit:false,
            qurey:function(options){
                var hoster = this;
                options.div.addEventListener("touchmove",
                function(event) {
                    if (event.targetTouches.length == 1) {
                        if (hoster.limit) {
                            return false
                        }
                        hoster.limit = true;
                        var touch = event.targetTouches[0];
                        var spanX = touch.pageX - hoster.pressX;
                        var spanY = touch.pageY - hoster.pressY;
                        var direct = "none";
                        //左右
                        if (Math.abs(spanX) > Math.abs(spanY)) {
                            if (spanX > 0) {
                                direct = "right";
                                options.right();
                            } else {
                                direct = "left";
                                options.left();
                            }
                        }
                        //上下
                        // else {
                        //     if (spanY > 0) {
                        //         direct = "down"
                        //     } else {
                        //         direct = "up"
                        //     }
                        // }
                    }
                },
                false);
                options.div.addEventListener("touchstart",
                function(event) {
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        hoster.pressX = touch.pageX;
                        hoster.pressY = touch.pageY
                    }
                },
                false);
                options.div.addEventListener("touchend",
                function(event) {
                    hoster.limit = false;
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        touchEnd.value = touch.pageX + ";" + touch.pageY
                    }
                },
                false)
            }
        }
    }])
})