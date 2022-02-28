const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  const files = [
    "./dist/google-dialog-flow-chat-bot/runtime.js",
    "./dist/google-dialog-flow-chat-bot/polyfills.js",
    "./dist/google-dialog-flow-chat-bot/scripts.js",
    "./dist/google-dialog-flow-chat-bot/main.js",
  ];
  const filescss = [
    "./dist/google-dialog-flow-chat-bot/styles.css"
  ];
  await fs.ensureDir("widget");
  await concat(files, "C:/Cappy/DialogFlow/Published/news-widget.js");
  await concat(filescss, "C:/Cappy/DialogFlow/Published/news-widget.css");
};
build();
