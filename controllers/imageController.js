require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const ImageModel = require('../models/images');
const userModel = require('../models/User');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.API_SECRET
});

const addProfilePhoto = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                console.error('Error parsing form data:', err);
                return res.status(400).json({ error: 'Failed to parse form data' });
            }

            const imageFile = files.image && files.image[0];
            if (!imageFile) {
                console.error('No image file uploaded');
                return res.status(400).json({ error: 'No image file uploaded' });
            }

            const filePath = imageFile.filepath;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                fetch_format: 'auto',
                quality: 'auto',
            });

            // Update user profile photo in database
            const userId = req.user.id; // Ensure you pass `userId` in the request fields
            const profilePhoto = await userModel.findByIdAndUpdate(
                userId,
                { profileImage: result.secure_url },
                { new: true } // Returns the updated document
            );

            if (profilePhoto) {
                res.status(200).json({ status: true, message: 'Photo updated successfully', profilePhoto });
            } else {
                res.status(404).json({ status: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({ error: 'An error occurred while processing the request' });
        }
    });
};

const albums = async (req, res) =>{
    const userId = req.params.userId;
    try {
        const album = await ImageModel.find({user: userId}).sort({createdAt: -1});
        if (album) {
            return res.status(200).json({album});
        }
    } catch (error) {
        return res.status(500).json({message: 'sorry a server error just occured'});
    }
}

const albumImages = async (req, res) =>{
    const id = req.params.id;
    try {
        const album = await ImageModel.findById(id);
        if (album) {
            const sortedPhotos = album.photos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return res.status(200).json({success: true, album:{
                ...album._doc, photos: sortedPhotos
            }});
        }
    } catch (error) {
        return res.status(500).json({message: 'sorry a server error just occured'});
    }
}

const addAlbumPhotos = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
  
    form.parse(req, async (err, fields, files) => {
      try {
        if (err) {
          console.error('Error parsing form data:', err);
          return res.status(400).json({ error: 'Failed to parse form data' });
        }
  
        console.log('Files received by formidable:', files);
  
        const uploadedFiles = files.photo1
          ? Array.isArray(files.photo1)
            ? files.photo1
            : [files.photo1]
          : []; // Ensure it's an array or empty
  
        if (uploadedFiles.length === 0) {
          return res.status(400).json({ error: 'No image files uploaded' });
        }
  
        const albumId = req.params.id;
        if (!albumId) {
          return res.status(400).json({ error: 'Album ID is required' });
        }
  
        const album = await ImageModel.findById(albumId);
        if (!album) {
          return res.status(404).json({ error: 'Album not found' });
        }
        
        const uploadedImageUrls = []; 
        for (const file of uploadedFiles) {
            const result = await cloudinary.uploader.upload(file.filepath, {
                fetch_format: 'auto',
                quality: 'auto',
            });
            uploadedImageUrls.push({ url: result.secure_url });
        }

        // Append new images to the `photos` array
        album.photos = [...album.photos, ...uploadedImageUrls];
        await album.save();

        res.status(200).json({
            status: true,
            message: 'Photos added successfully',
            album,
        });


      } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
      }
    });
  };
  


const createAlbum = async (req, res) =>{
    const {albumName, albumDesc} = req.body
    try {
        const userId = req.user.id;
        const album = await ImageModel.countDocuments({user: userId})
        if(album < 3){
            const newAlbum = new ImageModel({user: userId, albumName, albumDesc});
            const freshAlbum = await newAlbum.save();

            return res.status(201).json({created: true, freshAlbum});
        }
    } catch (error) {
        return res.status(500).json({created: false, message: 'Sorry an error occured'});
    }
}

const deleteAlbum = async (req, res) =>{
    
}

module.exports = {createAlbum, addProfilePhoto, albums, albumImages, addAlbumPhotos};