const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    // constdb('posts')
    //     .then( posts => console.log(posts))
    //     .catch(err => console.log('ERR ', err));

    // The ASYNC way
    // SELECT * FROM Posts
    //const posts = await db.select('*').from('posts');
    try {
        const posts = await db('posts');
        //console.log(posts);
        //res.status(200).end();
        res.json(posts);
    } catch(err) {
        res.status(500).json({message: 'Failed to get posts'});
    }


});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        // SELECT * FROM Posts WHERE id = 16
        const post = await db('posts').where('id', id);
        res.status(200).json(post);
    } catch {
        res.status(500).json({message: 'Failed to get post'});
    }
});

router.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const post = await db('posts').insert(postData);
        res.status(201).json(post);
    } catch {
        res.status(500).json({message: 'Failed to insert post'});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const rowsUpdated = await db('posts').where('id', id).update(req.body);
        res.status(200).json({updated: rowsUpdated});
    } catch {
        res.status(500).json({message: 'Failed to insert post'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await db('posts').where('id', req.params.id).del();
        res.json({deletedRecords: rowsDeleted})
    }
    catch {
        res.status(500).json({message: "Failded to update postd"});
    }    
});

module.exports = router;