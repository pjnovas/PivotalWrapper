
var http = require('https');
var xml2js = require('xml2js');

var callAPI = function(path, end, error){

	var options = {
			agent : false,
			host : 'www.pivotaltracker.com',
			path : path,
			headers : {
				'X-TrackerToken' : '6dc1e69e8afb9223dc219bd216a89e5d'
			}
			//,auth : 'user/email:pass'
	};

	http.get(options, function(res){
		//console.dir(res);
		//console.log('HEADERS: ' + JSON.stringify(res.headers));

		if (res.statusCode === 401){ 
			if (error) {
				error("Usuario Incorrecto");
				console.log('------> error: 401 - Unauthorized');
			}
			return;
		}
		
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

function doCall(path, opts){
	callAPI(path, (opts.success || function(){}), (opts.error || function(){}) );
}

var apiPaths = {
	allProjects: '/services/v3/projects',
	projectById: '/services/v3/projects/{pid}',
	
	allIterations: '/services/v3/projects/{pid}/iterations',
	iteration: '/services/v3/projects/{pid}/iterations/{which}',
	
	allStories: '/services/v3/projects/{pid}/stories',
	storiesByType: '/services/v3/projects/{pid}/stories/?filter=type%3A{type}',
	storiesByLabel: '/services/v3/projects/{pid}/stories/?filter=label%3A%22{label}%22',
	
	tasksByStory: '/services/v3/projects/{pid}/stories/{sid}/tasks'
};

var methods = {
	getAllProjects: function(opts){
		doCall(apiPaths.allProjects, opts);
	},
	getProjectById: function(opts){
		doCall(apiPaths.projectById.replace('{pid}', opts.pid), opts);
	},
	
	getAllIterations: function(opts){
		doCall(apiPaths.allIterations.replace('{pid}', opts.pid), opts);
	}, 
	getIteration: function(opts){
		doCall(apiPaths.iteration.replace('{pid}', opts.pid).replace('{which}', opts.which), opts);
	},
	
	getAllStories: function(opts){
		doCall(apiPaths.allStories.replace('{pid}', opts.pid), opts);
	},
	getStoriesByType: function(opts){
		doCall(apiPaths.storiesByType.replace('{pid}', opts.pid).replace('{type}', opts.type), opts);
	},
	getStoriesByLabel: function(opts){
		doCall(apiPaths.storiesByLabel.replace('{pid}', opts.pid).replace('{label}', opts.label), opts);
	},
	
	getTasksByStory: function(opts){
		doCall(apiPaths.tasksByStory.replace('{pid}', opts.pid).replace('{sid}', opts.sid), opts);
	}
};

exports.call = function (method, opts){
	methods[method](opts);
};































