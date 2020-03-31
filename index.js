"use strict";

const line = require("@line/bot-sdk");
const crypto = require("crypto");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

exports.sendLine = (pubSubEvent, context) => {

  let message = 'hogehoge';

  client.pushMessage(process.env.group_id, message).then(() => {
    console.log('push message done');
  }).catch((err) => {
    console.log('push message error');
    console.log(err);
  });
};
