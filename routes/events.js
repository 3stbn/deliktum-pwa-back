const router = require('express').Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.params.id + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/' , (req, res) => { return eventsController.list(req, res) });

router.post('/', (req, res) => { return eventsController.create(req,res) });

router.post('/image/:id', upload.single('eventImage'), (req, res) => {
	return eventsController.uploadImage(req,res)
});

router.get('/:id' , (req, res) => { return eventsController.find(req,res) });

module.exports = router;