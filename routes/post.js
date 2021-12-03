const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const { isAdmin, validateJwt } = require('../helpers/processJwt');
const router = express.Router();

const { check } = require('express-validator')

router.get("/", validateJwt ,getPosts);
router.post("/post", [
    check("text", "You are required to enter text").not().isEmpty(),
    check("userID", "You are required to enter a userID").not().isEmpty(),
    check("date", "You are required to enter a valid date").not().isEmpty(),
    validateJwt]
 ,createPost);
router.put("/post/:id", validateJwt, isAdmin, updatePost);
router.delete("/post/:id",validateJwt,isAdmin, deletePost);

module.exports = router;