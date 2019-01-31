const { fetchDevJobsFromSky } = require('./scrapeSky');
const { fetchDevJobsFromBbc } = require('./scrapeBbc');
const { saveJobs, getJobs } = require('./database');

(async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromSky();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  }
})();

(async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromBbc();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
})();

