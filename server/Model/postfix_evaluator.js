const mongoose = require("mongoose");

const postfix_Eval_schema = new mongoose.Schema({
  UID: { type: String, required: true },
  expression: { type: String, required: true },
});

module.exports = mongoose.model("Postfix_Eval", postfix_Eval_schema);
