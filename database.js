const { MongoClient } = require('mongodb');
const _ = require('lodash');
const localUrl = 'mongodb://localhost:27017';
const prodUrl = 'mongodb://mongo:27017';

const dbName = 'jobs-webscraping';
const jobCollectionName = 'jobs';

const getConnection = async () => {
  const user = process.env['MONGO_USERNAME'];
  const password = process.env['MONGO_PASSWORD'];
  if (!user || !password) {
    return MongoClient.connect(localUrl);
  } else {
    return MongoClient.connect(prodUrl, { auth: { user, password } });
  }
};

const saveJobs = async (developerJobs) => {
  try {
    const jobsToSave = _.cloneDeep(developerJobs)
    const client = await getConnection();
    await client
      .db(dbName)
      .collection(jobCollectionName)
      .insertMany(jobsToSave);
    client.close();
  } catch(err) {
    console.log('error', err);
  }
};

const getJobs = async () => {
  try {
    const client = await getConnection();
    const jobCollection = client
      .db(dbName)
      .collection(jobCollectionName);
    const result = await jobCollection.find({}).project({_id:0}).toArray();
    client.close();
    return result;
  } catch(err) {
    console.log('error', err);
  }
};

module.exports = {
  saveJobs,
  getJobs
}