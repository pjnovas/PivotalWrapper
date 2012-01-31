
$(document).ready(function(){
	window.pid = $('#burnDown').attr('projId');
	getCurrentIteration();
	
	/* B FOR TEST **********************
	window.sprint = {
		tasksAmm: 8,
		start: '2012/25/01'
	}
	createChart();
	/* E FOR TEST **********************/
	
	
	$('.tickLabel').live('click', function(){
		window.sprint.NoDates = window.sprint.NoDates || [];
		window.sprint.NoDates.push($(this).text());
		createChart();
	});
});

function getCurrentIteration(){
	
	$.ajax({
		type: "GET",
		url: '/projects/' + window.pid + "/iterations/current",
		contentType: "application/json",
		error: function(jqXHR){
			alert(jqXHR.status + ' - ' + jqXHR.statusText + '. Error: ' + jqXHR.responseText);
		},
		success: function(data){
			window.sprint = data;
			$('.loading').remove();
			createChart();
		},
		complete: function(jqXHR){
			
		}
	});	
}

function createChart(){
	var ts = window.sprint.tasksAmm,
		axes = [],
		startDate = new Date(window.sprint.start.substr(0,10)),
		days = 9,
		y = 0,
		f = ts/days,
		ticksTasks = [],
		ticksDates = [],
		noDates = window.sprint.NoDates;
	
	for(var i=days+1; i>0; i--){
		axes.push([i, y]);
		y+=f;
	}
	
	for (var i=0; i<=ts+2; i++){
		ticksTasks.push([i]);
	}
	
	var i=0;
	do {
		var dtStr = $.datepicker.formatDate("dd/mm", startDate);
		
		function isNoDate(){
			for (var j=0; j<noDates.length;j++){
				if (dtStr === noDates[j]) return true;
			}
			return false;
		}
		
		if (noDates && isNoDate()){
			startDate.addBusDays(1);
		} else { 
			ticksDates.push([i, dtStr]);
			startDate.addBusDays(1);
			i++;
		}
	} while(i<=days+1)
	
	$.plot($("#burnDown"), [
			{
		        data: axes,
		        points: { show: true, fill: true, fillColor: '#000' , radius: 5 },
		        lines: { show: true, fill: false, lineWidth: 5 },
		        shadowSize: 0,
		        color: "#000"
	        }
	        ], {
		        xaxis: {
	            	ticks: ticksDates
		        },
		        yaxis: {
		            ticks: ticksTasks
		        },
		        grid: {
		            backgroundColor: { colors: ["#fff", "#fff"] },
		            borderColor: 'silver',
		            borderWidth: 1,
		            labelMargin: 10
		        }
        	}
	);
	
}


Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}

Date.prototype.addBusDays = function(dd) {
	var wks = Math.floor(dd/5);
	var dys = dd.mod(5);
	var dy = this.getDay();
	if (dy === 6 && dys > -1) {
	   if (dys === 0) {dys-=2; dy+=2;}
	   dys++; dy -= 6;}
	if (dy === 0 && dys < 1) {
	   if (dys === 0) {dys+=2; dy-=2;}
	   dys--; dy += 6;}
	if (dy + dys > 5) dys += 2;
	if (dy + dys < 1) dys -= 2;
	this.setDate(this.getDate()+wks*7+dys);
}