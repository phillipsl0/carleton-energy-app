import buildingsDetail from './BuildingsDetail';
import news from './SustainabilityNews';
import events from './SustainabilityEvents';

import { JanData, eTable, wTable, sTable } from './../assets/data/JanData.js';

import {
    solarProduction,
    solarMeter,
    turbine1Production,
    turbine1Meter,
    turbine1Wind,
    turbine1WindMeter,
    turbine2Consumption,
    turbine2ConsumptionMeter,
    turbine2Production,
    turbine2Meter,
    turbine2Wind,
    turbine2WindMeter
} from './ProductionMeters.js'

import { getSpecificRandom, combineData } from './General';

const apiRSS2jsonKey = 'eymrq2p6ts5dcyltdxtmwsxp63xwzrkmirfvaezw';

// 1) For a given building, resource and timeframe, return (from API) 
//      a single value (e.g. gal/week in Burton)
// 2) Energy the windmill generated within a specified timeframe
// 3) Energy generated by solar panels within a specified timeframe
// 4) (eventually) Data over time to generate graphs


/* Naming Convention:
 * getTotal: Returns one number which is the total sum
 * getOverTime: Returns a table with the numbers divided up based on a given time scale
 *
 * Order of variables:
 * building, utility, timeStart, timeEnd, timeScale
 */

var scaleFactorSolar = 12;
var scaleFactorWind = 400;
var scaleFactorGeothermal = 9;
var scaleFactorWater = 400;
var scaleFactorElectricity = 150;
var scaleFactorOther = 60;

export function dateToTimestamp(date) {
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate();
    hours = date.getHours();

    if (month < 10) {
        month = '0'+month;
    }

    if (day < 10) {
        day = '0'+day;
    }

    if (hours < 10) {
        hours = '0'+hours;
    }

    timestamp = year+'-'+month+'-'+day+'%20'+hours+':00:00';

    return timestamp;
}

export const cleanupData = (data) => {
    //TODO: change to not be hardcoded
    var total = 0;

    for (var i=0; i < data.length; i++) {
        total += data[i]["pointvalue"];
    }

    return total;
}

export function getBuildingsList() {
    // return list of every building name with data (e.g. "Burton", "Sayles", etc.)
    // /api/buildings/names
// 
    var buildings = ["Burton", "Sayles", "Severance", "Davis", "Musser", "Myers", "Cassat",
                        "Memo", "Nourse", "Evans", "Goodhue", "Watson", "Scoville"];

    return buildings;
}

export function getBuildingsDetail() {
    return buildingsDetail;
}

export function getUtilitiesList() {
    var utilities = ["electricity", "water"];

    return utilities;
}

export function getUnitsList() {
    var units = {"electricity": "kWh", "water": "gal"}

    return units;
}

export function getDayOfWeek(date) {
    var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return week[date];
}

export function getMonth(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return month[date];
}

export function getSustainabilityNews() {
    newsRSS = 'https://apps.carleton.edu/sustainability/feeds/blogs/sustaining_carleton';
    return convertRSStoJSON(newsRSS);
}

export function getSustainabilityNewsBak() {
    return news;
}

export function getSustainabilityEvents() {
    eventsRSS = 'https://apps.carleton.edu/sustainability/feeds/events';
    return convertRSStoJSON(eventsRSS);
}

export function getSustainabilityEventsBak() {
    return events;
}

function convertRSStoJSON(rssFeed) {
    baseURL = 'https://api.rss2json.com/v1/api.json';
    formatURL = `${baseURL}?rss_url=${rssFeed}&api_key=${apiRSS2jsonKey}&count=${3}`;

    return fetch(formatURL);
}

// -------------------- Electricity Generation -------------------------



function getRandomWind() {
    return getSpecificRandom(500000, 1000000, 1, 1);
}

function getRandomSolar() {
    return getSpecificRandom(500, 1000, 1, 1);
}

function getRandomGeothermal() {
    return getSpecificRandom(700, 1500, 1, 1);
}

