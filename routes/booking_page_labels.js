const express = require('express');
const router = express.Router();
const { all, add, remove, edit, booking_page_label } = require("../controllers/booking_page_labels");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', booking_page_label);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;