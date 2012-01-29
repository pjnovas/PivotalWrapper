
var pivotal = require('./API-helper');

exports.getStoryTasks = function(pid, sid, callback){
	var path = '/services/v3/projects/' + pid + '/stories/' + sid + '/tasks';
	
	pivotal.callAPI(path, function(result){
		callback(result.task || [result]);
	});
};

