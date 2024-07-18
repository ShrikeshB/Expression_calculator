const Postfix_Eval = require("../Model/postfix_evaluator");

exports.post_eval = async (req, res) => {
  const { UID, expression } = req.body;
  
  try {
    const newExpression = new Postfix_Eval({ UID, expression });
    await newExpression.save();
    res.status(201).json({ message: 'Expression saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save expression.' });
  }
};

exports.get_post_eval = async (req, res) => {
  const { UID } = req.query; // Use req.query for GET request
  console.log(UID);
  try {
    const expressions = await Postfix_Eval.find({ UID: UID });
    console.log(expressions);
    res.json(expressions);
  } catch (err) {
    res.status(500).send(err);
  }
};
