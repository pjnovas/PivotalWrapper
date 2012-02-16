
var pivotal = require('../utils/pivotal/API-helper');

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
	
	pivotal.call('getAllProjects', {
		success: function(result){
			cb(mapListToEntity(result.project));
		},
		error: function(err){
			//TODO: handle error
		}
	});
};

exports.Project.getOne = function(id, cb){
	
	pivotal.call('getProjectById', {
		pid: id,
		success: function(result){
			cb(mapToEntity(result));
		},
		error: function(err){
			//TODO: handle error
		}
	});	
};

