const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://careerssearch.bbc.co.uk/jobs/search/-1/';

// const getArrayOfUrls = () => {
//   let arrayOfUrls = [];
//   for (let i = 1; i<= 18; i++) {
//     arrayOfUrls.push(`https://careerssearch.bbc.co.uk/jobs/search/-1/${i}`)
//   }
//   return arrayOfUrls;
// }

// const arrayOfUrls = getArrayOfUrls();

const fetchDevJobsFromBbc = async () => {
  try {
    const res = await axios.get(url)
    const html = res.data;
    const $ = cheerio.load(html);
    const scrapedContent = $('.jobs li').toArray();
    const jobsArray = scrapedContent.map(e => {
      const link = $(e).find('a').attr('href').trim()
      const title = $(e).find('.job-list-title').text().trim()
      return { link, title };
    })
    return jobsArray.filter(job => job.title.includes('Software Engineer'));
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  fetchDevJobsFromBbc,
}

