const express = require('express');
const router  = express.Router();
const { getBlog, postBlog, getBlogId, deleteBlogId } = require('../controller/blog');

//getting all blogs
router.get('/', getBlog)

//posting a new blog
router.post('/', postBlog)

//getting id
router.get('/:blogId', getBlogId)

//Deleting Id
router.delete('/:blogId', deleteBlogId);

module.exports = router;