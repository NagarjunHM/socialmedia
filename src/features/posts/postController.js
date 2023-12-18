import {
  createPost,
  deletePost,
  fetchAllPost,
  fetchAllUserPost,
  fetchPostById,
  updatePost,
} from "./postRepository.js";

// create new post
export const createPostController = async (req, res, next) => {
  try {
    const postDetails = { ...req.body, postImage: req.file.path };
    const { statusCode, msg } = await createPost(req.userId, postDetails);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// delete old post
export const deletePostController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await deletePost(req.userId, req.params.postId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

//fetch all posts
export const fetchAllPostController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await fetchAllPost();
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// fetch specific post by post id
export const fetchPostByIdController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await fetchPostById(req.params.postId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// fetch all specific users post
export const fetchAllUserPostController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await fetchAllUserPost(req.userId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// update post
export const updatePostController = async (req, res, next) => {
  try {
    const postDetails = { ...req.body, postImage: req.file.path };
    const { statusCode, msg } = await updatePost(
      req.params.postId,
      postDetails
    );
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
