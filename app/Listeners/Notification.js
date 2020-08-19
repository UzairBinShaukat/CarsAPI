"use strict";

const Notification = (exports = module.exports = {});
var axios = use("axios");

Notification.created = async (instance) => {
  var data = JSON.stringify({
    data: instance,
    to: process.env.DEVICE_TOKEN,
  });
  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Content-Type": "application/json",
      Authorization: "key=" + process.env.FCM_API_KEY,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.success === 1) console.log("Notification Delivered");
    })
    .catch(function (error) {
      console.log(error);
    });
};
