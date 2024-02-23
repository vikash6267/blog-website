const Blog = require("../models/blogModel");
const Tag = require("../models/tagModel");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const s3 = new aws.S3();


const addBlog = async (req, res) => {
  const { title, description, tags } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res.status(400).json({
      status: "failed",
      error: "Title and description are required",
    });
  }

  if (!tags || tags === "[]") {
    return res.status(400).json({
      status: "failed",
      error: "Tags are required",
    });
  }

  if (!file) {
    return res.status(400).json({
      status: "failed",
      error: "Image required",
    });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    if (data) {
      const tagsData = new Tag({
        tags: tags,
      });

      const tagsSavedData = await tagsData.save();

      if (tagsSavedData) {
        const blog = new Blog({
          title: title,
          description: description,
          view: 0,
          image: data.Location,
          tags_id: tagsSavedData._id,
        });

        const blogData = await blog.save();

        if (blogData) {
          return res.status(201).json({
            status: "success",
            data: blogData,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Error uploading file to S3" });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const alldata = await Blog.find();

    res.status(200).json({ status: "success", data: alldata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      filterdata,
      filterCategory,
    } = req.query;

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const paginatedData = await Blog.find({
      $or: [
        { title: { $regex: filterdata, $options: "i" } }, 
        { description: { $regex: filterdata, $options: "i" } }, 
      ],
    })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate({
        path: "tags_id",
        select: "tags", 
        match: { tags: { $regex: filterCategory, $options: "i" } },
      });

    const filteredData = paginatedData.filter(
      (item) => item.tags_id && item.tags_id.tags && item.tags_id.tags.length > 0
    );

    res.status(200).json({ status: "success", data: filteredData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateView = async (req, res) => {
  try {
    const { blog_id } = req.query;
    const blog = await Blog.findById({ _id: blog_id });

    let views = blog.view;
    views = views + 1;

    const viewUpdate = await Blog.findByIdAndUpdate(
      { _id: blog_id },
      { $set: { view: views } }
    );

    if (viewUpdate) {
      res.status(200).json({ status: "success", message: "view updated." });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};


const searchBlog = async (req, res) => {
  const query = req.query.titleDescriptionFilter;

  try {
    const data = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, 
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};


const getSingleBlog = async (req, res) => {
  try {
    const { blog_id } = req.query;

    const blogData = await Blog.findById({ _id: blog_id }).populate("tags_id");

    res.status(200).json({ status: "success", data: blogData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const topThreeBlog = async (req, res) => {
  try {
    const topThreeViewedPosts = await Blog.find()
      .sort({ view: -1 })
      .populate("tags_id")
      .limit(3);

    res.status(200).json({ status: "success", data: topThreeViewedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTags = async (req, res) => {
  try {
    const { blog_id } = req.query;
    const getBlogTags = await Tag.find({ blog_id: blog_id });

    res.status(200).json({ status: "success", data: getBlogTags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBlog,
  updateView,
  getBlogs,
  searchBlog,
  getAllBlogs,
  getSingleBlog,
  topThreeBlog,
  getTags,
};
