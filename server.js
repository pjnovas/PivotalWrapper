/**
 * @author pjnovas
 */

var express = require('express');
var pivotal = require('./pivotal-API');

var app = express.createServer();

app.configure(function(){

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	
	app.use(app.router);
	app.use(express.favicon());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// -----------------------------------------------
// Routes ----------------------------------------
app.get('/', function (req, res){
	res.render('login', {
  		locals: {
	    	title: 'LogIn'
	    	}
	    });
});

app.post('/authenticate', function(req, res){
	pivotal.getToken({
		userName: req.body.user.name,
		password: req.body.user.pass 
	}, function (){
		res.redirect('/projects');
	});
});

app.get('/projects', function(req, res){
	pivotal.getProjects(function(projects){
		
		res.render('projects', {
			locals: {
		    	title: 'Proyectos',
		    	proyects: projects
		    	}
	    });
    });
});

app.get('/projects/:projectId/stories', function(req, res){
	pivotal.getStories(req.params.projectId, function(stories){
		
		res.render('stories', {
			locals: {
		    	title: 'Historias',
		    	stories: stories
		    	}
	    });
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(14092);
console.log("Express server listening on port %d", app.address().port);









