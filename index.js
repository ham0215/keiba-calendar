"use strict";

const express = require('express');
const line = require("@line/bot-sdk");
const dayjs = require("dayjs");
require("dayjs/locale/ja");
const keibaCalendar = require("./keiba-calendar").keibaCalendar;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const today = dayjs()
      .add(9, "hour")
      .format("YYYYMMDD");
    console.log(dayjs().add(9, "hour"));
    console.log(today);
    const keiba = keibaCalendar.find(cal => {
      return cal.date === today;
    });

    let lineMessage;
    if (keiba) {
      console.log("Found keiba event:", keiba);
      lineMessage = {
        type: 'text',
        text: `今日は${keiba.place}競馬場で${keiba.name}が開催されます。\n${keiba.conditions}\n${keiba.course}`,
      };
    } else if (dateToUse === '20240112') {
      lineMessage = {
        type: 'text',
        text: '遅くなりましたが、今年もよろしくお願いします！',
      };
    } else if (process.env.CI) {
      lineMessage = {
        type: 'text',
        text: 'keiba-calendar is running on CI',
      };
    }

    if (!lineMessage) {
      return res.status(204).send('No Content');
    }

    // LINE メッセージの送信
    console.log("Sending message:", lineMessage);
    await client.pushMessage(process.env.group_id, lineMessage);
    console.log('Push message sent successfully.');
    res.status(200).send('Message sent successfully.');

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }
});

const PORT = parseInt(parseInt(process.env.PORT)) || 8080;
app.listen(PORT, () =>
  console.log(`nodejs-pubsub-tutorial listening on port ${PORT}`)
);
