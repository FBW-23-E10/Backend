import Job from "./Job.js";

const baseUrl = "https://hacker-news.firebaseio.com/v0";

async function getNewJobIds() {
  const response = await fetch(`${baseUrl}/jobstories.json?print=pretty`);

  return await response.json();
}

async function getActualData(ids) {
  const urls = ids.map((id) => `${baseUrl}/item/${id}.json?print=pretty`);
  const responsePromises = urls.map((url) => fetch(url));
  const responses = await Promise.all(responsePromises);
  const resultPromises = responses.map((response) =>
    response.json ? response.json() : ""
  );
  const results = await Promise.all(resultPromises);

  return results;
}

async function getKnownJobIds() {
  const jobs = await Job.find();

  return jobs.map((j) => j.originalId);
}

export async function refresh() {
  const newJobIds = await getNewJobIds();
  const jobsInDatabase = await getKnownJobIds();
  const filtered = newJobIds.filter((id) => !jobsInDatabase.includes(id));
  const newData = await getActualData(filtered);


  const newDataToInsert = newData.map((data) => {
    return {
      originalId: data.id,
      title: data.title,
      url: data.url,
      text: data.text,
      time: data.time,
    };
  });

  console.log(
    "New job items from the API that needs to be stored in the database",
    newDataToInsert
  );
  // TODO: Save the entries in newDataToInsert into the database using the Job model

  await Job.insertMany(newDataToInsert)
 

}
