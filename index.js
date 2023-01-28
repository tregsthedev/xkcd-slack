

const { App } = require('@slack/bolt');
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});



app.message('hello', async ({ message, say }) => {
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ ack, say }) => {
  await ack();
  await say('Button was clicked!');
});

app.command('/comic', async ({ command, ack, say }) => {
  
  await ack();
  await say(`<@${command.user_name}> requested a comic!`);


});

(async () => {
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!');
  console.log("hi")
})();