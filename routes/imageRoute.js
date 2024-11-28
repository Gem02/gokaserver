const express = require('express');;
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const {addProfilePhoto, createAlbum ,albums, albumImages, addAlbumPhotos} = require('../controllers/imageController');

router.put('/addProfilePhoto', verifyToken, addProfilePhoto );
router.post('/createAlbum', verifyToken, createAlbum);
router.get('/albums/:userId', verifyToken, albums);
router.get('/albumImages/:id', verifyToken, albumImages);
router.post('/addAlbumImages/:id', verifyToken, addAlbumPhotos);

module.exports = router