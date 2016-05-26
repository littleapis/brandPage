define(['app'],function(app){
    app.register
    .controller('registerCtrl', function($scope,$http,$interval){
    	$scope.save = function(){
    		console.log("保存成功")
    	}
    });
})