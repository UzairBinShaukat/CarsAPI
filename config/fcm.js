"use strict";

const Env = use("Env");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | API KEY
  |--------------------------------------------------------------------------
  |
  | The key api Cloud Messaging
  |
  */
  apiKey: Env.getOrFail("FCM_API_KEY"), // Env.get('FCM_API_KEY'),

  requestOptions: {
    proxy: "http://127.0.0.1:3333",
    timeout: 5000,
  },
};
