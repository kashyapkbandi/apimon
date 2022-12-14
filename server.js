const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const axios = require('axios').default;
var bodyParser = require("body-parser");
const { timeEnd } = require("console");
const cors = require("cors");

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware
// __dirname - stores path to directory
app.use(express.static(__dirname + "/assets"));
const viewPath = path.join(__dirname, "./templates/views");

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// tell express to use templates instead of views.
app.set("views", viewPath);


// hits a mock endpoint and returns the data in sepecified seconds
//  timeInMs -> the delay you want to set in ms eg : 2000 -> 2 secs
// if its null then it default takes 0
app.get('/comments-mock/:timeInMs',(req,res)=>{

setTimeout(()=>{
  axios.get('https://jsonplaceholder.typicode.com/comments')
  .then(response => {
    //console.log(response);
    res.send(response.data);
  })
  .catch(error => {
    console.error(error);
  });
},req.params['timeInMs'] ? req.params['timeInMs'] : 0);
})



// hits a mock endpoint and returns the data in sepecified seconds
//  timeInMs -> the delay you want to set in ms eg : 2000 -> 2 secs
// if its null then it default takes 0
app.get('/users-mock/:timeInMs',(req,res)=>{
    setTimeout(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          //console.log(response);
          res.send(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      },req.params['timeInMs'] ? req.params['timeInMs'] : 0);
      })


      
// hits a mock endpoint and returns the data in sepecified seconds
//  timeInMs -> the delay you want to set in ms eg : 2000 -> 2 secs
// if its null then it default takes 0
// get random photos
app.get('/random-photos/:timeInSecs',(req,res)=>{
setTimeout(
()=>{
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then((response)=>{
        res.send(response.data);
    }).catch((error)=>{
        res.send(error);
    })
},req.params['timeInMs'] ? req.params['timeInMs'] : 0);
});




// Mock bitcoin data for fetching
app.get("/mock-btc", (req, res) => {
  res.status(200).send({
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 9798.977911,
    price_btc: 1,
    market_cap: 180245643159,
    percent_change_24h: 1.41,
    percent_change_7d: -1.89,
    percent_change_30d: 4.73,
    volume_24h: 26140524526.52,
    max_supply: "21000000",
    asset_id: 1,
    time: 1591315200,
    open: 9801.616408,
    high: 9806.977146,
    low: 9801.616408,
    volume: 353205420,
    url_shares: 1135,
    unique_url_shares: 659,
    reddit_posts: 1,
    reddit_posts_score: 1,
    reddit_comments: 1,
    reddit_comments_score: 1,
    tweets: 3758,
    tweet_spam: 338,
    tweet_followers: 14174661,
    tweet_quotes: 11,
    tweet_retweets: 338,
    tweet_replies: 110,
    tweet_favorites: 551,
    tweet_sentiment1: 85,
    tweet_sentiment2: 206,
    tweet_sentiment3: 685,
    tweet_sentiment4: 2564,
    tweet_sentiment5: 218,
    tweet_sentiment_impact1: 181592,
    tweet_sentiment_impact2: 1455907,
    tweet_sentiment_impact3: 3225871,
    tweet_sentiment_impact4: 8750266,
    tweet_sentiment_impact5: 562035,
    social_score: 14176806,
    average_sentiment: 3.7,
    sentiment_absolute: 3,
    sentiment_relative: 91,
    news: 47,
    price_score: 3,
    social_impact_score: 4.3,
    correlation_rank: 4.1,
    galaxy_score: 75.5,
    volatility: 0.01008901,
    alt_rank: 26,
    alt_rank_30d: 1,
    market_cap_rank: 1,
    percent_change_24h_rank: 657,
    volume_24h_rank: 2,
    social_volume_24h_rank: 1,
    social_score_24h_rank: 1,
    youtube: 47,
    social_contributors: 1963,
    social_volume: 4466,
    social_volume_global: 7118,
    social_dominance: 62.74234335487496,
    market_cap_global: 278814602122,
    market_dominance: 64.55374708002002,
    medium: 1,
  });
});


app.get("/corstest", (req, res) => {

  res.render("corsmaster");
  
});



app.post("/customerfetcher",(req,res)=>{
  

  // Make a request for a user with a given ID
  axios.get('https://devboxcom8-dev-ed.my.salesforce.com/services/data/v52.0/search/?q=FIND%20%7Bandy%7D',
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+req.body.sessionId
    }
  })
  .then(function (response) {
    // handle success
    console.log(response);
    //res.send(JSON.stringify(response.data));
    
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send(res.status+'--'+res.statusCode+'--'+res.statusMessage)
  })
  .finally(function () {
    // always executed
  });
  });


app.post("/fetcher",(req,res)=>{
  

// Make a request for a user with a given ID
axios.get('https://sfdxworks-dev-ed.my.salesforce.com/services/data/v53.0/sobjects/Account/0015h00000fADJk',
{
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+req.body.sessionId
  }
})
.then(function (response) {
  // handle success
  console.log(response);
  //res.send(JSON.stringify(response.data));


})
.catch(function (error) {
  // handle error
  console.log(error);
  res.send(res.status+'--'+res.statusCode+'--'+res.statusMessage)
})
.finally(function () {
  // always executed
});
});


app.set("view engine", "hbs");

app.listen(port);