// timeStart, timeEnd are Date objects. 
// timeScale is the resolution of the data in minutes (e.g. 1 minute vs 15 minute increments)
export function getEnergyGenerationOverTime(timeStart, timeEnd, timeScale) {
    var numberEntries = Math.round(Math.abs(timeEnd - timeStart) / (60000 * timeScale));
    var currentTime = new Date(timeEnd);

    var table = new Array(numberEntries);
    for (var i = numberEntries-1; i >= 0; i--) {
        table[i] = {};
        table[i]["date"] = currentTime.toString();
        table[i]["wind"] = getRandomWind();
        table[i]["solar"] = getRandomSolar();
        table[i]["geothermal"] = getRandomGeothermal();
        table[i]["total"] = table[i]["wind"] + table[i]["solar"] + table[i]["geothermal"];

        currentTime.setMinutes(currentTime.getMinutes() - timeScale);
    }

    return table;
}

export function getWindGenerationOverTime(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];
    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["date"] = totals[i]["date"];
        table[i]["wind"] = totals[i]["wind"];
    }

    return table;
}

export function getWindGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];
    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["x"] = totals[i]["date"];
        table[i]["y"] = totals[i]["wind"];
    }

    return table;
}

export function getSolarGenerationOverTime(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];
    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["date"] = totals[i]["date"];
        table[i]["solar"] = totals[i]["solar"];
    }

    return table;
}

export function getSolarGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];
    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["x"] = totals[i]["date"];
        table[i]["y"] = totals[i]["solar"];
    }

    return table;
}

export function getGeothermalGenerationOverTime(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];

    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["date"] = totals[i]["date"];
        table[i]["geothermal"] = totals[i]["geothermal"];
    }

    return table;
}

export function getGeothermalGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];

    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["x"] = totals[i]["date"];
        table[i]["y"] = totals[i]["geothermal"];
    }

    return table;
}

export function getTotalGenerationOverTime(timeStart, timeEnd, timeScale) {
    var totals = getEnergyGenerationOverTime(timeStart, timeEnd, timeScale);
    var table = [];
    for (var i = 0; i < totals.length; i++) {
        table[i] = {};
        table[i]["date"] = totals[i]["date"];
        table[i]["total"] = totals[i]["total"];
    }

    return table;
}


export function getEnergyGeneration(timeStart, timeEnd) {
    // return value of how much electricity we are generating from wind/solar, etc
    // /api/generation

    // return map with one entry for "wind", one for "solar", and one for "total"
    // calculate number of 15-min chunks b/w 'timeStart' and 'timeEnd'
    var timeframe = Math.abs(timeEnd - timeStart) / (60000 * 15); // 60,000ms per min * 15min

    var table = [];
    table["wind"] = getRandomWind();
    table["solar"] = getRandomSolar();
    table["geothermal"] = getRandomGeothermal();
    table["total"] = table["wind"] + table["solar"] + table["geothermal"];

    return table;
}

export function getTotalWindGeneration(timeStart, timeEnd) {
    return getEnergyGeneration(timeStart, timeEnd)["wind"];
}

export function getTotalWindConsumption(timeStart, timeEnd) {
    return getEnergyGeneration(timeStart, timeEnd)["wind"]*.25;
}

export function getTotalSolarGeneration(timeStart, timeEnd) {
    return getEnergyGeneration(timeStart, timeEnd)["solar"];
}

export function getTotalGeothermalGeneration(timeStart, timeEnd) {
    return getEnergyGeneration(timeStart, timeEnd)["geothermal"];
}

export function getTotalEnergyGeneration(timeStart, timeEnd) {
    return getEnergyGeneration(timeStart, timeEnd)["total"];
}

export function getCurrentWindGeneration() {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalWindGeneration(timeStart, timeEnd);
}

export function getCurrentWindConsumption() {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalWindConsumption(timeStart, timeEnd);
}

export function getCurrentWindSpeed() {
    return getSpecificRandom(0.2, 9, 1, 1);
}

export function getCurrentSolarGeneration() {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalSolarGeneration(timeStart, timeEnd);
}

export function getCurrentGeothermalGeneration() {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalGeothermalGeneration(timeStart, timeEnd);
}

export function getCurrentEnergyGeneration() {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalEnergyGeneration(timeStart, timeEnd);
}


