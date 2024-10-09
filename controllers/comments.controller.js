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
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

const getComments = async(req,res) => {
    try{
        const comments = await prisma.comment.findMany()
         return res.status(200).json({
            success: true,
            message: "Comments fetched"
         })
    } catch(err) {

    }    
}

module.exports = { addComment };
