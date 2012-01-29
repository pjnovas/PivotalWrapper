
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
		iterationModel.Iteration.getIcebox(req.params.projectId, function (data){				
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
