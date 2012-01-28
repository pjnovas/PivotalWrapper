
var pivotal = require('./API-helper');

exports.getProjects = function(callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects'
	};
	
	pivotal.callAPI(options, function(result){
		callback(result.project);
	});
};

exports.getProject = function(id, callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects/' + id
	};
	
	pivotal.callAPI(options, function(result){
		callback(result);
	});
};
