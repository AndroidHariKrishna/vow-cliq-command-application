var gplay = require("google-play-scraper");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());

const port = 8080;




const url = process.env.ANALYTICS_API;


async function fetch() {
  try {
    const response = await gplay
      .developer({
        devId: "vowlife",
        lang: "en",
        country: "in",
        fullDetail: true,
      })
      .catch((err) => {
        console.log(err);
      });

    const data = response.map((item) => {
      return {
        title: item.title,
        installs: item.installs,
        minInstalls: item.minInstalls,
        score: item.score,
        ratings: item.ratings,
        reviews: item.reviews,
        icon: item.icon,
        version: item.version,
        updated: item.updated,
        released: item.released,
        url: item.url,
      };
    });

    const serverData = await axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      data,
      serverData,
    };
  } catch (err) {
    //send empty data 
    return {
      data: [],
      serverData: {}
    };

  }
}



app.get("/api/vow/analytics", async (req, res) => {
  const data = await fetch();
  res.send(data);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log("🚀 Server is running on port " + port);
});

