const fs = require('fs');
const initCloudinary = require('../config/cloudinary');

const imageUpload = async (reqFile) => {
    const cld = initCloudinary()

    try {
        const uploadResult = await cld.uploader.upload(reqFile.path)

        fs.unlinkSync(reqFile.path)
    
        return uploadResult.secure_url
    } catch (error) {
        throw new Error('Cloudinary Error Upload')
    }
}

module.exports = {
    imageUpload
}