import BlogModel from "../Models/BlogModel.js";
import RegisterModel from "../Models/RegisterModel.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const getBlog = async (req, res) => {
  const { title, body, firstname } = req.body;
  // console.log(req.body);

  // console.log(title);
  // console.log(body);

  if (!title || !body || !firstname) {
    return res.status(204).json("Invalid Input");
  }

  const blogExist = await BlogModel.findOne({ title });
  if (blogExist) {
    return res.status(403).json("Blog Already exist");
  }
  try {
    await BlogModel.create({
      title,
      body,
      createdBy: firstname,
      like: false,
      save: false,
      comment: [],
      isChecked: false,
    });

    return res.status(201).json({ message: "Blog posted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getData = async (req, res) => {
  try {
    const models = await BlogModel.find(); // Retrieve all models from the database
    const blogModel = models.map((item) => item);
    // console.log(blogModel);
    return res.json({ myBlogs: blogModel }); // Send the models as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogData = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const blog = await BlogModel.findOne({ _id: id });
    const { _id, title, body } = blog;

    return res.json({
      title: title,
      id: _id,
      body: body,
      message: "Blog Sent successfully",
    });
  } catch (e) {
    res.status(400).json({ messsage: e });
  }
};

export const postLikeData = async (req, res) => {
  try {
    const { _id } = req.body;
    // console.log(json);
    const blog = await BlogModel.findOne({ _id });
    if (!blog) {
      return res.json({ message: "Blog not found in server" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      _id,
      { like: !blog.like },
      { new: true }
    );

    return res.json(updatedBlog);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
};
export const postSaveData = async (req, res) => {
  try {
    // const id = JSON.parse(req.body.id);4
    const { _id } = req.body;
    // console.log(json);
    const blog = await BlogModel.findOne({ _id });
    if (!blog) {
      return res.json({ message: "Blog not found in server" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      _id,
      { save: !blog.save },
      { new: true }
    );

    return res.json(updatedBlog);
  } catch (e) {
    console.log(e);
    res.json({ message: e });
  }
};

export const postComment = async (req, res) => {
  try {
    const { _id, comment = "", firstname } = req.body;

    console.log(firstname);

    console.log(comment);

    const blog = await BlogModel.findOne({ _id });

    if (!blog) {
      // return an error response if no blog found with the given _id
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = await BlogModel.updateMany(
      { _id: _id },
      {
        $set: {
          comment: [...blog.comment, { text: comment, author: firstname }],
          isChecked: !blog.isChecked,
        },
      }
    );
    // await BlogModel.save();
    return res.json(updatedBlog);
  } catch (e) {
    console.log(e);
    res.json({ message: e });
  }
};

export const getUserBlogs = async (req, res) => {
  const token = req.headers["x-access-token"];
  //   console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const userArticles = await BlogModel.find({});

    return res.status(200).json({ status: "ok", articles: userArticles });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  BlogModel.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.error(err);
    } else {
      return res.json({ message: "Blog deleted successfully'" });
    }
  });
};

export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {
      $pull: {
        comment: {
          _id: commentId
        }
      }
    }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};