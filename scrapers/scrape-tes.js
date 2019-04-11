const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.tes.com/jobs/employer/tes-global-1055288';

const fetchDevJobsFromTes = async () => {
  try {
    const res = await axios.get(url)
    const html = res.data;
    const $ = cheerio.load(html);
    const scrapedContent = $('.job-v2-wrapper').toArray();
    const jobsArray = scrapedContent.map(e => {
      const link = $(e).find('a').attr('href').trim()
      const title = $(e).find('.job-v2-title').text().trim()
      const location = $(e).find('.job-v2-location').text().trim()
      console.log({ title, link, location })
      return { title, link, location }
    })
    return jobsArray.filter(job => job.title.includes('Developer') || job.title.includes('Web'))
  } catch (err) {
    console.error(err)
  }
}
fetchDevJobsFromTes()


module.exports = {
  fetchDevJobsFromTes,
}