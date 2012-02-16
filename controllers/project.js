
var projectModel = require('../models/project');

exports.getMyProjects = function(req, res){
	
	projectModel.Project.getAll(function (ps){
	
		res.render('projects', {
			locals: {
		    	title: 'Proyectos',
		    	projects: ps
		    	}
	    });
    });
};

exports.getProject = function(req, res){
	
	projectModel.Project.getOne(req.params.projectId, function (proj){
	
		res.render('project', {
			locals: {
		    	title: "Dashboard " + proj.name,
		    	project: proj
		    	}
	    });
    });
};
