const { IncomingWebhook } = require("@slack/webhook");
const morganBody = require("morgan-body");
const app = require("../app");

const url = process.env.SLACK_WEBHOOK;
const webhook = new IncomingWebhook(url);

const loggerSlack = {
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

morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerSlack,
});
