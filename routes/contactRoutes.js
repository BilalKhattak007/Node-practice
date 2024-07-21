const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validationToken = require("../middleware/validateToken")
// Routing
router.use(validationToken)
router.route('/').get(contactController.getAllContact).post(contactController.createContact)
router.route('/:id').get(contactController.getContact).delete(contactController.deleteContact).patch(contactController.updateContact)

module.exports = router;