export function getCurrentWindGenerationGraphFormat() {
    var windTable = new Array(2);
    windTable[0] = {};
    windTable[1] = {};
    var wind = {};

    windTable[0]["x"] = "One (kWh)";
    windTable[0]["y"] = getCurrentWindGeneration();

    windTable[1]["x"] = "Two (kWh)";
    windTable[1]["y"] = getCurrentWindGeneration();

    wind["data"] = windTable;
    wind["total"] = windTable[0]['y'] + windTable[1]['y'];

    return wind;
}

export function getTotalWindGenerationGraphFormat(timeStart, timeEnd, timeScale, scaleFactor) {
    var windTable = getWindGenerationOverTime(timeStart, timeEnd, timeScale);
    var kracumWindTable = getWindGenerationOverTime(timeStart, timeEnd, timeScale);

    var finalTable = {};
    var dataTable = new Array(windTable.length);
    var currData = 0;
    var rank = windTable.length;

    for (var i = windTable.length-1; i >= 0; i--) {
        dataTable[i] = {};
        dataTable[i]["x"] = windTable[i]["date"];
        dataTable[i]["y"] = (windTable[i]["wind"] + kracumWindTable[i]["wind"]) * scaleFactor / 1000;

        if (i==windTable.length-1) {
            currData = dataTable[i]["y"];
        } else if (dataTable[i]["y"] > currData) {
            rank-=1;
        }
    }

    finalTable["rank"] = rank;
    finalTable["data"] = dataTable;
    return finalTable
}

// added function to get usage I need
export function getCurrentGenerationGraphFormat() {
    var totalSolar = getCurrentSolarGeneration();
    var totalWind = getCurrentWindGeneration();
    var totalGeothermal = getCurrentGeothermalGeneration();
    var data = new Array(3);
    var generation = {};

    data[0] = {'x': 'Solar (kWh)', 'y': totalSolar};
    data[1] = {'x': 'Geothermal (kWh)', 'y': totalGeothermal};
    data[2] = {'x': 'Wind (kWh)', 'y': totalWind};

    generation["data"] = data;
    generation["total"] = data[0]['y'] + data[1]['y'] + data[2]['y'];
    return generation;
}

export function getTotalGenerationGraphFormat(timeStart, timeEnd, timeScale, scaleFactor) {
    var solarTable = getSolarGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale);
    var windTable = getWindGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale);
    var geoTable = getGeothermalGenerationOverTimeGraphFormat(timeStart, timeEnd, timeScale);

    var combinedTable = new Array(solarTable.length);
    var finalTable = {};
    var currData = 0;
    var rank = solarTable.length;

    for (var i=solarTable.length-1; i >= 0; i--) {
        combinedTable[i] = {};
        currDate = new Date(solarTable[i]["x"]);

        switch (scaleFactor){
            case 1:
                combinedTable[i]["x"] = getDayOfWeek(currDate.getDay());
                break;
            case 7:
                if (i==0) {
                    combinedTable[i]["x"] = "-3";
                } else if (i==1) {
                    combinedTable[i]["x"] = "-2";
                } else if (i==2) {
                    combinedTable[i]["x"] = "-1";
                } else if (i==3) {
                    combinedTable[i]["x"] = "Current";
                }
                break;
            case 30:
                combinedTable[i]["x"] = (currDate.getMonth() + 1) + "/" + currDate.getYear().toString().substring(1);
                break;
            case 365:
                combinedTable[i]["x"] = currDate.getFullYear().toString();
                break;
            default:
                combinedTable[i]["x"] = solarTable[i]["date"];
                break;
        }

        combinedTable[i]["y"] = (solarTable[i]["y"] + windTable[i]["y"]
                                    + geoTable[i]["y"]) * scaleFactor /1000;

        if (i==solarTable.length-1) {
            currData = combinedTable[i]["y"];
        } else if (combinedTable[i]["y"] <= currData) {
            rank-=1;
        }
    }

    finalTable["data"] = {};
    finalTable["data"]["wind"] = windTable;
    finalTable["data"]["solar"] = solarTable;
    finalTable["data"]["geo"] = geoTable;
    finalTable["rank"] = rank;
    finalTable["total"] = combinedTable;

    return finalTable;
}

