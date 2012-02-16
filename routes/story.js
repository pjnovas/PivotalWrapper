
var storyModel = require('../models/story');
var projectModel = require('../models/project');

exports.getAllStoriesByProject = function(req, res){

	projectModel.Project.getOne(req.params.projectId, function (proj){
		
		storyModel.Story.getAll(req.params.projectId, function(found){
			res.send(found, 200);
		});
	});
};

exports.getStoriesByType = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		storyModel.Story.getByType(req.params.projectId, req.params.type, function(found){
			res.send(found, 200);
		});
	});
};

exports.getStoriesByLabel = function(req, res){

	projectModel.Project.getOne(req.params.projectId, function (proj){
		
		var labelFormatted = req.params.label.replace(/-/g, "%20");		
		storyModel.Story.getByLabel(req.params.projectId, labelFormatted, function(found){
			res.send(found, 200);
		});

	});
};
