
var pivotal = require('./API-helper');

exports.getAllIterations = function(pid, callback){
	var path = '/services/v3/projects/' + pid + '/iterations';
	
	pivotal.callAPI(path, function(result){
		callback(result.iteration || [result]);
	});
};

exports.getIteration = function(pid, which, callback){
	var path = '/services/v3/projects/' + pid + '/iterations/' + which;
	
	pivotal.callAPI(path, function(result){
		callback(result.iteration || [result]);
	});
};

exports.getDoneIterations = function(pid, offset, callback){
	var path = '/services/v3/projects/' + pid + '/iterations/done?offset=-' + offset;
	
	pivotal.callAPI(path, function(result){
		callback(result.iteration || [result]);
	});
};

exports.getIterationById = function(pid, iteNbr, callback){
	var path = '/services/v3/projects/' + pid + '/iterations?offset='+ (iteNbr-1) + '&limit=1' ;
	
	pivotal.callAPI(path, function(result){
		callback(result.iteration || [result]);
	});
};