// -------------------- Utility Consumption -------------------------

export function getBuildingUtilityConsumptionOverTime(building, utility, timeStart, timeEnd, timeScale) {

    // different utilities have different "typical" amounts
    var scaleFactor = scaleFactorOther;

    if (utility == "water") {
        scaleFactor = scaleFactorWater;
    } else if (utility == "electricity") {
        scaleFactor = scaleFactorElectricity;
    }

    var buildings = getBuildingsList();

    if (buildings.indexOf(building) % 2 == 0) {
        scaleFactor *= 2;
    }

    var numberEntries = Math.round(Math.abs(timeEnd - timeStart) / (60000 * timeScale));
    var currentTime = new Date(timeEnd);

    var table = new Array(numberEntries);
    for (var i = numberEntries-1; i >= 0; i--) {
        table[i] = {};
        table[i]["date"] = currentTime.toString();
        table[i][utility] = Math.random() * scaleFactor * timeframe;

        currentTime.setMinutes(currentTime.getMinutes() - timeScale);
    }

    return table;
}

export function getTotalBuildingUtilityConsumption(building, utility, timeStart, timeEnd) {
    /*
        parameter   | object type
        --------------------------
        'building'  | String 
        'utility'   | String (options for now: "electricity", "water")
        'timeStart' | Date
        'timeEnd'   | Date
    */

    // return value of how much of a resource we have consumed at one building over a time frame
    // /api/buildings/usage/{buildingName}/current?utility={resource}

    // Insert real API call here

    /* RETURN DUMMY DATA (below) */

    // different utilities have different "typical" amounts
//    var scaleFactor = scaleFactorOther;

//    if (utility == "water") {
//        scaleFactor = scaleFactorWater;
//    } else if (utility == "electricity") {
//        scaleFactor = scaleFactorElectricity;
//    }

    // calculate number of 15-min chunks b/w 'timeStart' and 'timeEnd'
    var timeframe = Math.abs(timeEnd - timeStart) / (60000 * 15); // 60,000ms per min * 15min

    if (utility === "water") {
        return getRandomWater() * timeframe;
    } else if (utility === "electricity") {
        return getRandomElectric() * timeframe;
    } else if (utility === "gas") {
        return getRandomGas() * timeframe;
    } else if (utility === "heat") {
        return getRandomHeat() * timeframe;
    }

    return getSpecificRandom(1000, 5000, timeframe, 1);
}

export function getCurrentBuildingUtilityConsumption(building, utility) {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalBuildingUtilityConsumption(building, utility, timeStart, timeEnd);
}


export function getCurrentBuildingUtilityConsumptionGraphFormat(building1, building2, utility) {
    var utility1 = getCurrentBuildingUtilityConsumption(building1, utility);
    var utility2 = getCurrentBuildingUtilityConsumption(building2, utility)
    var data = new Array(2);
    data[0] = {'x': building1, 'y': utility1};
    data[1] = {'x': building2, 'y': utility2};
    return data;
}
// added function to get usage I need
export function getCurrentConsumptionGraphFormat() {
    var totalWater = 0;
    var totalElectricity = 0;
    var totalHeat = 0;
    var totalGas = 0;
    var data = new Array(4);
    var consumption = {};
    var buildings = getBuildingsList();

    buildings.forEach(function(building) {
        totalWater += getCurrentBuildingUtilityConsumption(building, "water");
        totalElectricity += getCurrentBuildingUtilityConsumption(building, "electricity");
        totalHeat += getCurrentBuildingUtilityConsumption(building, "heat");
        totalGas += getCurrentBuildingUtilityConsumption(building, "gas");
    });

    data[0] = {'x': 'Gas (thm)', 'y': totalGas};
    data[1] = {'x': 'Electricity (kWh)', 'y': totalElectricity};
    data[2] = {'x': 'Heat (kBTU)', 'y': totalHeat};
    data[3] = {'x': 'Water (gal)', 'y': totalWater};

    total = combineData(data);
    consumption["total"] = total;
    consumption["data"] = data;

    return consumption;
}

