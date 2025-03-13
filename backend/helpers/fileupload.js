const multer = require("multer");
const path = require("path");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // Save images to "public/images" folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // Remove spaces
    const randomStr = Math.random().toString(36).substring(2, 8); // Random string
    cb(null, `${baseName}_${Date.now()}_${randomStr}${ext}`); // Construct filename
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpeg", ".jpg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, PNG, and WEBP allowed."),
      false
    );
  }
};

// Initialize Multer
exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
