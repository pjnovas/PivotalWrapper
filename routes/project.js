
var projectModel = require('../models/project');

exports.getMyProjects = function(req, res){
	
	projects = projectModel.Project.getAll(function (ps){
	
		res.render('projects', {
			locals: {
		    	title: 'Proyectos',
		    	projects: ps
		    	}
	    });
    });
};