export function reformatDate(date){
    // This function reformats the date object into a string that matched the format of a key 
    // in the JSON JanData. Note: at the moment it HARDCODES the month as "1" and year as "18"
    // We'll have to change that if we add more hardcoded data dumps from Lucid.

    newDate = ["1",
               date.getDate(),
               "18"].join('/')+' '+
               // Number(date.getFullYear().toString().substring(2,4))].join('/')+' '+
              [date.getHours(),
               "00"].join(':');

    // console.log(newDate);
    return newDate;
}

export function getCampusUtilityConsumptionOverTime(utility, timeStart, timeEnd, timeScale) {
    var numberEntries = Math.round(Math.abs(timeEnd - timeStart) / (60000 * timeScale));
    var currentTime = new Date(timeEnd);
    var reformattedDate = reformatDate(currentTime);

    var table = new Array(numberEntries);
    for (var i = numberEntries-1; i >= 0; i--) {
        reformattedDate = reformatDate(currentTime);

        table[i] = {};
        table[i]["date"] = reformattedDate.toString();

        var utilityTable = wTable;

        switch (utility) {
            case 'electricity':
                utilityTable = eTable;
                break;
            case 'water':
                utilityTable = wTable;
                break;
            case 'gas':
                utilityTable = sTable;
                break;
            case 'heat':
                utilityTable = sTable;
                break;
        }

        var dataPt = JanData[utilityTable["Burton"]][reformattedDate];

        
        if (typeof dataPt == 'undefined') {
            console.log('UNDEFINED DATA POINT (ApiWrappers.js):' + reformattedDate);

            dataPt = "0";
        }

        table[i][utility] = Number(dataPt);

        currentTime.setMinutes(currentTime.getMinutes() - timeScale);
    }

    return table;
}

export function getCampusUtilityConsumptionOverTimeGraphFormat(utility, timeStart, timeEnd, timeScale) {
    var numberEntries = Math.round(Math.abs(timeEnd - timeStart) / (60000 * timeScale));
    var currentTime = new Date(timeEnd);
    var reformattedDate = reformatDate(currentTime);

    var table = new Array(numberEntries);
    for (var i = numberEntries-1; i >= 0; i--) {
        reformattedDate = reformatDate(currentTime);

        table[i] = {};
        table[i]["x"] = reformattedDate.toString();

        var utilityTable = wTable;

        switch (utility) {
            case 'electricity':
                utilityTable = eTable;
                break;
            case 'water':
                utilityTable = wTable;
                break;
            case 'gas':
                utilityTable = sTable;
                break;
            case 'heat':
                utilityTable = sTable;
                break;
        }

        var dataPt = JanData[utilityTable["Burton"]][reformattedDate];


        if (typeof dataPt == 'undefined') {
            console.log('UNDEFINED DATA POINT (ApiWrappers.js):' + reformattedDate);

            dataPt = "0";
        }

        table[i]["y"] = Number(dataPt);

        currentTime.setMinutes(currentTime.getMinutes() - timeScale);
    }

    return table;
}

