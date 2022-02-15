const mongoose = require('mongoose');
// const CategoryModel = require('./category')

const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
    word: String,
    meaning: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }]
});

const VocabularyModel = mongoose.model('vocabulary', VocabularySchema);

// CategoryModel.create({ name: 'cate' }).then(c => VocabularyModel.create({ word: 'abc', meaning: 'test', categories: [c._id] }))


module.exports = VocabularyModel;