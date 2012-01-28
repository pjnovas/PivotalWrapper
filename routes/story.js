
var storyModel = require('../models/story');

exports.getAllStoriesByProject = function(req, res){

	storyModel.Story.getAll(req.params.projectId, function(found){
	
		res.render('stories', {
			locals: {
		    	title: 'Historias',
		    	stories: found
		    	}
	    });	

	});
};

exports.getStory = function(req, res){

	storyModel.Story.getOne(req.params.projectId, req.params.storyId, function(found){
	
		res.render('stories', {
			locals: {
		    	title: 'Detalle de Historia ' + req.params.storyId,
		    	stories: found
		    	}
	    });	

	});
};

exports.getStoriesByType = function(req, res){
	
	storyModel.Story.getByType(req.params.projectId, req.params.type, function(found){

		res.render('stories', {
			locals: {
		    	title: 'Historias de tipo: ' + req.params.type,
		    	stories: found
		    	}
	    });	

	});

};

exports.getStoriesByLabel = function(req, res){

	storyModel.Story.getByType(req.params.projectId, req.params.label, function(found){

		res.render('stories', {
			locals: {
		    	title: 'Historias con etiqueta ' + req.params.label,
		    	stories: found
		    	}
	    });	

	});
};
