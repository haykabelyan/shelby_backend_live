const express = require('express');
const router = express.Router();
const { add, edit, remove, all, demandedtour } = require("../controllers/demandedtours");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/:id", demandedtour);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;