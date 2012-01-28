
var pivotal = require('../pivotalAPI/stories');
var projectModel = require('../models/project');

exports.Story = function() {
	
}

var mapToEntity = function(s, p){
	return {
		id: s.id,
		name: s.name,
		estimate: (s.estimate > 0) ? s.estimate : '-',
		description: s.description,
		label: s.labels,
		type: s.story_type,
		priority: 0,
		project: p,
		started: "", //(s.current_state === "started" && s.updated_at || "",
		finished: "" //(s.current_state === "finished" && s.updated_at) || ""
	};
}

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
}

exports.Story.getAll = function(projectId, cb){

	projectModel.Project.getOne(projectId, function(proj){

		pivotal.getStories({
			projectId: projectId
		}, function(found){
			cb( mapListToEntity(found, proj) );
		});

	});
};

exports.Story.getOne = function(projectId, id, cb){

	projectModel.Project.getOne(projectId, function(proj){

		pivotal.getStories({
			projectId: projectId,
			storyId: id
		}, function(found){
			cb( mapToEntity(found, proj) );
		});
	
	});
};

exports.Story.getByType = function(projectId, type, cb){
	
	projectModel.Project.getOne(projectId, function(proj){

		pivotal.getStories({
			projectId: projectId,
			type: type
		}, function(found){
			cb( mapListToEntity(found, proj) );
		});

	});
};

exports.Story.getByLabel = function(projectId, label, cb){

	projectModel.Project.getOne(projectId, function(proj){

		pivotal.getStories({
			projectId: projectId,
			label: label
		}, function(found){
			cb( mapListToEntity(found, proj) );
		});
	});
};
