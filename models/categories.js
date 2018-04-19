const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
	title: String,
	order: {type: Number, default: 0}
});

module.exports = mongoose.model('categories',categorieSchema);

module.exports.getCategories = function(cb){
	let categorie = this;
	categorie.find(cb);
}

module.exports.addNewCategorie = function(data,cb){
	let categorie = this;
	let newCategorie = new categorie();
	newCategorie.title = data.title;
	newCategorie.order = data.order;

	newCategorie.save(cb);
}