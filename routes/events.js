var express = require('express');
var router = express.Router();
const controller = require("../controllers/events")

// Routes related to event

router.post("/", controller.addEvent);

router.get("/actors/:actor_id", controller.getByActor);

router.get("/", controller.getAllEvents);

module.exports = router;