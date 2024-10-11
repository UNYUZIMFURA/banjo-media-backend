const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const likePost = async (req, res) => {
  const userId = req.user.id;
  const postId  = req.params.id;

  if(!postId) {
    return res.status(400).json({
        success: false,
        message: "Provide a Post ID!"
    })
  }

  try {
    const isLikeExisting = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if(isLikeExisting) {
        return res.status(400).json({
            success: false,
            message: "Already liked the post"
        })
    }
    const like = await prisma.like.create({
        data: {
            userId,
            postId
        }
    })

    return res.status(200).json({
        success: true,
        message: "Successfully liked the post",
        like
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error liking post",
    });
  }
};

const unlikePost = async(req,res) => {
    const userId = req.user.id
    const {postId} = req.body
    try {
      const like = await prisma.like.findFirst({
        where: {
            userId,
            postId
        }
      })
      if(!like) {
        return res.status(400).json({
            success: false,
            message: "There is no like associated with the provided post"
        })
      }
      await prisma.like.delete({
        where: {
            id: like.id
        }
      })
      return res.status(204).json({})
    } catch(err) {
       return res.status(500).json({
        success: false,
        message: "Error unliking post"
       })
    }
 }

module.exports = { likePost, unlikePost };
