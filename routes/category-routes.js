const express = require('express');
const router = express.Router();
const VocabularyModel = require('../model/vocabulary');
const VideoModel = require('../model/video')
const CategoryModel = require('../model/category')

router.get(
    '/:id/vocabularies',
    async (req, res, next) => {
        // VocabularyModel.find({ categories: req.params.id }).then(a => res.json(a))
        VocabularyModel.find({ categories: { $elemMatch: { $eq: req.params.id } } }).then(a => res.json(a))
    }
);

router.get(
    '/:id/videos',
    async (req, res, next) => {
        // VideoModel.find({ categories: req.params.id }).then(a => res.json(a))
        VideoModel.find({ categories: { $elemMatch: { $eq: req.params.id } } }).then(a => res.json(a))
    }
);

router.get(
    '/',
    async (req, res, next) => {
        let query = {};
        let name = req.query.name;
        if(name) {
            query.name = name
        }
        CategoryModel.find(query).then(a => res.json(a))
    }
);

module.exports = router;