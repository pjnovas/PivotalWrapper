
var pivotal = require('../utils/pivotal/API-helper');
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

exports.Iteration.get = function(pid, which, cb){
	
	projectModel.Project.getOne(pid, function(proj){
		
		pivotal.call('getIteration', {
			pid: pid,
			which: which,
			success: function(result){
				if (which === 'current'){
					fillStoriesAndTasks(result.iteration, proj, cb);
				}
				else cb(mapListToEntity(result.iteration || [result]));
			},
			error: function(err){
				//TODO: handle error
			}
		});
		
	});
}

exports.Iteration.getAll = function(pid, cb){
	
	pivotal.call('getAllIterations', {
		pid: pid,
		success: function(result){
			cb(mapListToEntity(result.iteration || [result]));
		},
		error: function(err){
			//TODO: handle error
		}
	});
};

