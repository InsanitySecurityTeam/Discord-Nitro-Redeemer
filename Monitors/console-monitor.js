const colors = require("colors");
module.exports = function (logMessage, type = "info") {
  let logString;
  let logFormatting;

  switch (type) {
    case "debug":
      logString = colors.white(logMessage);
      logFormatting = colors.bgMagenta(colors.white(colors.bold("[ DEBUG ]")));
      break;
    case "info":
      logString = colors.white(logMessage);
      logFormatting = colors.white(colors.bold("[ INFO ]"));
      break;
    case "critical":
      logString = colors.bgRed(colors.white(logMessage));
      logFormatting = colors.bgRed(colors.white(colors.bold("[ CRITICAL ]")));
      break;
    case "gift":
      logString = colors.green(logMessage);
      logFormatting = colors.bgGreen(colors.black(colors.bold("[ GIFT CODE DETECTED ]")));
      break;
    default:
      logString = colors.white(logMessage);
      logFormatting = colors.white(colors.bold("[ INFO ]"));
      break;
  }
  console.log(logFormatting, logString);
}