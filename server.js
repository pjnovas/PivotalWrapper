/**
 * @author pjnovas
 */

var express = require('express');

var projectRoutes = require('./routes/project');
var storyRoutes = require('./routes/story');
var iterationRoutes = require('./routes/iteration');

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

app.get('/', function (req, res){
	res.redirect('/projects');
});

app.get('/projects', projectRoutes.getMyProjects);
app.get('/projects/:projectId', projectRoutes.getProject);

app.get('/projects/:projectId/stories', storyRoutes.getAllStoriesByProject);
app.get('/projects/:projectId/stories/:storyId', storyRoutes.getStory);
app.get('/projects/:projectId/stories/type/:type', storyRoutes.getStoriesByType);
app.get('/projects/:projectId/stories/label/:label', storyRoutes.getStoriesByLabel);

app.get('/projects/:projectId/iterations:format?', iterationRoutes.getAll);
app.get('/projects/:projectId/iterations/current', iterationRoutes.getCurrent);
app.get('/projects/:projectId/iterations/current_backlog', iterationRoutes.getCurrentBacklog);
app.get('/projects/:projectId/iterations/backlog', iterationRoutes.getBacklog);
app.get('/projects/:projectId/iterations/done/:howMany', iterationRoutes.getDone);



app.use(express.static(__dirname + '/public'));

app.listen(14090);
console.log("Express server listening on port %d", app.address().port);









