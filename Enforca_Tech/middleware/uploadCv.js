const multer = require('multer');
const path = require('path');

// Use memory storage to hold the file temporarily
const storage = multer.memoryStorage();

// File filter function to allow only .pdf and .docx files
function fileFilter(req, file, cb) {
  const allowedTypes = ['.pdf', '.docx'];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(fileExt)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only .pdf and .docx formats are allowed!')); // Reject file
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('cv');
const uploadCv = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Handle the uploaded file here
    // Example: log the file buffer size
    console.log(`Uploaded file size: ${req.file.buffer.length} bytes`);

    // Delete the file immediately after processing
    req.file = null; // Clear the file from memory

    // Respond to the client
    res.status(200).json({
      message: 'CV uploaded successfully!'
    });
  });
};

module.exports = uploadCv;