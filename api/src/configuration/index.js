module.exports.port = process.env.PORT || 3000;
module.exports.host = process.env.HOST || 'localhost';
module.exports.db = process.env.MONGO_URL;
module.exports.authApiUrl = process.env.AUTH_API_URL