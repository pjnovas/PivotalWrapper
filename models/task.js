
var pivotal = require('../pivotalAPI/tasks');

exports.Task = function() {
	
}

var mapToEntity = function(t){
	var value = 0,
		description = t.description;

	if (t.description){
		var parts = t.description.split(']');
		if (parts.length) {
			value = parseFloat(parts[0].substr(1));
			description = parts[1];
		}
	}

	return {
		id: t.id,
		description: description,
		position: t.position,
		completed: t.completed,
		estimate: value
	};
}

var mapListToEntity = function(ts){
	var list = [];
	for (var i = 0; i < ts.length; i++){
		list.push(mapToEntity(ts[i]));
	}
	return list;
}

exports.Task.getStoryTasks = function(pid, sid, cb){
	pivotal.getStoryTasks(pid, sid, function(tasks){
		cb( mapListToEntity(tasks) );
	});
};

