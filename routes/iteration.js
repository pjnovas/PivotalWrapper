
var iterationModel = require('../models/iteration');
var projectModel = require('../models/project');

exports.getIteration = function(req, res){	
	iterationModel.Iteration.get(req.params.projectId, req.params.which, function (data){
		res.send(data, 200);
    });
};

exports.getAll = function(req, res){
	if (req.params.format){
		iterationModel.Iteration.getAll(req.params.projectId, function (data){				
			res.send(data, 200); 
	    });
    }
    else {
    	projectModel.Project.getOne(req.params.projectId, function (proj){
	    	res.render('iterations', {
				locals: {
			    	title: 'Sprints',
			    	project: proj
			    	}
		    });
	    });
    }
};

exports.printIteration = function(req, res){	
	var pid = req.params.projectId, 
		which = req.params.which;

	projectModel.Project.getOne(pid, function (proj){
			
		function renderView(data){
			res.render('printStories', {
				layout: false,
				locals: {
			   		title: 'Historias',
			    	stories: data.stories,
			    	project: proj
			    }
		    });	
		}

		iterationModel.Iteration.get(pid, which, function (data){
			renderView(data);
		});
	});
};

exports.getCurrentBurnDown = function(req, res){	
	res.render('printBurnDown', {
		layout: false,
		locals: {
	    	title: 'Historias',
	    	projectId: req.params.projectId
	    }
    });	
};




