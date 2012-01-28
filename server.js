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
	res.redirect('/projects');
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

function searchStories(filter, res){
	pivotal.getStories(filter, function(found){
		res.render('stories', {
			locals: {
		    	title: 'Historias',
		    	stories: found
		    	}
	    });
	}, function(error){
		
	});
}

app.get('/projects/:projectId/stories', function(req, res){
	searchStories({projectId: req.params.projectId}, res);
});

app.get('/projects/:projectId/stories/:storyId', function(req, res){
	searchStories({
		projectId: req.params.projectId,
		storyId: req.params.storyId,
	}, res);
});

app.get('/projects/:projectId/stories/type/:type', function(req, res){
	searchStories({
		projectId: req.params.projectId,
		type: req.params.type
	}, res);
});

app.get('/projects/:projectId/stories/label/:label', function(req, res){
	searchStories({
		projectId: req.params.projectId,
		label: req.params.label
	}, res);
});

app.get('/projects/:projectId/stories/name/:name', function(req, res){
	searchStories({
		projectId: req.params.projectId,
		name: req.params.name
	}, res);
});

app.use(express.static(__dirname + '/public'));

app.listen(14090);
console.log("Express server listening on port %d", app.address().port);









