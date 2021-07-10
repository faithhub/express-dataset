var express = require('express');
var router = express.Router();
const controller = require("../controllers/events")

// Route related to delete events
router.delete("/", controller.eraseEvents);

module.exports = router;