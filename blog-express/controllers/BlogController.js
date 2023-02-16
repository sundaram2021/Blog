import BlogModel from "../Models/BlogModel.js";

export const getBlog = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(204).json("Invalid Input");
  }

  const blogExist = await BlogModel.findOne({ title });

  try {
    if (blogExist) {
      return res.status(403).json("Blog Already exist");
    }

    const blog = new BlogModel({
      title,
      body,
    });

    await blog.save();

    return res.status(201).json({ message: "Blog posted" });
  } catch (error) {
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
