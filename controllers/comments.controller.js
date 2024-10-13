const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id;

  if (!postId) {
    return res.status(400).json({
      success: false,
      message: "Provide postId for the Post",
    });
  }

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Provide content for your comment!",
    });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Comment added!",
      comment,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
      err
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    return res.status(200).json({
      success: true,
      message: "Comments fetched",
      comments,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      err
    });
  }
};

const updateComment = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "No comment found",
      });
    }

    const updatedComment = await prisma.comment.update({
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
      message: "Updated the comment",
      updatedComment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error updating comment",
      err
    });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "No comment found",
      });
    }
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({});
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      err
    });
  }
};

module.exports = { addComment, getComments, updateComment, deleteComment };
