//const { fetchDevJobsFromSky } = require('./scrapers/scrape-sky');
const { fetchDevJobsFromBbc } = require('./scrapers/scrape-bbc');
const { fetchDevJobsFromGuardian } = require('./scrapers/scrape-guardian');
const { fetchDevJobsFromTrainline } = require('./scrapers/scrape-trainline')
const { saveJobs, getJobs } = require('./database');

// (async () => {
//   const currentJobs = await getJobs();
//   const newJobs = await fetchDevJobsFromSky();
//   const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
//   if (newJobsToSave.length) {
//     await saveJobs(newJobsToSave);
//   }
// })();

(async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromBbc();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
})();

(async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromGuardian();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
})();

(async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromTrainline();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
})();