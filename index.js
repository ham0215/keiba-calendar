"use strict";

const line = require("@line/bot-sdk");
const dayjs = require("dayjs");
require("dayjs/locale/ja");
const keibaCalendar = require("./keiba-calendar").keibaCalendar;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

exports.sendLine = (pubSubEvent, context) => {
  const today = dayjs()
    .add(9, "hour")
    .format("YYYYMMDD");
  console.log(dayjs().add(9, "hour"));
  console.log(today);
  const keiba = keibaCalendar.find(cal => {
    return cal.date === today;
  });

  let message;
  if (keiba) {
    console.log(keiba);
    message = {
      type: "text",
      text: `今日は${keiba.place}競馬場で${keiba.name}が開催されます。\n${keiba.conditions}\n${keiba.course}`
    };
  } else if (today === '20240121') {
    message = {
      type: "text",
      text: "遅くなりましたが、中川ちゃんおめでとうございます！"
    };
  } else if (process.env.CI) {
    message = {
      type: "text",
      text: "keiba-calendar is running on CI"
    };
  }

  if (!message) return;

  console.log(message);
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
