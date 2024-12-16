const env = require('./env');
const cloudinary = require('cloudinary').v2

const initCloudinary = () => {

    cloudinary.config({ 
        cloud_name: env.cldCloudName, 
        api_key: env.cldApiKey, 
        api_secret: env.cldApiSecret
    });

    return cloudinary
}

module.exports = initCloudinary