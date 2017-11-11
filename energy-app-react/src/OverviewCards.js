const OverviewCards = [
    {
        title: 'Your Energy Use',
        data: [{y:  8, x: "Electricity"},
               {y: 7, x: "Water"},
               {y: 16, x: "Heat/AC"}],
        graphType: 'bar' ,
    },
    {
        title: 'Campus Energy Use',
        data: [{y:  80, x: "Electricity"},
               {y: 70, x: "Water"},
               {y: 160, x: "Heat/AC"}],
        graphType: 'bar' ,
    },
    {
        title: 'Energy Generated on Campus',
        data: [{y:  8, x: 'Solar'},
               {y: 7, x: 'Wind'},
               {y: 5, x: 'Geothermal'}],
        graphType: 'pie' ,
    }
]

export default OverviewCards