// Added wrapper to get data the way I need it
export function getTotalConsumptionGraphFormat(timeStart, timeEnd, timeScale, scaleFactor) {
    var waterTable = getCampusUtilityConsumptionOverTimeGraphFormat("water", timeStart, timeEnd, timeScale);
    var electricityTable = getCampusUtilityConsumptionOverTimeGraphFormat("electricity", timeStart, timeEnd, timeScale);
    var gasTable = getCampusUtilityConsumptionOverTimeGraphFormat("gas", timeStart, timeEnd, timeScale);
    var heatTable = getCampusUtilityConsumptionOverTimeGraphFormat("heat", timeStart, timeEnd, timeScale);

    var combinedTable = new Array(waterTable.length);
    var finalTable = {};
    var currData = 0;
    var rank = waterTable.length;
    var year = 2018;
    var month = 4;

    for (var i=waterTable.length-1; i >= 0; i--) {
        combinedTable[i] = {};
        currDate = new Date(waterTable[i]["x"]);

        switch (scaleFactor){
            case 1:
                combinedTable[i]["x"] = getDayOfWeek(currDate.getDay());
                break;

            case 7:
                if (i==0) {
                    combinedTable[i]["x"] = "-3";
                } else if (i==1) {
                    combinedTable[i]["x"] = "-2";
                } else if (i==2) {
                    combinedTable[i]["x"] = "-1";
                } else if (i==3) {
                    combinedTable[i]["x"] = "Current";
                } else {
                    combinedTable[i]["x"] = "help";
                }
                break;

            case 30:
                // quick fix
                combinedTable[i]["x"] = month + "/" + '18';
                month --;
//                combinedTable[i]["x"] = (currDate.getMonth() + 1) + "/" + currDate.getYear().toString().substring(1);
                break;

            case 365:
                // quick fix
                combinedTable[i]["x"] = year.toString();
                year --;
//                combinedTable[i]["x"] = currDate.getFullYear().toString();
                break;

            default:
                combinedTable[i]["x"] = waterTable[i]["date"];
                break;
        }

        combinedTable[i]["y"] = (waterTable[i]["y"] + electricityTable[i]["y"]
                                    + gasTable[i]["y"] + heatTable[i]["y"]) * scaleFactor /1000;

        if (i==waterTable.length-1) {
            currData = combinedTable[i]["y"];

        } else if (combinedTable[i]["y"] < currData) {
            rank-=1;
        }
    }

    finalTable["data"] = {}
    finalTable["data"]["water"] = waterTable;
    finalTable["data"]["electricity"] = electricityTable;
    finalTable["data"]["gas"] = gasTable;

    finalTable["rank"] = rank;
    finalTable["total"] = combinedTable;

    return finalTable;
}

export function getTotalCampusUtilityConsumption(utility, timeStart, timeEnd) {
    // return total campus consumption of utility over specified time frame

    // calculate number of 15-min chunks b/w 'timeStart' and 'timeEnd'
    var timeframe = Math.abs(timeEnd - timeStart) / (60000 * 15); // 60,000ms per min * 15min

    switch (utility) {
        case 'electricity':
            return getRandomElectric() * timeframe;
            break;
        case 'water':
            return getRandomWater() * timeframe;
            break;
        case 'gas':
            return getRandomGas() * timeframe;
            break;
        case 'heat':
            return getRandomHeat() * timeframe;
            break;
    }

    return Math.random() * scaleFactor * timeframe; 
}

export function getCurrentCampusUtilityConsumption(utility) {
    var timeStart = new Date();
    timeStart.setMinutes(timeStart.getMinutes() - 15);
    var timeEnd = new Date();

    return getTotalCampusUtilityConsumption(utility, building, timeStart, timeEnd);
}

export function getEveryBuildingUtilityConsumption(utility) {
    var buildings = getBuildingsList();

    var total = 0;
    var table = new Array(buildings.length);

    for (var i = 0; i < table.length; i++) {
        table[i] = {};
        table[i]["building"] = buildings[i];
        switch (utility) {
            case 'electricity':
                table[i][utility] = getRandomElectric();
                break;
            case 'water':
                table[i][utility] = getRandomWater();
                break;
            case 'gas':
                table[i][utility] = getRandomGas();
                break;
            case 'heat':
                table[i][utility] = getRandomHeat();
                break;
        }

        total += table[i][utility];
    }

    for (var i = 0; i < table.length; i++) {
        table[i]["percent"] = table[i][utility] / total;
    }

    table = sortByKey(table, "percent");

    return table;
}


// Helper function to sory the building list (in descending order)
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

function getRandomWater() {
    return getSpecificRandom(100000, 500000, 1, 1);
}

function getRandomGas() {
    return getSpecificRandom(50000, 100000, 1, 1);
}

function getRandomHeat() {
    return getSpecificRandom(50000, 100000, 1, 1);
}

function getRandomElectric() {
    return getSpecificRandom(100000, 500000, 1, 1);
}

