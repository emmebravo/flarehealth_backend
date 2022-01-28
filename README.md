## Back-End Flare Health

### Run API Locally

To run the code:

- Clone the repo
- run `$ yarn install`
- `PORT` is set to `5000`
- run `$ yarn start`
  - `nodemon` is being used to restart server after every saved change 

### GET /available-airport-codes

- For airport codes, run the following code in the CLI

```
$ curl http://localhost:5000/available-airport-codes
```

- You'll receive an array of airport codes:
  - `["ATL","BOS","BWI","CLT","DCA","DEN","DFW","DTW","EWR","FLL","IAD","IAH","JFK","LAS","LAX","LGA","MCO","MDW","MIA","MSP","ORD","PDX","PHL","PHX","SAN","SEA","SFO","SLC","TPA"]` 

### GET /available-years

- For the years of data, run the following code in the CLI

```
$ curl http://localhost:5000/available-years
```

- You'll receive an array of years:
  - `[2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016]`

### GET /available-quantities

- To receive a JSON object, run the following code in the CLI

```
$ curl http://localhost:5000/available-quantities
```

- You'll receive an array of objects:
  - `[{"name":"number of flights","param":"num","unit":"number","decimal-places":0,"summaryType":"total"}, <...etc.> ]`
