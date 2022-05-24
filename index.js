const fetch = require('node-fetch');

const cityName = process.argv[2];

const processWeatherData = data => {
     data.find(stationData => {
        if (stationData.stacja === cityName) {
            return true;
        } else {
            return false;
        }
    });
};

fetch('https://danepubliczne.imgw.pl/api/data/synop')
.then(r => r.json())
.then(processWeatherData);

