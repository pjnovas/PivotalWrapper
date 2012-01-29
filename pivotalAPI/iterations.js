
var pivotal = require('./API-helper');

exports.getAllIterations = function(pid, callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects/' + pid + '/iterations'
	};
	
	pivotal.callAPI(options, function(result){
		callback(result.iteration || [result]);
	});
};

exports.getIteration = function(pid, which, callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects/' + pid + '/iterations/' + which
	};
	
	pivotal.callAPI(options, function(result){
		callback(result.iteration || [result]);
	});
};

exports.getDoneIterations = function(pid, offset, callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects/' + pid + '/iterations/done?offset=-' + offset
	};
	
	pivotal.callAPI(options, function(result){
		callback(result.iteration || [result]);
	});
};