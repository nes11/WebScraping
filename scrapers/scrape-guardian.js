const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

const getArrayOfUrls = () => {
  let arrayOfUrls = [];
  for (let i = 1; i <= 3; i++) {
    arrayOfUrls.push(`https://workforus.theguardian.com/search-jobs-and-apply/?query=United+Kingdom&ccm_paging_p=${i}`)
  }
  return arrayOfUrls;
}

const fetchDevJobsFromGuardian = async () => {
  try {
    const arrayOfUrls = getArrayOfUrls();
    const arrayOfPromisesOfJobArray = arrayOfUrls.map(async (url) => {
      const res = await axios.get(url)
      const html = res.data;
      const $ = cheerio.load(html);
      const scrapedContent = $('tbody tr').toArray();
      const jobsArray = scrapedContent.map(e => {
        const link = $(e).find('td a').attr('href').trim()
        const title = $(e).find('td:first-child a').text().trim()
        const location = $(e).find('td:last-child a').text().trim()
        return { title, link, location }
      })
      return jobsArray.filter(job => job.title.includes('Developer'))
    })
    const arrayOfJobArrays = await Promise.all(arrayOfPromisesOfJobArray);
    return _.flatten(arrayOfJobArrays);
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  fetchDevJobsFromGuardian,
}

