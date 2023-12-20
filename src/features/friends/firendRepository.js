import { friendModel } from "./friendSchema.js";

// get all friends
export const getFriends = async (userId) => {
  try {
    const friends = await friendModel
      .find({
        $or: [
          { user1: userId, status: "accepted" },
          { user2: userId, status: "accepted" },
        ],
      })
      .populate("user1", "name email profilePicture")
      .populate("user2", "name email profilePicture");

    if (friends.length > 0) {
      return { statusCode: 200, msg: friends };
    } else {
      return { statusCode: 404, msg: "no friends found" };
    }
  } catch (err) {
    throw err;
  }
};

// get pending requests
export const getPendingFriendsReq = async (userId) => {
  try {
    const friends = await friendModel
      .find({
        $or: [
          { user1: userId, status: "pending" },
          { user2: userId, status: "pending" },
        ],
      })
      .populate("user1", "name email profilePicture")
      .populate("user2", "name email profilePicture");

    if (friends.length > 0) {
      return { statusCode: 200, msg: friends };
    } else {
      return { statusCode: 404, msg: "no pending friend requestes" };
    }
  } catch (err) {
    throw err;
  }
};

// Toggle friendship status or send new friend request
export const toggleFriends = async (userId, friendId) => {
  try {
    // Check if there's an existing friendship
    const existingFriendship = await friendModel.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });

    if (existingFriendship) {
      // If the existing friendship was rejected, update status to "pending"
      if (existingFriendship.status === "rejected") {
        existingFriendship.status = "pending";
        await existingFriendship.save();

        return { statusCode: 200, msg: "Friendship status updated to pending" };
      }

      // Toggle the friendship status
      existingFriendship.status =
        existingFriendship.status === "accepted" ? "pending" : "accepted";
      await existingFriendship.save();
      return {
        statusCode: 200,
        msg: "Friendship status toggled successfully",
      };
    } else {
      // Create a new friend request with a "pending" status
      const newFriendship = new friendModel({
        user1: userId,
        user2: friendId,
        status: "pending",
      });

      await newFriendship.save();

      return { statusCode: 201, msg: "Friendship request sent successfully" };
    }
  } catch (err) {
    throw err;
  }
};

// function to response to request
export const responseToRequest = async (userId, friendId, status) => {
  try {
    const existingFriendShip = await friendModel.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
      status: "pending",
    });

    if (!existingFriendShip) {
      return { statusCode: 404, msg: "friendship request not found" };
    }

    existingFriendShip.status = status === "accept" ? "accepted" : "rejected";
    await existingFriendShip.save();
    return {
      statusCode: 200,
      msg: "Friendship request responded successfully",
    };
  } catch (err) {
    throw err;
  }
};
