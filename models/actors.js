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

module.exports.editActor = function(data,cb){
	let actor = this;
	actor.findByIdAndUpdate(data.id,{
		name: data.name,
		lastName: data.lastname,
		avatar: data.avatar
	},cb);
}

module.exports.getAllActor = function(cb){
	let actor = this;
	actor.find(cb);
}

module.exports.getActorById = function(id,cb){
	let actor = this;
	actor.findById(id,cb);
}

module.exports.deleteAvatar = function(id,cb){
  let actor = this;
  actor.findByIdAndUpdate(id,{avatar: ''},cb);
}

module.exports.removeActor = function(id,cb){
	let actor = this;
  actor.findByIdAndRemove(id,cb);
}

module.exports.getActorPageData = function(id,cb){
	let actor = this;

	actor.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
      },
    },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'actors',
          as: 'movies'
        }
      }
  ],cb);
}
