const express = require("express");
const router = express.Router();
const multer = require('multer');

const postController = require("../controllers/blogController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/addBlog", upload.single("image"), postController.addBlog);


router.get("/getAllBlogs", postController.getAllBlogs);


router.get("/getBlogs", postController.getBlogs);


router.patch("/updateView", postController.updateView);


router.get("/searchBlog", postController.searchBlog);


router.get("/getSingleBlog", postController.getSingleBlog);


router.get("/topThreeBlog", postController.topThreeBlog);


router.get("/getTags", postController.getTags);

module.exports = router;
