var express = require('express');
var router = express.Router();
const controller = require("../controllers/events")

// Routes related to event

router.post("/", controller.addEvent);


module.exports = router;