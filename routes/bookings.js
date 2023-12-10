const express = require('express');
const router = express.Router();
const { add, edit, remove, all, booking } = require("../controllers/bookings");
const { auth } = require('../middleware/auth');

router.get("/", auth, all);
router.get("/:id", auth, booking);
router.post("/add", add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;