import {
  getFriends,
  getPendingFriendsReq,
  toggleFriends,
  responseToRequest,
} from "./firendRepository.js";

// get friends list
export const getFriendsController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await getFriends(req.params.userId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// get all pending requests
export const getPendingFriendsReqController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await getPendingFriendsReq(req.userId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

export const toggleFriendsController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await toggleFriends(
      req.userId,
      req.params.friendId
    );
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// get all pending requests
export const responseToRequestController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await responseToRequest(
      req.userId,
      req.params.friendId,
      req.body.status
    );
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
