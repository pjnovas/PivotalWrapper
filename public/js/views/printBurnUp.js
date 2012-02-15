
$(document).ready(function(){
	window.pid = $('#burnUp').attr('pid');
	window.rid = $('#burnUp').attr('rid');
	
	getAllIterations();
});

function getAllIterations(){
	
	$.ajax({
		type: "GET",
		url: '/projects/' + window.pid + "/iterations.json",
		contentType: "application/json",
		error: function(jqXHR){
			alert(jqXHR.status + ' - ' + jqXHR.statusText + '. Error: ' + jqXHR.responseText);
		},
		success: function(data){
			window.iterations = data;
			getReleaseStories();
		},
		complete: function(jqXHR){
			
		}
	});	
}

function getReleaseStories(){
	
	$.ajax({
		type: "GET",
		url: '/projects/' + window.pid + "/stories/label/" + window.rid,
		contentType: "application/json",
		error: function(jqXHR){
			alert(jqXHR.status + ' - ' + jqXHR.statusText + '. Error: ' + jqXHR.responseText);
		},
		success: function(data){
			mergeStories(data);
		},
		complete: function(jqXHR){
			
		}
	});	
	
}

function mergeStories(labelsStories){
	var sprints = window.iterations,
		label = window.rid.replace(/-/g, " ");
	
	function setLabel(sid){
		for(var k=0; k<labelsStories.length; k++)
			return (sid === labelsStories[k].id);
	}
	
	for(var i=0; i < sprints.length; i++){
		var stories = sprints[i].stories;
		for(var j=0; j<stories.length; j++){
			if (setLabel(stories[j].id))
				sprints[i].stories[j].label = label;
		}
	}
	
	$('.loading').remove();
	createChart();
}

function createChart(){
	var sprints = window.iterations,
		release = window.rid.replace(/-/g, " ");
		projection = [],
		storyRoof = [],
		storyDone = [],
		sprintsAmm = sprints.length,
		donePoints = [0];
		releasePoints = 0;
		y = 0,
		projectionFactor = 0,
		ticksSprints = [],
		today = new Date(); //new Date('2012/02/08');
	
	function setReleasePoints(){
		var spDonePoints = 0;
		for(var i=0; i<sprintsAmm; i++){
			var stories = sprints[i].stories;
			
			var exit = false;
			
			for(var j=0; j<stories.length; j++){
				var story = stories[j];
				
				if (story.label === release){
					if (story.type === "release"){
						exit = true;
						break;
					}
					if (story.type === "feature"){
						releasePoints += parseFloat(story.estimate);
						
						if (story.state === "accepted")
							spDonePoints += parseFloat(story.estimate);
					}
					
				}
			}
			donePoints.push( spDonePoints );
			if (exit) return;
		}
	}
	
	setReleasePoints();
	projectionFactor = releasePoints / sprintsAmm;
	
	for(var i=0; i< sprintsAmm+1; i++){
		storyRoof.push([i, releasePoints]);
		projection.push([i, y]);
		y += projectionFactor;
		
		function pushDones(){
			storyDone.push([i, donePoints[i]]);
		}
		
		var spInfo = "";
		if (i > 0){
			
			var spDate = new Date(sprints[i-1].end.substr(0,10));
			var spDateStr = $.datepicker.formatDate("dd/mm", spDate);
			spInfo = i.toString() + ' - ' + spDateStr;
			
			if (spDate <= today) pushDones();
		}
		else pushDones();
		
		ticksSprints.push([i, spInfo]);
	}
	
	$.plot($("#burnUp"), [
			{
		        data: projection,
		        points: { show: true, fill: true, fillColor: 'gray' , radius: 3 },
		        lines: { show: true, fill: false, lineWidth: 3 },
		        shadowSize: 0,
		        color: "gray"
	       },
	       {
		        data: storyDone,
		        points: { show: true, fill: true, fillColor: 'red' , radius: 5 },
		        lines: { show: true, fill: false, lineWidth: 5 },
		        shadowSize: 0,
		        color: "red"
	       },
	       {
		        data: storyRoof,
		        points: { show: true, fill: true, fillColor: 'blue' , radius: 5 },
		        lines: { show: true, fill: false, lineWidth: 5 },
		        shadowSize: 0,
		        color: "blue"
	       }], {
		        xaxis: {
	            	ticks: ticksSprints
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
