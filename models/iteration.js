
var pivotal = require('../pivotalAPI/iterations');

exports.Iteration = function() {
	
}

var mapToEntity = function(i){
	return {
		id: i.id,
		number: i.number,
		start: i.start,
		end: i.finish,
		strength: i.team_strength
	};
}

var mapListToEntity = function(is){
	var list = [];
	for (var i = 0; i < is.length; i++){
		list.push(mapToEntity(is[i]));
	}
	return list;
}

exports.Iteration.getCurrent = function(pid, cb){
	pivotal.getIteration(pid, 'current', function(iteration){
		cb( mapToEntity(iteration) );
	});
};

exports.Iteration.getCurrentBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'current_backlog', function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getBacklog = function(pid, cb){
	pivotal.getIteration(pid, 'backlog', function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getIcebox = function(pid, cb){
	pivotal.getAllIterations(pid, function(iterations){
		cb( mapListToEntity(iterations) );
	});
};

exports.Iteration.getDone = function(pid, howMany, cb){
	pivotal.getDoneIterations(pid, howMany , function(iterations){
		cb( mapListToEntity(iterations) );
	});
};
