
var pivotal = require('./API-helper');

exports.getProjects = function(callback){
	var path = '/services/v3/projects';
	
	pivotal.callAPI(path, function(result){
		callback(result.project);
	});
};

exports.getProject = function(id, callback){
	var path = '/services/v3/projects/' + id;
	
	pivotal.callAPI(path, function(result){
		callback(result);
	});
};
