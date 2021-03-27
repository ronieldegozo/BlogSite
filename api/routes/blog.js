const express = require('express');
const router  = express.Router();
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

router.get('/', (req,res,next) =>{

    Blog.find()

    .then((result) =>{
        console.log(result);
        const response = {
            product: result.map(result =>{
                return {
                    title: result.title,
                    content: result.content,
                    author: result.author,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/blog/' + result._id
                    }
                };

            })
        }
        res.status(200).json(response);
    })

    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

})

router.post('/', (req,res,next) =>{
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    });


    blog    
    .save()
    
    .then(result =>{
        console.log(result);
        
        res.status(201).json({
            message: 'Created product Successfully',
            createdProduct: {
                title: result.title,
                content: result.content,
                author: result.author,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/blog/' + result._id
                }
            }
        })
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
})




router.get('/:blogId', (req,res,next) =>{

    const id = req.params.blogId;
    Blog.findById(id)


    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Product has been Fetch',
            result: {
                title: result.title,
                content: result.content,
                author: result.author,
                _id: result._id,
            }
        })
    })

    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

})

module.exports = router;