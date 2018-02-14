const ExampleData = [
    {
        title: 'Energy Use',
        data: {current: [{y: 8, x: "Electricity"},
                         {y: 7, x: "Water"},
                         {y: 16, x: "Heat/AC"}],
               comparison: {
                   day: {graph: [{y: 8, x: "1/10"},
                         {y: 7, x: "1/11"},
                         {y: 16, x: "1/12"},
                         {y: 3, x: "1/13"},
                         {y: 13, x: "1/14"},
                         {y: 5, x: "1/15"},
                         {y: 26, x: "1/16"}],
                         ranking: 1},
                   week: {graph: [{y: 60, x: "12/24 - 12/30"},
                          {y: 35, x: "12/31 - 1/6"},
                          {y: 48, x: "1/7 - 1/13"},
                          {y: 51, x: "1/14 - 1/20"}],
                          ranking: 2},
                   month: {graph: [{y: 200, x: "Feb"},
                           {y: 213, x: "Mar"},
                           {y: 178, x: "Apr"},
                           {y: 310, x: "May"},
                           {y: 134, x: "Jun"},
                           {y: 105, x: "Jul"},
                           {y: 100, x: "Aug"},
                           {y: 260, x: "Sep"},
                           {y: 234, x: "Oct"},
                           {y: 190, x: "Nov"},
                           {y: 146, x: "Dec"},
                           {y: 267, x: "Jan"}],
                           ranking: 2},
                   year: {graph: [{y: 1370 , x: "2014"},
                          {y: 1460, x: "2015"},
                          {y: 1356, x: "2016"},
                          {y: 1590, x: "2017"},
                          {y: 1900, x: "2018"}],
                          ranking: 1},
               }},
        graphType: 'pie' ,
    },
    {
        title: 'Energy Generation',
        data: {current: [{y: 8, x: "Solar"},
                         {y: 7, x: "Wind"},
                         {y: 16, x: "Geothermal"}],
               comparison: {
                   day: {graph: [{y: 8, x: "1/10"},
                                 {y: 7, x: "1/11"},
                                 {y: 16, x: "1/12"},
                                 {y: 3, x: "1/13"},
                                 {y: 13, x: "1/14"},
                                 {y: 5, x: "1/15"},
                                 {y: 26, x: "1/16"}],
                         ranking: 1},
                   week: {graph: [{y: 60, x: "12/24 - 12/30"},
                           {y: 35, x: "12/31 - 1/6"},
                           {y: 48, x: "1/7 - 1/13"},
                           {y: 51, x: "1/14 - 1/20"}],
                           ranking: 2},
                   month: {graph: [{y: 200, x: "Feb"},
                             {y: 213, x: "Mar"},
                             {y: 178, x: "Apr"},
                             {y: 310, x: "May"},
                             {y: 134, x: "Jun"},
                             {y: 105, x: "Jul"},
                             {y: 100, x: "Aug"},
                             {y: 260, x: "Sep"},
                             {y: 234, x: "Oct"},
                             {y: 190, x: "Nov"},
                             {y: 146, x: "Dec"},
                             {y: 267, x: "Jan"}],
                             ranking: 2},
                   year: {graph: [{y: 1370 , x: "2014"},
                           {y: 1460, x: "2015"},
                           {y: 1356, x: "2016"},
                           {y: 1590, x: "2017"},
                           {y: 1900, x: "2018"}],
                           ranking: 1},
               }},
        graphType: 'pie' ,
    },
    {
            title: 'Wind Turbine Energy',
            data: {current: [{y: 8, x: "Turbine One"},
                             {y: 7, x: "Turbine Two"},],
                   comparison: {
                       day: {graph: [{y: 8, x: "1/10"},
                                     {y: 7, x: "1/11"},
                                     {y: 16, x: "1/12"},
                                     {y: 3, x: "1/13"},
                                     {y: 13, x: "1/14"},
                                     {y: 5, x: "1/15"},
                                     {y: 26, x: "1/16"}],
                             ranking: 1},
                       week: {graph: [{y: 60, x: "12/24 - 12/30"},
                               {y: 35, x: "12/31 - 1/6"},
                               {y: 48, x: "1/7 - 1/13"},
                               {y: 51, x: "1/14 - 1/20"}],
                               ranking: 2},
                       month: {graph: [{y: 200, x: "Feb"},
                                 {y: 213, x: "Mar"},
                                 {y: 178, x: "Apr"},
                                 {y: 310, x: "May"},
                                 {y: 134, x: "Jun"},
                                 {y: 105, x: "Jul"},
                                 {y: 100, x: "Aug"},
                                 {y: 260, x: "Sep"},
                                 {y: 234, x: "Oct"},
                                 {y: 190, x: "Nov"},
                                 {y: 146, x: "Dec"},
                                 {y: 267, x: "Jan"}],
                                 ranking: 2},
                       year: {graph: [{y: 1370 , x: "2014"},
                               {y: 1460, x: "2015"},
                               {y: 1356, x: "2016"},
                               {y: 1590, x: "2017"},
                               {y: 1900, x: "2018"}],
                               ranking: 1},
                   }},
            graphType: 'pie' ,
        }
]

const turbineData = [
    {
     title: 'Turbine One',
     generation: {
                  current: 433032,
                  historicalHigh: 548600,
                 },
     speed: {
              current: 6.2,
              historicalHigh: 8.3,
            },
     consumption: {
                    current: 601
                  }

    },
    {
     title: 'Turbine Two',
     generation: {
                  current: 583389,
                  historicalHigh: 602780,
                 },
     speed: {
              current: 6.2,
              historicalHigh: 8.3,
            },
     consumption: {
                    current: 750
                  }

    }
]

export const fake = [
    {
      title: 'Wind Speed',
      x: '6.2 mph',
      icon: "weather-windy",
    },

    {
      title: 'Turbine Generation',
      x: '583,389 kWh',
      icon: "airplane-takeoff",
    },

    {
      title: 'Turbine Consumption',
      x: '750 kWh',
      icon: "airplane-landing",
    },

    {
          title: 'Other',
          x: '?????',
          icon: "leaf",
        },

]

export default ExampleData