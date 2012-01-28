/**
 * @author pjnovas
 */

var https = require('https');
var xml2js = require('xml2js');

var currentToken;

function callAPI(options, end){
	
	https.get(options, function(res){
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));

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
	  	console.log("Got error: " + e.message);
	});

}

exports.getToken = function (opts, callback){
	
	var options = {
	  agent : false,
	  host : 'www.pivotaltracker.com',
	  //port : 443,
	  path : '/services/v3/tokens/active',
	  auth : opts.userName + ':' + opts.password
	};
	
	callAPI(options, function(result){
		currentToken = result.guid;
		callback();
	});

};

exports.getProjects = function(callback){
	
	var options = {
		agent : false,
		host : 'www.pivotaltracker.com',
		//port : 443,
		path : '/services/v3/projects',
		headers : {
			'X-TrackerToken' : currentToken
		}
	};
	
	callAPI(options, function(result){
		callback(result.project);
	});
	
};

exports.getStories = function(projectId, callback){
	
	var options = {
		agent : false,
		host : 'www.pivotaltracker.com',
		//port : 443,
		path : '/services/v3/projects/' + projectId + '/stories',
		headers : {
			'X-TrackerToken' : currentToken
		}
	};

	callAPI(options, function(result){
		callback(result.story);
	});
	
};
