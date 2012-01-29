
var pivotal = require('../pivotalAPI/iterations');
var projectModel = require('../models/project');
var storyModel = require('../models/story');
var taskModel = require('../models/task');

exports.Iteration = function() {
	
}

var mapToEntity = function(i){
	return {
		id: i.id,
		number: i.number,
		start: i.start,
		end: i.finish,
		strength: i.team_strength * 100,
		stories: [],
		storyAmm: 0,
		tasksAmm: 0
	};
}

var mapListToEntity = function(is){
	var list = [];
	for (var i = 0; i < is.length; i++){
		list.push(mapToEntity(is[i]));
	}
	return list;
}

exports.Iteration.getCurrent = function(pid, cb){

	projectModel.Project.getOne(pid, function(proj){

		pivotal.getIteration(pid, 'current', function(iteration){
			var i = 0,
				sprint = mapToEntity(iteration, true, proj);

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

			sprint.stories = storyModel.mapStoryList(iteration.stories.story, proj);
			fillStory();
		});
	});
};

exports.Iteration.getCurrentBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'current_backlog', function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'backlog', function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getIcebox = function(pid, cb){
	pivotal.getAllIterations(pid, function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getDone = function(pid, howMany, cb){
	pivotal.getDoneIterations(pid, howMany , function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

