
var iterationModel = require('../models/iteration');
var projectModel = require('../models/project');

exports.getCurrent = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		iterationModel.Iteration.getCurrent(req.params.projectId, function (is){
			res.render('currentIteration', {
				locals: {
			    	title: 'Sprint Actual',
			    	iteration: is,
			    	project: proj
			    	}
		    });
	    });
	});
};

exports.getCurrentBacklog = function(req, res){
	projectModel.Project.getOne(req.params.projectId, function (proj){

		iterationModel.Iteration.getCurrentBacklog(req.params.projectId, function (is){
			res.render('iterations', {
				locals: {
			    	title: 'Sprints Actual y Backlog',
			    	iterations: is,
			    	project: proj
			    	}
		    });
	    });
    });	
};

exports.getBacklog = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		iterationModel.Iteration.getBacklog(req.params.projectId, function (is){
			res.render('iterations', {
				locals: {
			    	title: 'Sprints en Backlog',
			    	iterations: is,
			    	project: proj
			    	}
		    });
	    });
    });
};

exports.getAll = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		iterationModel.Iteration.getIcebox(req.params.projectId, function (is){
			res.render('iterations', {
				locals: {
			    	title: 'Sprints',
			    	iterations: is,
			    	project: proj
			    	}
		    });
	    });
	});
};

exports.getDone = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){

		iterationModel.Iteration.getDone(req.params.projectId, req.params.howMany, function (is){
			res.render('iterations', {
				locals: {
			    	title: 'Ultimos ' + req.params.howMany + ' Sprints',
			    	iterations: is,
			    	project: proj
			    	}
		    })
	    });
	});
};
