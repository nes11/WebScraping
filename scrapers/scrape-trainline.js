  const axios = require('axios');
  const cheerio = require('cheerio');
  
  const url = 'https://jobs.lever.co/thetrainline?department=Technology&team=Development&location=London';
  
  const fetchDevJobsFromTrainline = async () => {
    try {
      const res = await axios.get(url)
      const html = res.data;
      const $ = cheerio.load(html);
      const scrapedContent = $('.postings-group .posting').toArray();
      const jobsArray = scrapedContent.map(e => {
        const link = $(e).find('a').attr('href').trim()
        const title = $(e).find('h5').text().trim()
        const location = $(e).find('.sort-by-location.posting-category.small-category-label').text().trim()
        return { title, link, location }
      })
      return jobsArray.filter(job => job.title.includes('Developer') || job.title.includes('Web'))
    } catch (err) {
      console.error(err)
    }
  }
  
  module.exports = {
    fetchDevJobsFromTrainline,
  }