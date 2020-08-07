require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const formidable = require('formidable');
const UploadsModel = require('../../models/update.model');
const FoodsModel = require('../../models/foods.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImages = async (req, res) => {
  

  // try {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.resourceId)) {
  //     return res.status(400).json({ message: 'Foods not found.' });
  //   }

  //   const foods = await FoodsModel.findById(req.params.resourceId);

  //   if (!foods) {
  //     return res.status(400).json({ message: 'Foods not found.' });
  //   }
  // } catch (err) {
  //   res.status(500).send(err);
  // }

  // const form = formidable({
  //   hash: 'sha256',
  //   multiples: true,
  //   keepExtensions: true
  // });

  // form.onPart = part => {
  //   if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(part.mime) !== -1) {
  //     // Here is the invalid file types will be handled. 
  //     // You can listen on 'error' event
  //     // form._error(new Error('File type is not supported'));
  //     form.handlePart(part);
  //   }
  // };

  // const validateFiles = files => {

  //   let validfileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  //   let result = true;


  //   for (let fieldName in files) {
  //     const fieldData = files[fieldName];

  //     if (Array.isArray(fieldData)) {
  //       fieldData.forEach(f => {
  //         if (
  //           f.type === null ||
  //           validfileTypes.indexOf(f.type) === -1
  //         ) {
  //           result = false;
  //         }
  //       });
  //     } else {
  //       if (
  //         fieldData.type === null ||
  //         validfileTypes.indexOf(fieldData.type) === -1
  //       ) {
  //         result = false;
  //       }
  //     }
  //   }

  //   return result;
  // };

  // form.parse(req, async (err, fields, files) => {

  //   const filesResult = [];

  //   if (!validateFiles(files)) {
  //     res.status(500).send({ message: 'File type(s) not supprted' });
  //     return;
  //   }

  //   for (let fieldName in files) {
  //     const fieldData = files[fieldName];

  //     if (Array.isArray(fieldData)) {
  //       fieldData.forEach(f => {
  //         const filename = path.basename(f.path);
  //         const newFileLocation = path.join(__dirname, '../../public', filename);
  //         fs.renameSync(f.path, newFileLocation);
  //         filesResult.push({
  //           fieldName,
  //           hash: f.hash,
  //           originalFileName: f.name,
  //           filename,
  //           sizeInBytes: f.size,
  //           mimeType: f.type,
  //           path: f.path
  //         });
  //       });
  //     } else {
  //       const filename = path.basename(fieldData.path);
  //       const newFileLocation = path.join(__dirname, '../../public', filename);
  //       fs.renameSync(fieldData.path, newFileLocation);
  //       filesResult.push({
  //         fieldName,
  //         hash: fieldData.hash,
  //         originalFileName: fieldData.name,
  //         filename,
  //         sizeInBytes: fieldData.size,
  //         mimeType: fieldData.type,
  //         path: fieldData.path
  //       });
  //     }
  //   }  

    // UploadsModel.findOneAndDelete({ resourceType: 'comida', 
    // resourceId: new mongoose.Types.ObjectId(req.params.resourceId) });
    // const upload = new UploadsModel({
    //   resourceType: 'comida',
    //   resourceId: new mongoose.Types.ObjectId(req.params.resourceId),
    //   files: filesResult,
    // });
    
    /* 'static/' + upload.files[0].filename */

    console.log("Entrando al upload");

    try {
      const values = Object.values(req.files)
      console.log('Antes del promise');
      const promises = values.map(image => cloudinary.uploader.upload(image.path))
      console.log(values);
      await Promise.all(promises)

      const results = await Promise.all(promises)
      console.log(results);
      // const result = await cloudinary.uploader.upload('public/' + upload.files[0].filename);
      // await upload.save();
      await FoodsModel.findByIdAndUpdate(req.params.resourceId, { imageUrl:  results[0].secure_url }, { new: true });
      res.send(results[0].secure_url);
    } catch (err) {
      res.status(500).send(err);
    }
  
};