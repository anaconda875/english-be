const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    youtubeId: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }]
});

const VideoModel = mongoose.model('video', VideoSchema);

// const CategoryModel = require('./category')
// CategoryModel.create({ name: 'test-video' }).then(c => VideoModel.create({ youtubeId: '1234', categories: [c._id] }))


module.exports = VideoModel;