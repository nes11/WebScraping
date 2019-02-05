//turned on 'disable JS' on the page and got zero results :( need browser script to scrape :(

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://jobs.sky.com/search-jobs/ALL?orgIds=1748&ac=6456&alp=ALL&alt=0&ascf=[{%22Key%22:%22ALL%22,%22Value%22:null}]&';

const fetchDevJobsFromSky = async () => {
  try {
    const res = await axios.get(url)
    const html = res.data;
    const $ = cheerio.load(html);
    const scrapedContent = $('#search-results-list li').toArray();
    const jobsArray = scrapedContent.map(e => {
      const croppedlink = $(e).find('a').attr('href').trim()
      const link = `https://jobs.sky.com${croppedlink}`;
      const title = $(e).find('.sixty').text().trim()
      const location = $(e).find('.forty').text().trim()
      return { link, title, location }
    })
    return jobsArray.filter(job => job.title.includes('Developer') && (job.location === 'London, England' || job.location === 'Osterley, England'))
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  fetchDevJobsFromSky,
}
