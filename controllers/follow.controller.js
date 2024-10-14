const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const followUser = async (req, res) => {
  const userId = req.user.id;
  const followId = req.params.id;

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId: followId,
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    const newFollower = await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: followId,
      },
    });

    return res.status(201).json(newFollower);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error following user",
      err,
    });
  }
};

const unfollowUser = async (req, res) => {
  const userId = req.user.id;
  const followingId = req.params.id;

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId,
      },
    });

    if (!existingFollow) {
      return res.status(400).json({
        success: false,
        message: "You don't follow this user",
      });
    }
    
    await prisma.follower.delete({
      where: {
        id: existingFollow.id,
      },
    });
    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error unfollowing user",
      err,
    });
  }
};

module.exports = { followUser, unfollowUser };
