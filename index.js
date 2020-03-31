"use strict";

const line = require("@line/bot-sdk");
const crypto = require("crypto");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

const calendar = [
  {
    date: "20200401",
    place: "阪神",
    name: "大阪杯",
    conditions: "4歳以上",
    course: "芝2,000メートル"
  },
  {
    date: "20200406",
    place: "阪神",
    name: "大阪杯",
    conditions: "4歳以上",
    course: "芝2,000メートル"
  }
];

exports.sendLine = (pubSubEvent, context) => {
  const today = dayjs().format("YYYYMMDD");

  const keiba = calendar.find(cal => {
    return cal.date === today;
  });

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
