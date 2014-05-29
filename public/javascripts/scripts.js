
 $(document).ready(function(){

 	$('#set').change(function(){
 		var _this = $(this),
 			cards = $('#cards');
 		window.location = "/" +  _this.val();
 	});

 	$('#cards').change(function(){
 		var _this = $(this),
 			set = $('#set');

 		window.location = "/" + set.val() + '/' + _this.val();

 	});

 });
//http://api.mtgapi.com/v1/card/set/