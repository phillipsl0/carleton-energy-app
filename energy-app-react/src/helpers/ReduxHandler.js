import { Platform, Dimensions } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { getAllHistoricalGraphData, getAllCurrentGraphData, dateToTimestamp, cleanupData, getAllHistoricalBuildingGraphData, getAllCurrentBuildingGraphData, formatResponse } from './ApiWrappers';
import { calculateRatio } from './General';

/* Redux handles state for the app, including navigation
 * When the app starts up, redux is called during the loading screen
 * & the screen does not disappear until everything has been fetched
 */

/* When adding new redux calls that you want to happen at start up, call them in this handler
 * but define them in their own reducer (see below) */

// async getBuildingData(){
//     let result = await getFormattedData("Burton", currDate, daysAgo);
//     return result;
// }

export const handler = store => next => action => {
    next(action);

    switch (action.type) {
        case 'GET_BUILDING_GRAPH_DATA':
            store.dispatch({type: 'GET_BUILDING_GRAPH_DATA_LOADING'});
            // try {


                var date = new Date();
                var daysAgo = 128; // just over 4 months
                // // var historicalBuildingData = getBuildingData();
                // var historicalBuildingData = getFormattedData("Burton", currDate, daysAgo);
                // console.log("HERE~~~ ", historicalBuildingData);

                var historicalBuildingData = {};
                // var buildings = getBuildingsList();

                var end = new Date(date);
                end.setHours(0); // midnight earlier today
                var start = new Date(end);

                if (date.getFullYear() > 2017) {
                    start.setFullYear(2017);
                    end.setFullYear(2017);
                }

                start.setDate(start.getDate()-daysAgo);

                startStamp = dateToTimestamp(start);
                endStamp = dateToTimestamp(end);

                // var buildingID = buildingIDs[buildingName];
                var buildingID = 23;

                var url = 'http://energycomps.its.carleton.edu/api/index.php/values/building/'+buildingID+'/'+startStamp+'/'+endStamp;
                console.log(url);

                var currentBuildingData = getAllCurrentBuildingGraphData();

                fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => { 
                        responseJson = formatResponse(responseJson);
                        return responseJson;
                })
                .then(historicalBuildingData => next({

                        type: 'GET_BUILDING_GRAPH_DATA_RECEIVED',
                        historicalBuildingData,
                        currentBuildingData
                    
                }))
                .catch(error => next({
                    type: 'GET_BUILDING_GRAPH_DATA_ERROR',
                    error
                }))



            //     store.dispatch({
            //         type: 'GET_BUILDING_GRAPH_DATA_RECEIVED',
            //         historicalBuildingData,
            //         currentBuildingData
            //     });
            // } catch (error) {
            //     next({
            //         type: 'GET_BUILDING_GRAPH_DATA_ERROR',
            //     });
            // }

            break;
        case 'GET_GRAPH_DATA':
            store.dispatch({type: 'GET_GRAPH_DATA_LOADING'});
            try {
                var historicalData = getAllHistoricalGraphData();
                var current = getAllCurrentGraphData();
                var currentData = current.data;
                var currentTotals = current.totals;
                var windSpeed = currentData.windSpeed;
                var windRatio = calculateRatio(currentData);

                store.dispatch({
                    type: 'GET_GRAPH_DATA_RECEIVED',
                    historicalData,
                    currentData,
                    currentTotals,
                    windRatio,
                    windSpeed
                });
            } catch (error) {
                next({
                    type: 'GET_GRAPH_DATA_ERROR',
                });
            }

            break;
        case 'GET_LAYOUT':
            var layout = Dimensions.get('screen');
            store.dispatch({
                type: 'GET_LAYOUT_RECEIVED',
                layout,
            });
            break;
        case 'GET_TURBINE':
            store.dispatch({type: 'GET_TURBINE_DATA_LOADING'});
            var timeEnd = new Date();
            var timeStart = new Date();
            timeStart.setHours(timeEnd.getHours()-1);
            var start = dateToTimestamp(timeStart);
            var end = dateToTimestamp(timeEnd);

            var url = 'http://energycomps.its.carleton.edu/api/index.php/values/building/20/'+start+'/'+end;

            fetch(url)
                .then((response) => response.json())
                .then((jsonData) => {
                    jsonData = cleanupData(jsonData);
                    return jsonData;
                })
                .then(turbineData => next({
                    type: 'GET_TURBINE_DATA_RECEIVED',
                    turbineData
                }))
                .catch(error => next({
                    type: 'GET_TURBINE_DATA_ERROR',
                    error
                }))
                break;
        case 'GET_SOLAR':
            store.dispatch({type: 'GET_SOLAR_DATA_LOADING'});
            var timeEnd = new Date();
            var timeStart = new Date();
            timeStart.setHours(timeEnd.getHours()-1);

            var start = dateToTimestamp(timeStart);
            var end = dateToTimestamp(timeEnd);

            var url = 'http://energycomps.its.carleton.edu/api/index.php/values/building/21/'+start+'/'+end;

            fetch(url)
                .then((response) => response.json())
                .then((jsonData) => {
                    jsonData = cleanupData(jsonData);
                    return jsonData;
                })
                .then(solarData => next({
                    type: 'GET_SOLAR_DATA_RECEIVED',
                    solarData
                }))
                .catch(error => next({
                    type: 'GET_SOLAR_DATA_ERROR',
                    error
                }))
                break;
        default:
            break;
    };
}

