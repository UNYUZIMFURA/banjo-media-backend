const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Provide content for your post!",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      err
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        likes: true
      },
    });
    return res.status(200).json({
      success: true,
      message: "Posts fetched",
      posts,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Error fetching posts",
      err
    });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: true,
        message: "Post not found",
      });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id,
        userId,
      },
      data: {
        content,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Updated the post",
      updatedPost,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Error updating post",
      err
    });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    await prisma.post.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error deleting post",
      err
    });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
