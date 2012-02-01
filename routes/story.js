
var storyModel = require('../models/story');
var projectModel = require('../models/project');

exports.getAllStoriesByProject = function(req, res){

	projectModel.Project.getOne(req.params.projectId, function (proj){
		
		storyModel.Story.getAll(req.params.projectId, function(found){
		
			res.render('stories', {
				locals: {
			    	title: 'Historias',
			    	stories: found,
			    	project: proj
			    	}
		    });	

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
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		storyModel.Story.getByType(req.params.projectId, req.params.type, function(found){

			res.render('stories', {
				locals: {
			    	title: 'Historias de tipo ' + req.params.type,
			    	stories: found,
			    	project: proj
			    	}
		    });	

		});
	});
};

exports.getStoriesByLabel = function(req, res){

	projectModel.Project.getOne(req.params.projectId, function (proj){
		
		var labelFormatted = req.params.label.replace(/-/g, "%20");		
		storyModel.Story.getByLabel(req.params.projectId, labelFormatted, function(found){

			//if (req.params.format)
				res.send(found, 200);
		    /*else {
				res.render('stories', {
					locals: {
				    	title: 'Historias de release: ' + labelFormatted,
				    	stories: found,
				    	project: proj
				    	}
			    });	
		    }*/
		    
		});

	});
};
