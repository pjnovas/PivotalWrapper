
var userModel = require('../models/user');

exports.loginByToken = function(req, res){	
	res.render('', {
		locals: {
	    	title: 'Sprints',
	    	project: proj
	    	}
    });
};

exports.loginByUserAndPass = function(req, res){
	res.render('', {
		locals: {
	    	title: 'Sprints',
	    	project: proj
	    	}
    });
};
