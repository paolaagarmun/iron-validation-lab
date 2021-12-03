const Post = require('../Schemas/Post');

const getPosts = async (req, res) => {
    const posts = await Post.find();
    try {
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get posts"})
    }
}

const createPost = async (req, res) => {
    const post = await Post.create(req.body)
    try {
        return res.status(201).json(post)
    } catch (error) {
        return res.status(500).json({message: "Couldn't create post"})
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const postToUpdate = await Post.findByIdAndUpdate(id, req.body, {new:true})
    try {
        return res.status(202).json(postToUpdate)
    } catch (error) {
        return res.status(500).json({message: "Couldn't update post"})
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    try {
        return res.status(203).json({message: "Deleted success"})
    } catch (error) {
        return res.status(500).json({message: "couldn't delete"})
    }
}


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}