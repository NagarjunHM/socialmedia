import customError from "./errorHandlerMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profilePicture") {
      cb(null, "public/img/profilePicture");
    } else if (file.fieldname === "postImage") {
      cb(null, "public/img/postImage");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Custom middleware to handle profile picture uploads
export const profilePictureUpload = (req, res, next) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      console.log(err);
      throw new customError("Profile picture upload failed", 400);
    }
    next();
  });
};

// Custom middleware to handle post image uploads
export const postImageUpload = (req, res, next) => {
  upload.single("postImage")(req, res, (err) => {
    if (err) {
      console.log(err);
      throw new customError("Post image upload failed", 400);
    }
    next();
  });
};
