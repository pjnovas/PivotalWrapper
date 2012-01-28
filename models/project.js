
var pivotal = require('../pivotalAPI/projects');

exports.Project = function() {
	
}

var mapToEntity = function(p){
	return {
		id: p.id,
		name: p.name	
	};
}

var mapListToEntity = function(ps){
	var list = [];
	for (var i = 0; i < ps.length; i++){
		list.push(mapToEntity(ps[i]));
	}
	return list;
}

exports.Project.getAll = function(cb){
	pivotal.getProjects(function(projects){
		cb( mapListToEntity(projects) );
	});
};

exports.Project.getOne = function(id, cb){
	pivotal.getProject(id, function(project){
		cb( mapToEntity(project) );
	});	
};

