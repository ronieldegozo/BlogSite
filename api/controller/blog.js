const Blog = require('../models/Blog');
const mongoose = require('mongoose');

//getting blog
exports.getBlog = (req,res,next) =>{

    Blog.find()

    .then((result) =>{
        console.log(`Blogs of `, result);
        const response = {
            blogs: result.map(result =>{
                return {
                    title: result.title,
                    content: result.content,
                    author: result.author,
                    _id: result._id,
               
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/blogs/' + result._id,
                        date: result.date
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

}



//posting a new blog
exports.postBlog = (req,res,next) =>{
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date
    });

    blog    
    .save()
    
    .then(result =>{
        console.log(result);
        
        res.status(201).json({
            message: 'Created Blog Successfully',
            createdBlog: {
                _id: result._id,
                date: result.date,
                title: result.title,
                content: result.content,
                author: result.author,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/blogs/' + result._id
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
    
}



//getting id of blog
exports.getBlogId = (req,res,next) =>{

    const id = req.params.blogId;
    Blog.findById(id)

    .then((result) =>{
        console.log(result);
        res.status(201).json({
            message: 'ID has been fetch',
            fetchInformation: {
                date: result.date,
                title: result.title,
                author: result.author
            }
        })
    })

    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

}


//DELETING BLOG ID
exports.deleteBlogId = (req,res,next) =>{
    const id = req.params.blogId;

    Blog.remove({_id: id})

    .then((result)=>{
        console.log(result);
        res.status(201).json({
            message: `Data has been Deleted ID of ${id}`
        })
    })



    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })


}