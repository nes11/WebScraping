const { getJobs } = require('./database');

const createCells = (job, type) => Object.values(job).map(val => `<${type}>${val}</${type}>`).join('');

const createBody = (data) => data.map(job => `<tr>${createCells(job, 'td')}</tr>`).join('');

const createTable = (data) => 
    `
      <table>
        <thead></thead>
        <tbody>${createBody(data)}</tbody>
      </table>
    `;

getJobs().then(res => createTable(res)).then(console.log).catch(console.log)
//getJobs().then(console.log).catch(console.log)

  module.exports = {
    createTable,
  }