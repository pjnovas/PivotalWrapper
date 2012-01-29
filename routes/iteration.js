
var iterationModel = require('../models/iteration');

exports.getCurrent = function(req, res){
	
	iterationModel.Iteration.getCurrent(req.params.projectId, function (is){
		res.render('currentIteration', {
			locals: {
		    	title: 'Iteracion Actual',
		    	iteration: is
		    	}
	    });
    });
};

exports.getCurrentBacklog = function(req, res){
	
	iterationModel.Iteration.getCurrentBacklog(req.params.projectId, function (is){
		res.render('iterations', {
			locals: {
		    	title: 'Iteracion Actual y Backlog',
		    	iterations: is
		    	}
	    });
    });
};

exports.getBacklog = function(req, res){
	
	iterationModel.Iteration.getBacklog(req.params.projectId, function (is){
		res.render('iterations', {
			locals: {
		    	title: 'Iteraciones en Backlog',
		    	iterations: is
		    	}
	    });
    });
};

exports.getAll = function(req, res){
	
	iterationModel.Iteration.getIcebox(req.params.projectId, function (is){
		res.render('iterations', {
			locals: {
		    	title: 'Todas las Iteraciones',
		    	iterations: is
		    	}
	    });
    });
};

exports.getDone = function(req, res){
	
	iterationModel.Iteration.getDone(req.params.projectId, req.params.howMany, function (is){
		res.render('iterations', {
			locals: {
		    	title: 'Ultimas ' + req.params.howMany + ' Iteraciones',
		    	iterations: is
		    	}
	    })
    });
};
