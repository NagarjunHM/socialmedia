import { getLikes, toggleLikes } from "./likeRepository.js";

// get all likes
export const getLikesController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await getLikes(req.params.id);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// toggle like

export const toggleLikesController = async (req, res, next) => {
  try {
    const result = await toggleLikes(req.params.id, req.body.type, req.userId);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};
