const { IncomingWebhook } = require("@slack/webhook");

const url = process.env.SLACK_WEBHOOK;
const webhook = new IncomingWebhook(url);

exports.loggerSlack = {
  write: (message) => {
    if (process.env.NODE_ENV === "production") {
      webhook.send({
        text: stripAnsi("```" + message + "```"),
      });
    } else if (process.env.NODE_ENV === "development") {
      console.log("ERROR", message);
    }
  },
};
