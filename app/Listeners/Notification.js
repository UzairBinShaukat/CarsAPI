"use strict";

const FCM = use("FCM");
const Notification = (exports = module.exports = {});

Notification.created = async (instance) => {
  const { title, text } = instance.toJSON();

  const recipients = { topic: "notifications" }; // or { registrationTokens: [...] }
  const response = await FCM.send(
    { notification: { title, body: text } },
    recipients
  );
  console.log(response);
};
