// ESCO service: encapsulates ESCO API calls and response mapping
function normalizeSkillEdge(skill) {
  if (!skill) return null;

  return {
    uri: skill.uri || skill.href || skill.id || '',
    title: skill.title || skill.label || '',
    skillType: skill.skillType || '',
  };
}

async function searchOccupations(query) {
  const text = String(query || '').trim();
  if (!text) {
    throw new Error('Empty query');
  }

  const params = new URLSearchParams({
    text,
    language: 'en',
    type: 'occupation',
    limit: '10',
    offset: '0',
    full: 'true',
  });

  const url = `https://ec.europa.eu/esco/api/search?${params.toString()}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    const bodyText = await resp.text().catch(() => '');
    const err = new Error(`ESCO API returned ${resp.status}: ${bodyText}`);
    err.status = resp.status;
    throw err;
  }

  const data = await resp.json();

  // total matches available
  const total = typeof data.total === 'number' ? data.total : 0;

  // ESCO places results at data._embedded.results; fall back to data.results
  const items = (data && data._embedded && Array.isArray(data._embedded.results))
    ? data._embedded.results
    : (Array.isArray(data.results) ? data.results : []);

  const careers = items.slice(0, 10).map((item) => {
    const uri = item.uri || item['@id'] || item.id || '';
    const title = item.title || '';

    // preferredLabel.en is commonly a string
    let preferredLabel = '';
    if (item.preferredLabel && item.preferredLabel.en) {
      preferredLabel = item.preferredLabel.en;
    } else if (item.preferredLabel && typeof item.preferredLabel === 'string') {
      preferredLabel = item.preferredLabel;
    } else if (item.label) {
      preferredLabel = item.label;
    }

    // description.en.literal contains English description
    let description = '';
    if (item.description && item.description.en && item.description.en.literal) {
      description = item.description.en.literal;
    } else if (item.description && item.description['en-us'] && item.description['en-us'].literal) {
      description = item.description['en-us'].literal;
    } else if (item.description && typeof item.description === 'string') {
      description = item.description;
    }

    const skillLinks = item._links || {};
    const essentialSkills = Array.isArray(skillLinks.hasEssentialSkill)
      ? skillLinks.hasEssentialSkill.map(normalizeSkillEdge).filter(Boolean)
      : [];
    const optionalSkills = Array.isArray(skillLinks.hasOptionalSkill)
      ? skillLinks.hasOptionalSkill.map(normalizeSkillEdge).filter(Boolean)
      : [];

    return {
      uri,
      title,
      preferredLabel,
      description,
      essentialSkills,
      optionalSkills,
    };
  });

  return { total, careers };
}

module.exports = { searchOccupations };
