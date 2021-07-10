var express = require('express');
var router = express.Router();
const controller = require("../controllers/actors")

// Routes related to actor.

router.get("/", controller.getAllActors);

module.exports = router;