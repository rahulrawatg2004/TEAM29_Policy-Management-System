const multer = require('multer');

// memory storage -> suitable for immediate S3 upload
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

module.exports = upload;