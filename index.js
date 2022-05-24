const { appendFile } = require('fs');
const fetch = require('node-fetch');
const { writeFile } = require('fs').promises;
const { normalize, resolve } = require('path');

const cityName = process.argv[2];

function safeJoin(base, target) {
    const targetPath = '.' + normalize('/' + target)
    return resolve(base, targetPath);
}

const getDataFileName = city =>  safeJoin(`./data`, `${city}.txt`);

const processWeatherData = async  data => {
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

    const dateString = new Date().toLocaleDateString;

    await appendFile(getDataFileName(cityName), `\n${weatherInfo}\n`)
};



fetch('https://danepubliczne.imgw.pl/api/data/synop')
.then(r => r.json())
.then(processWeatherData);

