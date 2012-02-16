
var pivotal = require('../utils/pivotal/API-helper');
var projectModel = require('../models/project');

exports.Story = function() {
	
}

var mapToEntity = function(s, p){
	return {
		id: s.id,
		name: s.name,
		estimate: (s.estimate > 0) ? s.estimate : 0,
		description: s.description,
		label: s.labels,
		type: s.story_type,
		state: s.current_state,
		priority: 0,
		project: p,
		started: "", //(s.current_state === "started" && s.updated_at || "",
		finished: "" //(s.current_state === "finished" && s.updated_at) || ""
	};
};

var mapListToEntity = function(ss, project){
	var list = [],
		listL,
		prior = 1000,
		range = 20;
	
	for (var i = 0; i < ss.length; i++){
		list.push(mapToEntity(ss[i], project));
	}


	listL = list.length;
	for (var i = 0; i < list.length; i++){
		prior-=range;
		list[i].priority = prior;
	}	

	return list;
};
exports.mapStoryList = mapListToEntity;

exports.Story.getAll = function(projectId, cb){

	projectModel.Project.getOne(projectId, function(proj){

		pivotal.call('getAllStories', {
			pid: projectId,
			success: function(result){
				cb(mapListToEntity((result.story || [result]), proj));
			},
			error: function(err){
				//TODO: handle error
			}
		});
	});
};

exports.Story.getByType = function(projectId, type, cb){
	
	projectModel.Project.getOne(projectId, function(proj){

		pivotal.call('getStoriesByType', {
			pid: projectId,
			type: type,
			success: function(result){
				cb(mapListToEntity((result.story || [result]), proj));
			},
			error: function(err){
				//TODO: handle error
			}
		});
	});
};

exports.Story.getByLabel = function(projectId, label, cb){

	projectModel.Project.getOne(projectId, function(proj){

		pivotal.call('getStoriesByLabel', {
			pid: projectId,
			label: label,
			success: function(result){
				cb(mapListToEntity((result.story || [result]), proj));
			},
			error: function(err){
				//TODO: handle error
			}
		});
	});
};






