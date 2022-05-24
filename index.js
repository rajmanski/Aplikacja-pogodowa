const fetch = require('node-fetch');

const cityName = process.argv[2];

const processWeatherData = data => {
    const foundData = data.find(stationData => stationData.stacja === cityName);
    
    if (!foundData) {
        console.log('Takiego miasta nie ma');
        return;
    } 

    const {
        cisnienie: pressure,
        wilgotnosc_wzgledna: humidity,
        temperatura: temperature,
    } = foundData;

    const weatherInfo = `In ${cityName} there is ${temperature} degrees, ${humidity}% of humidity and ${pressure}hPa.`;
    console.log(weatherInfo);
};

fetch('https://danepubliczne.imgw.pl/api/data/synop')
.then(r => r.json())
.then(processWeatherData);

