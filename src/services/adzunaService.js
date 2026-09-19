// Adzuna service: encapsulates Adzuna API calls and mapping
async function searchJobs(query) {
  const q = String(query || '').trim() || 'software developer';

  const url = new URL('https://api.adzuna.com/v1/api/jobs/gb/search/1');
  url.searchParams.set('app_id', process.env.ADZUNA_APP_ID || '');
  url.searchParams.set('app_key', process.env.ADZUNA_APP_KEY || '');
  url.searchParams.set('what', q);
  url.searchParams.set('results_per_page', '10');
  url.searchParams.set('content-type', 'application/json');

  const resp = await fetch(url);
  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    const err = new Error(`Adzuna API returned ${resp.status}: ${body}`);
    err.status = resp.status;
    throw err;
  }

  const data = await resp.json();

  const jobs = Array.isArray(data.results)
    ? data.results.map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company?.display_name || 'Unknown company',
        location: job.location?.display_name || 'Unknown location',
        salaryMin: job.salary_min || null,
        salaryMax: job.salary_max || null,
        contractType: job.contract_type || null,
        contractTime: job.contract_time || null,
        description: job.description || '',
        url: job.redirect_url,
      }))
    : [];

  return {
    query: q,
    count: data.count || jobs.length,
    jobs,
  };
}

module.exports = { searchJobs };
