
var http = require('https');
var xml2js = require('xml2js');

exports.callAPI = function(options, end, error){

	options.headers = {
		'X-TrackerToken' : '6dc1e69e8afb9223dc219bd216a89e5d'
	};

	http.get(options, function(res){
		//console.log('STATUS: ' + res.statusCode);
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