export function getAllHistoricalGraphData() {
    var historicalData = {};
    var currDate = new Date();

    var dayUsageData = getDayGraph(currDate, "usage");
    var dayGenerationData = getDayGraph(currDate, "generation");
    var dayTurbineData = getDayGraph(currDate, "turbine");

    historicalData["dayUsage"] = dayUsageData;
    historicalData["dayGeneration"] = dayGenerationData;
    historicalData["dayTurbine"] = dayTurbineData;

    var weekUsageData = getWeekGraph(currDate, "usage");
    var weekGenerationData = getWeekGraph(currDate, "generation");
    var weekTurbineData = getWeekGraph(currDate, "turbine");

    historicalData["weekUsage"] = weekUsageData;
    historicalData["weekGeneration"] = weekGenerationData;
    historicalData["weekTurbine"] = weekTurbineData;

    var monthUsageData = getMonthGraph(currDate, "usage");
    var monthGenerationData = getMonthGraph(currDate, "generation");
    var monthTurbineData = getMonthGraph(currDate, "turbine");

    historicalData["monthUsage"] = monthUsageData;
    historicalData["monthGeneration"] = monthGenerationData;
    historicalData["monthTurbine"] = monthTurbineData;

    var yearUsageData = getYearGraph(currDate, "usage");
    var yearGenerationData = getYearGraph(currDate, "generation");
    var yearTurbineData = getYearGraph(currDate, "turbine");

    historicalData["yearUsage"] = yearUsageData;
    historicalData["yearGeneration"] = yearGenerationData;
    historicalData["yearTurbine"] = yearGenerationData;

    return historicalData;
}

export function getAllCurrentGraphData() {
    var currData = {};
    var data = {};
    var totals = {};

    var usage = getCurrentConsumptionGraphFormat();
    var generation = getCurrentGenerationGraphFormat();
    var turbineGeneration = getCurrentWindGenerationGraphFormat();
    var turbineConsumption = getCurrentWindConsumption();
    var wind = getCurrentWindSpeed();

    data["usage"] = usage.data;
    data["generation"] = generation.data;
    data["turbine"] = turbineGeneration.data;
    data["windSpeed"] = wind;

    totals["usage"] = usage.total;
    totals["generation"] = generation.total;
    totals["turbine"] = {};
    totals["turbine"]["generation"] = turbineGeneration.total;
    totals["turbine"]["consumption"] = turbineConsumption;

    currData["data"] = data;
    currData["totals"] = totals;
    return currData;
}

function getDayGraph(currDate, type) {
    var comparisonDate = new Date();
    comparisonDate.setDate(currDate.getDate()-7);

    if (type === "usage") {
        return getTotalConsumptionGraphFormat(comparisonDate, currDate, 1440, 1);
    } else if (type === "generation") {
         return getTotalGenerationGraphFormat(comparisonDate, currDate, 1440, 1);
    } else {
        return getTotalWindGenerationGraphFormat(comparisonDate, currDate, 1440, 1);
    }

}

function getWeekGraph(currDate, type) {
    var comparisonDate = new Date();
    comparisonDate.setDate(currDate.getDate()-28);

    if (type === "usage") {
        return getTotalConsumptionGraphFormat(comparisonDate, currDate, 10080, 7);
    } else if (type === "generation") {
        return getTotalGenerationGraphFormat(comparisonDate, currDate, 10080, 7);
    } else {
        return getTotalWindGenerationGraphFormat(comparisonDate, currDate, 10080, 7);
    }

}

function getMonthGraph(currDate, type){
    var comparisonDate = new Date();
    comparisonDate.setMonth(currDate.getMonth()-12);

    if (type === "usage") {
        return getTotalConsumptionGraphFormat(comparisonDate, currDate, 41760, 30);
    } else if (type === "generation") {
        return getTotalGenerationGraphFormat(comparisonDate, currDate, 41760, 30);
    } else {
        return getTotalWindGenerationGraphFormat(comparisonDate, currDate, 41760, 30);
    }
}

function getYearGraph(currDate, type) {
    var comparisonDate = new Date();
    comparisonDate.setYear(currDate.getFullYear()-4);

    if (type === "usage") {
        return getTotalConsumptionGraphFormat(comparisonDate, currDate, 525600, 365);
    } else if (type === "generation") {
        return getTotalGenerationGraphFormat(comparisonDate, currDate, 525600, 365);
    } else {
        return getTotalWindGenerationGraphFormat(comparisonDate, currDate, 525600, 365);
    }
}
