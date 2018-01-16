const ExampleData = [
    {
        title: 'Your Energy Use',
        data: {day: {graph: [{y: 8, x: "Electricity"},
                     {y: 7, x: "Water"},
                     {y: 16, x: "Heat/AC"}],
                     ranking: 2},
               week: {graph: [{y: 16, x: "Electricity"},
                      {y: 16, x: "Water"},
                      {y: 16, x: "Heat/AC"}],
                      ranking: 2},
               month: {graph: [{y: 160, x: "Electricity"},
                      {y: 0, x: "Water"},
                      {y: 50, x: "Heat/AC"}],
                      ranking: 9},
               year: {graph: [{y: 32, x: "Electricity"},
                      {y: 40, x: "Water"},
                      {y: 90, x: "Heat/AC"}],
                      ranking: 1},
               },
        graphType: 'bar' ,
    },
    {
        title: 'Campus Energy Use',
        data: {day: {graph: [{y: 8, x: "Electricity"},
                     {y: 7, x: "Water"},
                     {y: 16, x: "Heat/AC"}],
                     ranking: 1},
               week: {graph: [{y: 16, x: "Electricity"},
                      {y: 16, x: "Water"},
                      {y: 16, x: "Heat/AC"}],
                      ranking: 3},
               month: {graph: [{y: 160, x: "Electricity"},
                      {y: 0, x: "Water"},
                      {y: 50, x: "Heat/AC"}],
                      ranking: 7},
               year: {graph: [{y: 32, x: "Electricity"},
                      {y: 40, x: "Water"},
                      {y: 90, x: "Heat/AC"}],
                      ranking: 3},
               },
        graphType: 'bar' ,
    },
    {
        title: 'Energy Generated on Campus',
        data: {day: {graph: [{y: 8, x: "Solar"},
                     {y: 7, x: "Wind"},
                     {y: 16, x: "Geothermal"}],
                     ranking: 1},
               week: {graph: [{y: 16, x: "Solar"},
                      {y: 16, x: "Wind"},
                      {y: 16, x: "Geothermal"}],
                      ranking: 2},
               month: {graph: [{y: 160, x: "Solar"},
                      {y: 0, x: "Wind"},
                      {y: 50, x: "Geothermal"}],
                      ranking: 12},
               year: {graph: [{y: 32, x: "Solar"},
                      {y: 40, x: "Wind"},
                      {y: 90, x: "Geothermal"}],
                      ranking: 5},
               },
        graphType: 'pie' ,
    }
]

export default ExampleData