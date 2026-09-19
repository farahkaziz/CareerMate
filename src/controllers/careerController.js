const escoService = require("../services/escoService");

// ESCO is the only active source of career metadata in this project.
async function searchCareers(req, res) {
  const { source, query, q } = req.query;

  if (!source) {
    return res.status(400).json({
      success: false,
      message: "Missing 'source' parameter. Use 'source=esco' and pass 'query'.",
    });
  }

  if (source === "esco") {
    const text = String(query || "").trim();
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Missing query parameter 'query' for ESCO search.",
      });
    }

    try {
      const result = await escoService.searchOccupations(text);
      return res.json({
        success: true,
        query: text,
        count: result.total || 0,
        careers: result.careers,
      });
    } catch (err) {
      console.error("ESCO search error", err);
      return res.status(500).json({
        success: false,
        message: "Failed to search ESCO",
      });
    }
  }

  if (source === "db") {
    return res.status(400).json({
      success: false,
      message: "Local PostgreSQL career data is not used in the current architecture. Use source=esco.",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid 'source' parameter. Use 'esco' or 'db'.",
  });
}

module.exports = {
  searchCareers,
};
