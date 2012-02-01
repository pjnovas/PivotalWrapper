
var pivotal = require('../pivotalAPI/iterations');
var projectModel = require('../models/project');
var storyModel = require('../models/story');
var taskModel = require('../models/task');

exports.Iteration = function() {
	
}

var mapToEntity = function(i, pid){
	var stories = [];

	if (!i.stories.story.length){
		stories = storyModel.mapStoryList([i.stories.story], {
				id: pid,
				name: ""
			});	
	}
	else {
		stories = storyModel.mapStoryList(i.stories.story || i.stories, {
				id: pid,
				name: ""
			});
	}

	
	return {
		id: i.id,
		number: i.number,
		start: i.start,
		end: i.finish,
		strength: i.team_strength * 100,
		stories: stories,
		storyAmm: 0,
		tasksAmm: 0
	};
}

var mapListToEntity = function(is, pid){
	var list = [];
	for (var i = 0; i < is.length; i++){
		list.push(mapToEntity(is[i], pid));
	}
	return list;
}

var fillStoriesAndTasks = function(iteration, proj, cb){
	var i = 0,
		sprint = mapToEntity(iteration, proj.id);

	function fillStory(){
		if (i < sprint.stories.length){

			sprint.storyAmm += parseFloat(sprint.stories[i].estimate);

			taskModel.Task.getStoryTasks(proj.id, sprint.stories[i].id, function(tasks){
				sprint.stories[i].tasks = tasks;

				for(var k=0; k < tasks.length; k++)
					sprint.tasksAmm += tasks[k].estimate;

				i++;
				fillStory();	
			});

		}
		else cb(sprint);
	}

	fillStory();
}

exports.Iteration.getCurrent = function(pid, cb){

	projectModel.Project.getOne(pid, function(proj){

		pivotal.getIteration(pid, 'current', function(iteration){
			fillStoriesAndTasks(iteration, proj, cb);
		});
	});
};

exports.Iteration.getCurrentBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'current_backlog', function(iterations){
		cb( mapListToEntity(iterations, pid) );
	});
};

exports.Iteration.getBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'backlog', function(iterations){
		cb( mapListToEntity(iterations, pid) );
	});
};

exports.Iteration.getAll = function(pid, cb){
	pivotal.getAllIterations(pid, function(iterations){
		cb( mapListToEntity(iterations, pid) );
	});
};

exports.Iteration.getDone = function(pid, howMany, cb){
	pivotal.getDoneIterations(pid, howMany , function(iterations){
		cb( mapListToEntity(iterations, pid) );
	});
};

exports.Iteration.getOne = function(pid, iteId, cb){
	pivotal.getIterationById(pid, iteId , function(iteration){
		cb( mapToEntity(iteration, pid) );
	});
};

