const midtransClient = require('midtrans-client');
const { midtransServerKey, midtransClientKey } = require('./env');

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: midtransServerKey,
    clientKey: midtransClientKey,
});

module.exports = snap;
