const express = require('express');
const router = express.Router();
const { all, alltourcities, add, remove, edit, tour} = require("../controllers/tours");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/city", alltourcities);
router.get("/:id", tour);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;