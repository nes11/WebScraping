const _ = require('lodash');
const { fetchDevJobsFromBbc } = require('./scrapers/scrape-bbc');
const { fetchDevJobsFromGuardian } = require('./scrapers/scrape-guardian');
const { fetchDevJobsFromTrainline } = require('./scrapers/scrape-trainline');
// you can write your own scrapers with Cheerio and require them here

const { saveJobs, getJobs } = require('./database');
const { createTable } = require('./table');
// you can use mailer on line 43 or console.log the html table
const { mailer } = require('./mailer');

const getBbcJobs = async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromBbc();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
  return newJobsToSave; 
};

const getGuardianJobs = async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromGuardian();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
  return newJobsToSave; 
};

const getTrainlineJobs = async () => {
  const currentJobs = await getJobs();
  const newJobs = await fetchDevJobsFromTrainline();
  const newJobsToSave = newJobs.filter(nj => !currentJobs.map(cj => cj.link).includes(nj.link))
  if (newJobsToSave.length) {
    await saveJobs(newJobsToSave);
  } 
  return newJobsToSave; 
};

(async () => {
  const jobGroups = await Promise.all([getBbcJobs(), getGuardianJobs(), getTrainlineJobs()]);
  const tableGroups = _.compact(jobGroups.map(jobGroup => jobGroup.length ? createTable(jobGroup) : null));
  //await mailer(tableGroups.join(''))
  console.log('endresult', tableGroups)
})();