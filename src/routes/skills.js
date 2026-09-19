const express = require("express");
const router = express.Router();
const { getUserSkills, upsertUserSkills } = require("../controllers/skillController");

router.post("/user/:userId", upsertUserSkills);
router.get("/user/:userId", getUserSkills);

router.get("/", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "External skill metadata is fetched from ESCO. Use /api/skills/user/:userId for user-selected skill URIs.",
  });
});

module.exports = router;
