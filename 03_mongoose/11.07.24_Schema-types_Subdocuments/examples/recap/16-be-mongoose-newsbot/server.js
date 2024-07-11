import express from 'express';
import { refresh } from './data.js';
import { connect } from './db.js';
import Job from './Job.js';
const app = express();

app.use(express.json());
// Start the interval that fetches new data from the API every 5 minutes
setInterval(refresh, 5 * 60 * 1000);

app.get('/refresh', (req, res) => {
  // Do a refresh every time it is requested
  refresh();
  res.send('OK');
});

app.get('/ai-jobs', async (req, res) => {
  // TODO: Get all jobs from MongoDB
  // TODO: Filter the jobs list looking for the word "AI" in the title or the text
  // TODO: Respond with the matches
  const allJobs = await Job.find({});

  const aiJobs = allJobs.filter(
    (job) => job.title.includes('AI') || job.text.includes('AI')
  );
  console.log(aiJobs);
  res.status(200).send(aiJobs);
});

// TODO: add endpoint to delete a single job based on its id
app.delete('/jobs/:id', async (req, res) => {
  const jobId = req.params.id;
  await Job.findOneAndDelete({ originalId: jobId });
  //refresh();
  res.send('OK');
});
// TODO: add endpoint to delete all jobs
app.delete('/jobs/', async (req, res) => {
  await Job.deleteMany();
  //refresh();
  res.send('OK');
});
const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

connect();
