require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const formidable = require('formidable');
const UploadsModel = require('../../models/update.model');
const FoodsModel = require('../../models/foods.model');
const Cloudinary = require('cloudinary');


exports.uploadImages = async (req, res) => {
  Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.resourceId)) {
      return res.status(400).json({ message: 'Foods not found.' });
    }

    const foods = await FoodsModel.findById(req.params.resourceId);

    if (!foods) {
      return res.status(400).json({ message: 'Foods not found.' });
    }
  } catch (err) {
    res.status(500).send(err);
  }

  const form = formidable({
    hash: 'sha256',
    multiples: true,
    keepExtensions: true
  });

  form.onPart = part => {
    if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(part.mime) !== -1) {
      // Here is the invalid file types will be handled. 
      // You can listen on 'error' event
      // form._error(new Error('File type is not supported'));
      form.handlePart(part);
    }
  };

  const validateFiles = files => {

    let validfileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    let result = true;


    for (let fieldName in files) {
      const fieldData = files[fieldName];

      if (Array.isArray(fieldData)) {
        fieldData.forEach(f => {
          if (
            f.type === null ||
            validfileTypes.indexOf(f.type) === -1
          ) {
            result = false;
          }
        });
      } else {
        if (
          fieldData.type === null ||
          validfileTypes.indexOf(fieldData.type) === -1
        ) {
          result = false;
        }
      }
    }

    return result;
  };

  form.parse(req, async (err, fields, files) => {

    const filesResult = [];

    if (!validateFiles(files)) {
      res.status(500).send({ message: 'File type(s) not supprted' });
      return;
    }

    for (let fieldName in files) {
      const fieldData = files[fieldName];

      if (Array.isArray(fieldData)) {
        fieldData.forEach(f => {
          const filename = path.basename(f.path);
          const newFileLocation = path.join(__dirname, '../../public', filename);
          fs.renameSync(f.path, newFileLocation);
          filesResult.push({
            fieldName,
            hash: f.hash,
            originalFileName: f.name,
            filename,
            sizeInBytes: f.size,
            mimeType: f.type
          });
        });
      } else {
        const filename = path.basename(fieldData.path);
        const newFileLocation = path.join(__dirname, '../../public', filename);
        fs.renameSync(fieldData.path, newFileLocation);
        filesResult.push({
          fieldName,
          hash: fieldData.hash,
          originalFileName: fieldData.name,
          filename,
          sizeInBytes: fieldData.size,
          mimeType: fieldData.type
        });
      }
    }

    
    UploadsModel.findOneAndDelete({ resourceType: 'comida', 
    resourceId: new mongoose.Types.ObjectId(req.params.resourceId) });
    const cloudResult = await Cloudinary.v2.uploader.upload(__filename)
    console.log(__filename);
    console.log(cloudResult);
    const upload = new UploadsModel({
      resourceType: 'comida',
      resourceId: new mongoose.Types.ObjectId(req.params.resourceId),
      files: filesResult,
    });

    try {
      await upload.save();
      await FoodsModel.findByIdAndUpdate(req.params.resourceId, { imageUrl: 'static/' + upload.files[0].filename }, { new: true });
      res.send(upload);
    } catch (err) {
      res.status(500).send(err);
    }

  });
};