/* OverviewExampleData.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Provides data for Overview cards & turbine page.
 */

/* Defines titles & graph types for overview cards*/
export const overviewLabels = [
    {
            title: 'Wind Turbine Energy',
            graphType: 'pie' ,
    },
    {
        title: 'Energy Use',
        graphType: 'pie' ,
    },
    {
        title: 'Energy Generation',
        graphType: 'pie' ,
    },
]

/* Defines titles and icons for turbine page*/
export const turbineLabels = [
    {
      title: '% of Total Energy Use',
      icon: "progress-two",
      type: 'entypo',
      index: 0,
    },
    {
      title: 'Wind Speed',
      icon: "weather-windy",
      type: 'material-community',
      index: 1,
    },

    {
      title: 'Current Consumption',
      icon: "battery-negative",
      type: 'material-community',
      index: 2,
    },

    {
      title: "Week's High",
      icon: "star",
      type: "entypo",
      index: 3,
    },
]
