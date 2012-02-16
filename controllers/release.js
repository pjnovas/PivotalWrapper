
var iterationModel = require('../models/iteration');
var projectModel = require('../models/project');

exports.getAll = function(req, res){	
	iterationModel.Iteration.getCurrent(req.params.projectId, function (data){
		res.send(data, 200);
    });
};

exports.getReleaseBurnup = function(req, res){
	var pid = req.params.projectId,
		label =  req.params.release;
	
	res.render('printBurnUp', {
		layout: false,
		locals: {
	    	title: 'BurnUp ' + label,
	    	projectId: pid,
	    	label: label
	    	}
    });
};

exports.getReleaseKanban = function(req, res){
	iterationModel.Iteration.getBacklog(req.params.projectId, function (data){
		res.send(data, 200);
    });
};

