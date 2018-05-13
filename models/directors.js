const mongoose = require('mongoose');

const directorsSchema = mongoose.Schema({
    name: String,
    lastName: String,
    moreInfo: String,
    avatar: String
});

module.exports = mongoose.model('directors', directorsSchema);

module.exports.addDirector = function(data, cb){
	let director = this;
	let newDirector = new director();

	newDirector.name = data.name;
	newDirector.lastName = data.lastname;
	newDirector.moreInfo = data.url;
	newDirector.avatar = data.avatar;

	newDirector.save(cb);
}

module.exports.editDirector = function(data, cb){
  let director = this;
  director.findByIdAndUpdate(data.id,{
    name: data.name,
    lastName: data.lastname,
    moreInfo: data.url,
    avatar: data.avatar
  },cb);
}

module.exports.getDirectors = function(cb){
	let director = this;
	director.find(cb);
}

module.exports.getDirectorById = function(id,cb){
	let director = this;
	director.findById(id,cb);
}

module.exports.deleteAvatar = function(id,cb){
  let director = this;
  director.findByIdAndUpdate(id,{avatar: ''},cb);
}

module.exports.removeDirector = function(id,cb){
  let director = this;
  director.findByIdAndRemove(id,cb);
}

module.exports.getDirectorPageData = function(id,cb){
  let director = this;
  director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
      },
    },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'directors',
          as: 'movies'
        }
      }
  ],cb);
}
