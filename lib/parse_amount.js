var numbro = require("numbro");

function parse_amount(args) {
  let abbreviations = ['m', 'M', 'k', 'K', 'b', 'B', 'kk', 'KK']
  let amount;
  let response_message;

  if (new RegExp(abbreviations.join("|")).test(args)) {
    amount = numbro.unformat(args.toLowerCase());
  } else {
    amount = parseInt(args);
  }

  return amount;
}

module.exports = {
  parse_amount
}