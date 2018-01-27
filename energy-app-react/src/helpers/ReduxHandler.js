import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { getAllHistoricalGraphData, getAllCurrentGraphData } from './ApiWrappers'

// for redux
export const handler = store => next => action => {
    next(action);

    switch (action.type) {
        case 'GET_GRAPH_DATA':
            store.dispatch({type: 'GET_GRAPH_DATA_LOADING'});
            try {
                var historicalData = getAllHistoricalGraphData();
                var currentData = getAllCurrentGraphData();
                store.dispatch({
                    type: 'GET_GRAPH_DATA_RECEIVED',
                    historicalData,
                    currentData
                });
            } catch (error) {
                next({
                    type: 'GET_GRAPH_DATA_ERROR',
                });
            }

            break;
        default:
            break;
    };
}

export const dataReducer = (state = { historicalGraphData: [], currentGraphData: [], loading: true }, action) => {
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
                currentData: action.currentData
            };
        case 'GET_GRAPH_DATA_ERROR':
            return state;
        default:
            return state;
    };
}
