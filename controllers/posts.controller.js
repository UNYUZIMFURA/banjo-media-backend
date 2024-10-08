const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Missing user Id",
    });
  }

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
    const posts = await prisma.post.findMany();
    return res.status(200).json({
      success: true,
      message: "Posts fetched",
      posts
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};

module.exports = { createPost, getPosts };
