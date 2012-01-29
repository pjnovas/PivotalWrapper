
var pivotal = require('./API-helper');

exports.getStories = function(filter, success, error){
	var appendfilter = "?filter=",
		path = '/services/v3/projects/' + filter.projectId + '/stories';
	
	if (filter.storyId) path += '/' + filter.storyId;	
	else {
		appendfilter += (filter.type && "type%3A" + filter.type + "%20") || "";
		appendfilter += (filter.label && "label%3A" + filter.label + "%20") || "";
		appendfilter += (filter.name && "name%3A%22" + filter.name + "%22%20") || "";
		path +=	appendfilter;
	}

	pivotal.callAPI(path, function(result){
		success(result.story || [result]);
	}, function (err){
		if (error) error(err);
	});
};