export const apiReducer = (state = { turbineData: [], solarData: [], loading: true}, action) => {
    switch (action.type) {
            case 'GET_TURBINE_LOADING':
                return {
                    ...state,
                    loading: true,
                };
            case 'GET_TURBINE_DATA_RECEIVED':
                return {
                    loading: false,
                    turbineData: action.turbineData,
                };
            case 'GET_TURBINE_DATA_ERROR':
                return state;

            case 'GET_SOLAR_LOADING':
                return {
                    ...state,
                    loading: true,
                };
            case 'GET_SOLAR_DATA_RECEIVED':
                // console.log(action.solarData);
                return {
                    loading: false,
                    solarData: action.solarData,
                };
            case 'GET_SOLAR_DATA_ERROR':
                return state;

            default:
                return state;
        };
}

export const buildingDataReducer = (state = { historicalBuildingGraphData: [], currentBuildingGraphData: [], loading: true}, action) => {
    switch (action.type) {
        case 'GET_BUILDING_GRAPH_DATA_LOADING':
            return {
                ...state,
                loading:true,
            };
        case 'GET_BUILDING_GRAPH_DATA_RECEIVED':
            return {
                loading: false,
                historicalBuildingData: action.historicalBuildingData,
                currentBuildingData: action.currentBuildingData
            };
        case 'GET_BUILDING_GRAPH_DATA_ERROR':
            return state;
        default:
            return state;
        };
}

export const dataReducer = (state = { historicalGraphData: [], currentGraphData: [], currentTotals: [], windRatio: [],
                                      windSpeed: [], loading: true }, action) => {
    switch (action.type) {
        case 'GET_GRAPH_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'GET_GRAPH_DATA_RECEIVED':
            return {
                loading: false,
                historicalData: action.historicalData,
                currentData: action.currentData,
                currentTotals: action.currentTotals,
                windRatio: action.windRatio,
                windSpeed: action.windSpeed
            };
        case 'GET_GRAPH_DATA_ERROR':
            return state;
        default:
            return state;
    };
}

const initialState = {'height': 500, 'width': 500};

export const layoutReducer = (state = {layout: []}, action) => {
    const ui = Dimensions.get('screen');
    switch (action.type) {
        case 'GET_LAYOUT_RECEIVED':
            return {
                layout: action.layout,
            }
        default:
            return state;
    };
}