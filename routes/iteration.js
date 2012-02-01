
var iterationModel = require('../models/iteration');
var projectModel = require('../models/project');

exports.getCurrent = function(req, res){	
	iterationModel.Iteration.getCurrent(req.params.projectId, function (data){
		res.send(data, 200);
    });
};

exports.getCurrentBacklog = function(req, res){
	iterationModel.Iteration.getCurrentBacklog(req.params.projectId, function (data){
		res.send(data, 200);
    });
};

exports.getBacklog = function(req, res){
	iterationModel.Iteration.getBacklog(req.params.projectId, function (data){
		res.send(data, 200);
    });
};

exports.getDone = function(req, res){
	iterationModel.Iteration.getDone(req.params.projectId, req.params.howMany, function (data){
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
		iid = req.params.iterationId;

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

		if (iid === '1'){
			iterationModel.Iteration.getCurrent(pid, function (data){
				renderView(data);
			});
		} else {
			iterationModel.Iteration.getOne(pid, iid, function (data){
				renderView(data);
			});
		}
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




