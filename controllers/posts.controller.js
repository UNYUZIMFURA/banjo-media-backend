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
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true
      }
    });
    return res.status(200).json({
      success: true,
      message: "Posts fetched",
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id
  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
        userId
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
        id
      },
    });

    return res.status(204).json({})
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error deleting post",
    });
  }
};

module.exports = { createPost, getPosts, deletePost };
