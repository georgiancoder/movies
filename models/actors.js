const mongoose = require('mongoose');


const actorsSchema = mongoose.Schema({
	name: String,
	lastName: String,
	avatar: String
});

module.exports = mongoose.model('actors',actorsSchema);

module.exports.addActor = function(data,cb){
	let actor = this;
	let newActor = new actor();

	newActor.name = data.name;
	newActor.lastName = data.lastname;
	newActor.avatar = data.avatar;

	newActor.save(cb);
}

module.exports.getAllActor = function(cb){
	let actor = this;
	actor.find(cb);
}

module.exports.getActorById = function(id,cb){
	let actor = this;
	actor.findById(id,cb);
}