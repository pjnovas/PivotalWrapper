/**
 * @author pjnovas
 */

var express = require('express');

var projectController = require('./controllers/project');
var storyController = require('./controllers/story');
var iterationController = require('./controllers/iteration');
var releaseController = require('./controllers/release');
var userController = require('./controllers/user');

var memStore = require('connect').session.MemoryStore;

var app = express.createServer();

app.configure(function(){

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	
	//app.use(express.cookieDecoder());
	app.use(
		express.session({
			secret: 'lokura',
			store: memStore({
				reapInterval: 60000 * 10
			})
		})
	);	
	
	app.use(app.router);
	app.use(express.favicon());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.dynamicHelpers({
		session: function(req, res){
			return req.session;
		},
		flash: function(req, res){
			return req.flash();
		}
	}
);

function requiresLogin(req, res, next){
	next();
	/*
	if (req.session.user) next();
	else res.redirect('sessions/new?redir=' + req.url);
	*/
}


app.get('/', function (req, res){
	res.redirect('/projects');
});

/* sessions */

app.get('/sessions/new', function (req, res){
	res.render('sessions/new', {
			locals: {
				title: '',
				redir: req.query.redir
			}
		}
	);
});

app.get('/sessions/destroy', function (req, res){
	delete req.session.user;
	res.redirect('/sessions/new');
});
	
app.post('/sessions', function (req, res){
	//authenticate
	//req.body.login
	//req.body.password
	
	//if (true)
		//req.session.user = user
		//res.redirect(req.body.redir || '/');
	//else 
	/*
		req.flash('warn', 'Login failed');
		res.render('sessions/new', {
			locals: {
				title: '',
				redir: req.query.redir
			}
		}
	);*/
});


app.get('/login/token', userController.loginByToken);
app.get('/login/user', userController.loginByUserAndPass);

app.get('/projects', requiresLogin, projectController.getMyProjects);
app.get('/projects/:projectId', requiresLogin, projectController.getProject);

app.get('/projects/:projectId/stories', storyController.getAllStoriesByProject);
app.get('/projects/:projectId/stories/type/:type', storyController.getStoriesByType);
app.get('/projects/:projectId/stories/label/:label', storyController.getStoriesByLabel);

app.get('/projects/:projectId/burnDown', iterationController.getCurrentBurnDown);
app.get('/projects/:projectId/iterations:format?', iterationController.getAll);
app.get('/projects/:projectId/iterations/:which', iterationController.getIteration);
app.get('/projects/:projectId/iterations/:which/print', iterationController.printIteration);

app.get('/projects/:projectId/releases/:release/burnup', requiresLogin, releaseController.getReleaseBurnup);
app.get('/projects/:projectId/releases/:release/kanban', requiresLogin, releaseController.getReleaseKanban);

app.use(express.static(__dirname + '/public'));

app.listen(15059);
console.log("Express server listening on port %d", app.address().port);









