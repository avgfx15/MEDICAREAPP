const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    cb(null, "uploads/");
    console.log("Destination Folder Created");
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
    console.log("File name created");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("upload function run");
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { filesize: 1024 * 1024 * 5 },
});

module.exports = upload;
