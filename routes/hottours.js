const express = require("express");
const router = express.Router();
const { all, add, remove, edit, hottour } = require("../controllers/hottours");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.get('/:id', hottour);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;