define(['app'],function(app){
    app.register
    .controller('homeCtrl', function($scope,$http,$interval){
    	$scope.myPagingFunction = function(){
    		console.log(1234);
    	}
    	//热门品牌
    	$http({
		url:'scripts/fileJson/hotBrand.json',
		method:'GET'
		}).success(function(data,header,config,status){
			$scope.hotBrands = data.data;
		}).error(function(data,header,config,status){
		});

		//试用产品
		$http({
		url:'scripts/fileJson/license.json',
		method:'GET'
		}).success(function(data,header,config,status){
			//倒计时时间处理
			var time = new Date();
			var now = time.getTime();
			var val = data.data;
			//for(var a in val){var obj = val[a];obj.jud = obj.end*1000>now?1:0;}
			$scope.license = val;
			$.each($scope.license, function(i,value){
				var sTime = value;
				var times = $interval(function(){
					var date = new Date(sTime.end*1000);
					var time = new Date();
					var now = time.getTime();
					var leftTime=date.getTime()-now;
					if(leftTime>0){
						var leftsecond = parseInt(leftTime/1000); 
						var day=Math.floor(leftsecond/(60*60*24)); 
						var hour=Math.floor((leftsecond-day*24*60*60)/3600); 
						var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60); 
						var second=Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60);
						if(day<10){day="0"+day;}
						if(hour<10){hour = "0"+hour}
						if(minute<10){minute = "0"+minute}
						if(second<10){second = "0"+second}
						$scope.license[i].eTime = "倒计时:"+day+"天"+hour+"小时"+minute+"分"+second+"秒";
						$scope.license[i].jud = 1;
					}else{
						$scope.license[i].eTime = "已经结束";
						$scope.license[i].jud = 0;
					}
				},1000)
			});
		}).error(function(data,header,config,status){
		});
    });
    //下拉刷新指令
    app.register
    .directive("infiniteScroll", ["$rootScope", "$window", "$timeout",
	function(i, n, e) {
	    return {
	        link: function(t, l, o) {
	            var r, c, f, a;
	            return n = angular.element(n),
	            c = function() {
	                var e = l.offset().top + l.height();
	                var d = n.height() + n.scrollTop();
	                return e-d<0?t.$apply(o.infiniteScroll):false;
	            },
	            n.on("scroll", c),
	            t.$on("$destroy",
	            function() {
	                return n.off("scroll", c)
	            }),
	            e(function() {
	                return o.infiniteScrollImmediateCheck ? t.$eval(o.infiniteScrollImmediateCheck) ? c() : void 0 : c()
	            },
	            0)
	        }
	    }
	}]);
})