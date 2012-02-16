/**
 * @author pjnovas
 */

$(document).ready(function(){
	bindLoginCtrls();
});

function bindLoginCtrls(){
	$('#changeLogin').bind('click', function(){
		$('#loginUserPass').toggle();
		$('#loginToken').toggle();
	});
}




