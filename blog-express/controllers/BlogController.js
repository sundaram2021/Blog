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

export const getBlogData = async(req, res) => {
  try{
    const id = req.body.id;
    console.log(id);
    const blog = await BlogModel.findOne({_id: id });
    const { _id, title, body } = blog;

    return res.json({title: title, id: _id, body: body, message: "Blog Sent successfully"})

  } catch(e) {
    res.status(400).json({ messsage: e })
  }
}

export const postLikeData = async(req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const blog = await BlogModel.findOne({_id: id});
    if(!blog) {
      return res.json({ message : "Blog not found in server" })
    }

    const myblog = await BlogModel.findByIdAndUpdate(id, { like: true });

    return res.json({ data: myblog })

  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e })
  }
}
export const postSaveData = async(req, res) => {
  try {
    const id = JSON.parse(req.body.id);
    console.log(id);
    const blog = await BlogModel.findOne({_id: id});
    if(!blog) {
      return res.json({ message : "Blog not found in server" })
    }

    const myblog = await BlogModel.findByIdAndUpdate(id, { save: true });

    return res.json({ data: myblog })

  } catch (e) {
    console.log(e);
    res.json({ message: e })
  }
}
