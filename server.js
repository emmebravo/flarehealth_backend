const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const quantities = require('./quantities.json');
const airportData = require('./airportData.json');

//middleware for json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// function to download JSON file, but it's massive
// uncomment if downloadJSON fcn needs to run
const fs = require('fs');
async function downloadJSON() {
  try {
    const request = await axios.get(
      `https://flare-code-exercise-data.s3.amazonaws.com/airlines.json`,
      { responseType: 'stream' }
    );
    request.data.pipe(fs.createWriteStream('airportData.json'));
    console.log('download json file');
  } catch (error) {
    console.error('download failed');
  }
}
downloadJSON();

async function airportInformation() {
  const information = await axios.get(
    `https://flare-code-exercise-data.s3.amazonaws.com/airlines.json`
  );
  const { data } = information;
  return data;
}

app.get('/available-airport-codes', async (request, response) => {
  const data = await airportInformation();
  const airportCodes = [];
  for (let i = 0; i < data.length; i++) {
    let code = data[i];
    airportCodes.push(code.Airport.Code);
  }
  response.send([...new Set(airportCodes)]);
});

app.get('/available-years', async (request, response) => {
  const data = await airportInformation();
  const years = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i];
    years.push(year.Time.Year);
  }
  response.send([...new Set(years)]);
});

app.get('/available-quantities', async (request, response) => {
  response.json(quantities);
});

app.get('/annual-statistics/:year', async (request, response) => {
  //const data = await airportInformation();
  let year = request.params.year;
  let airportCodes = request.query['airport-codes'];

  let info = airportData.filter(
    (element) => element['Time']['Year'] === Number(year)
  );
  let codes = info.filter(
    (airport) => airport['Airport']['Code'] === airportCodes
  );
  console.log(codes);
});

app.listen(PORT, () =>
  console.log(`Quick, your ${PORT} server is running--catch it!`)
);
