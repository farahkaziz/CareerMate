const pool = require("../db");

async function getUserSkills(req, res) {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT user_id, esco_skill_uri, created_at
       FROM user_skills
       WHERE user_id = $1
       ORDER BY created_at ASC`,
      [userId]
    );

    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

async function upsertUserSkills(req, res) {
  const { userId } = req.params;
  const payload = req.body || {};

  const skillUris = Array.isArray(payload.skillUris)
    ? payload.skillUris
    : Array.isArray(payload.skillIds)
      ? payload.skillIds
      : [];

  if (!skillUris.length) {
    return res.status(400).json({
      success: false,
      message: "Expected an array of ESCO skill URIs in 'skillUris'.",
    });
  }

  try {
    await pool.query("DELETE FROM user_skills WHERE user_id = $1", [userId]);

    for (const rawSkill of skillUris) {
      const escoSkillUri = String(rawSkill || "").trim();
      if (!escoSkillUri) continue;

      await pool.query(
        `INSERT INTO user_skills (user_id, esco_skill_uri)
         VALUES ($1, $2)
         ON CONFLICT (user_id, esco_skill_uri) DO NOTHING`,
        [userId, escoSkillUri]
      );
    }

    return res.json({
      success: true,
      userId,
      skillUris: skillUris.map((item) => String(item).trim()).filter(Boolean),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getUserSkills,
  upsertUserSkills,
};
