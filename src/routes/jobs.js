const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// GET /api/jobs
router.get('/', jobsController.searchJobs);

module.exports = router;
