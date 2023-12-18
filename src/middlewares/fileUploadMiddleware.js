import customError from "./errorHandlerMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const imageFileFilter = (req, file, cb) => {
  // Check if the file is an image by inspecting the file's originalname or mimetype
  const isImage =
    file.mimetype.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif)$/i.test(file.originalname);

  if (isImage) {
    cb(null, true); // Accept the file
  } else {
    cb(new customError("Invalid file type. Only images are allowed."), false); // Reject the file
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profilePicture") {
      cb(null, path.join("public", "img", "profilePicture"));
    } else if (file.fieldname === "postImage") {
      cb(null, path.join("public", "img", "postImage"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

// Custom middleware to handle profile picture uploads
export const profilePictureUpload = (req, res, next) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      console.log(err);
      next(
        new customError("Profile picture upload failed, Invalid file type", 400)
      );
    }
    next();
  });
};

// Custom middleware to handle post image uploads
export const postImageUpload = (req, res, next) => {
  upload.single("postImage")(req, res, (err) => {
    if (err) {
      console.log(err);
      next(new customError("Post image upload failed, Invalid file type", 400));
    }
    next();
  });
};

// delete post from the server
export const deleteOldUploads = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(`Error deleting old image: ${err}`);
    } else {
      console.log("Old image deleted successfully");
    }
  });
};
