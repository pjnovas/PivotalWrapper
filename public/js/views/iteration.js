
$(document).ready(function(){
	
	window.pURL = $('#hproject').attr('href');

	var $navItems = $('li');
	$('a', $navItems).bind('click', function(){
		
		$navItems.removeClass('active');
		$(this).parents('li').addClass('active');

		getIterations();
	});

	$('a.stories', '#sprints').live('click', function(){
		$('ul.storyList', $(this).parents('li')).toggle('fast');	
	});

	updateNav();
	getIterations();
});

function updateNav(){
	var hash = window.location.href.split('#');
	if (hash.length>1){
		var $navItems = $('li');
		$navItems.removeClass('active');
		$('a[href=#' + hash[1] + ']', $navItems).parents('li').addClass('active');
	}
}

function getIterations(){

	$("#sprints li").remove();
	$("<li>").append("<div class='loading'></div>").appendTo("#sprints");

	var which = $('li.active a', 'ul.nav-pills').attr('href').substr(1);
	
	$.ajax({
		type: "GET",
		url: window.pURL + "/iterations/" + which,
		contentType: "application/json",
		error: function(jqXHR){
			alert(jqXHR.status + ' - ' + jqXHR.statusText + '. Error: ' + jqXHR.responseText);
		},
		success: function(data){
			bindIterations(data);
		},
		complete: function(jqXHR){
			
		}
	});	
}

function bindIterations(sprints){
	$("#sprints li").remove();
    $("#tmplSprint").tmpl(sprints).appendTo("#sprints");
}

