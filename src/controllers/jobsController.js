const adzunaService = require('../services/adzunaService');

// GET /api/jobs?query=...
async function searchJobs(req, res) {
  try {
    const query = req.query.query || 'software developer';
    const result = await adzunaService.searchJobs(query);

    return res.json({
      success: true,
      query: result.query,
      count: result.count,
      jobs: result.jobs,
    });
  } catch (err) {
    console.error('Adzuna error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs from Adzuna',
    });
  }
}

module.exports = { searchJobs };
