"use strict";

const line = require("@line/bot-sdk");
const dayjs = require("dayjs");
const keibaCalendar = require("./keiba-calendar").keibaCalendar;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

exports.sendLine = (pubSubEvent, context) => {
  const today = dayjs().format("YYYYMMDD");
  console.log(today);
  const keiba = keibaCalendar.find(cal => {
    return cal.date === today;
  });
  console.log(keiba);

  if (!keiba) return;

  const message = {
    type: "text",
    text: `今日は${keiba.place}競馬場で${keiba.name}が開催されます。\n${keiba.conditions}\n${keiba.course}`
  };

  client
    .pushMessage(process.env.group_id, message)
    .then(() => {
      console.log("push message done");
    })
    .catch(err => {
      console.log("push message error");
      console.log(err);
    });
};
