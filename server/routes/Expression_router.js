const express = require("express");
const router = express.Router();
const postfix_eval_Controller = require("../Controller/postfix_eval_Controller");

router.post("/postfix_eval", postfix_eval_Controller.post_eval);
router.get("/postfix_eval_history", postfix_eval_Controller.get_post_eval);

module.exports = router;
