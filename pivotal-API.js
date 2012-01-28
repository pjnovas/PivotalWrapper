/**
 * @author pjnovas
 */

var http = require('https');
var xml2js = require('xml2js');

var currentToken = '6dc1e69e8afb9223dc219bd216a89e5d';

function callAPI(options, end, error){
	http.get(options, function(res){
		console.log('STATUS: ' + res.statusCode);
		//console.log('HEADERS: ' + JSON.stringify(res.headers));

		var body = "";

		res.setEncoding('utf8');
		
		res.on('data', function (chunk) {
			body += chunk;
		});
		
		res.on('end', function(){

			var parser = new xml2js.Parser({ignoreAttrs: true});

			parser.parseString(body, function (err, result) {
			    end(result);
		    });
		});
		
	}).on('error', function(e) {
	  	if (error) error("error: " + e.message);
	});

}

exports.getProjects = function(callback){
	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : '/services/v3/projects',
			headers : {
				'X-TrackerToken' : currentToken
			}
	};
	
	callAPI(options, function(result){
		callback(result.project);
	});
};

exports.getStories = function(filter, success, error){
	var options = {},
		appendfilter = "?filter=",
		path = '/services/v3/projects/' + filter.projectId + '/stories';
	
	if (filter.storyId) path += '/' + filter.storyId;	
	else {
		appendfilter += (filter.type && "type%3A" + filter.type + "%20") || "";
		appendfilter += (filter.label && "label%3A" + filter.label + "%20") || "";
		appendfilter += (filter.name && "name%3A%22" + filter.name + "%22%20") || "";
		path +=	appendfilter;
	}

	console.log(path);

	options = {
		agent : false,
		host : 'www.pivotaltracker.com',
		path : path,
		headers : {
			'X-TrackerToken' : currentToken
		}
	};

	callAPI(options, function(result){
		console.dir(result);
		success(result.story || [result]);
	}, function (err){
		if (error) error(err);
	});
};





