var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOiKY8zKdd4TTpEBRVf8pS3CKiiw1sGBfmdk43GjM9q65jDrFdQzq1OlhgDAPRGfM6uya8uiSHQ1S3zG7cyzjzY",
    "privateKey": "3wvY0dtarv-wEzRATuBEXOcYYpe1GFyCninuFWd7zAI"
}

webPush.setVapidDetails(
    'mailto:egierdian1@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fZAmhpyWpn8:APA91bGlvX5M5Y-c7woKpvN9s5KvEikqfqTGfQnI5Il_y8YUc-hBSnw3_BilQodvCoBenogvkgbeMncQDGPz1Z388u2hjnDdIKcvj9FeEnHNGGMzHGii3ppjASfsbHkOUZW1CZ3nfDis",
    "keys":{
        "p256dh": "BGsMujwdB3rBSbxIQyMxNZuampeo8+hdNGPry27GFk/GbxxTWqPucfTWhs0OUlHAMFJdkstrAHWjkMQfv8imWSc=",
        "auth": "NRvtb9KFSfGBGNLds82z5Q=="
    }
}
var payload = 'Notifikasi push notifikasi!';
var options = {
    gcmAPIKey: '987384101439',
    TTL: 60
};

 webPush.sendNotification(
    pushSubscription,
    payload,
    options
);