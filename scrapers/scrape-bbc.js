const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

const getArrayOfUrls = () => {
  let arrayOfUrls = [];
  for (let i = 1; i <= 17; i++) {
    arrayOfUrls.push(`https://careerssearch.bbc.co.uk/jobs/search/-1/${i}`)
  }
  return arrayOfUrls;
}

const fetchDevJobsFromBbc = async () => {
  try {
    const arrayOfUrls = getArrayOfUrls();
    const arrayOfPromisesOfJobArray = arrayOfUrls.map(async (url) => {
      const res = await axios.get(url)
      const html = res.data;
      const $ = cheerio.load(html);
      const scrapedContent = $('.jobs li').toArray();
      const jobs = scrapedContent.map(e => {
        const element = $(e)
        const link = element.find('a').attr('href').trim()
        const title = element.find('.job-list-title').text().trim()
        const location = element.find("*[itemprop = 'address']").text().trim()
        return { title, link, location };
      })
      return jobs.filter(job => job.title.includes('Software Engineer') && job.location.includes('London'));   
    })  
    const arrayOfJobArrays = await Promise.all(arrayOfPromisesOfJobArray);
    return _.flatten(arrayOfJobArrays);
    
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  fetchDevJobsFromBbc,
}

