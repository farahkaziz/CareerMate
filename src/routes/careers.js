const express = require("express");
const router = express.Router();
const { searchCareers } = require("../controllers/careerController");

router.get("/search", searchCareers);
router.get("/", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "Use /api/careers/search?source=esco&query=...",
  });
});

module.exports = router;
