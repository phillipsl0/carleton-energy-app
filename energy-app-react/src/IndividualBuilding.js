
// DEPRECATED

// import React, { Component } from 'react';
// import { getCurrentBuildingUtilityConsumption, getTotalConsumptionGraphFormat, getTotalGenerationGraphFormat } from './helpers/ApiWrappers';
// import { AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, ScrollView } from 'react-native'
// import { GetStyle } from './styling/Themes';
// import CurrTheme from './styling/CurrentTheme';
// import GraphDetail from './overview/GraphDetailCard';
// // import ExampleData from './overview/OverviewExampleData';
// import Utilities from './overview/UtilitiesMiniCards';
// import OverviewCards from './overview/OverviewCards';



// export default class IndividualBuilding extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             // graphData = 
//             // buildingName = props.navigation.state.params.item.name;
//             // curConsumption = (getCurrentBuildingUtilityConsumption("Burton", "water")/15).toFixed(2);
//         }
//     }

//     // This function gets called immediately after the component is mounted
//     componentDidMount() {
//         currDate = new Date();
        
//         this.updateDay(currDate);
//         this.updateWeek(currDate);
//         this.updateMonth(currDate);
//         this.updateYear(currDate);
//     }

//     updateDay = ( currDate ) => {
//         comparisonDate = new Date();
//         comparisonDate.setDate(currDate.getDate()-7);
        
//         if (this.props.navigation.state.params.card == 1) {
//             updatedDay = getTotalConsumptionGraphFormat(comparisonDate, currDate, 1440);
//         } else {
//             updatedDay = getTotalGenerationGraphFormat(comparisonDate, currDate, 1440);
//         }
        
//         this.setState({ dayData: updatedDay });
//     }

//     updateWeek = ( currDate ) => {
//         comparisonDate = new Date();
//         comparisonDate.setDate(currDate.getDate()-28);
        
//         if (this.props.navigation.state.params.card == 1) {
//             updatedWeek = getTotalConsumptionGraphFormat(comparisonDate, currDate, 10080);
//         } else {
//             updatedWeek = getTotalGenerationGraphFormat(comparisonDate, currDate, 10080);
//         }
        
//         this.setState({ weekData: updatedWeek });
//     }

//     updateMonth = ( currDate ) => {
//         comparisonDate = new Date();
//         comparisonDate.setMonth(currDate.getMonth()-11);

//         if (this.props.navigation.state.params.card == 1) {
//             updatedMonth = getTotalConsumptionGraphFormat(comparisonDate, currDate, 41760);
//         } else {
//             updatedMonth = getTotalGenerationGraphFormat(comparisonDate, currDate, 41760);
//         }

//         this.setState({ monthData: updatedMonth });
//     }

//     updateYear = ( currDate ) => {
//         comparisonDate = new Date();
//         comparisonDate.setYear(currDate.getFullYear()-5);

//         if (this.props.navigation.state.params.card == 1) {
//             updatedYear = getTotalConsumptionGraphFormat(comparisonDate, currDate, 525600);
//         } else {
//             updatedYear = getTotalGenerationGraphFormat(comparisonDate, currDate, 525600);
//         }

//         this.setState({ yearData: updatedYear });
//     }


//     getHeader = () => {
//         const themeStyles = GetStyle(CurrTheme);

//         headerText = (getCurrentBuildingUtilityConsumption("Burton", "water")/15).toFixed(1);
//         subheaderText = "gal/min";

//       return (
//           <View style={[styles.textContainer, themeStyles.centered]}>
//              <Text style={[styles.number, themeStyles.translucentText]}>
//                 {headerText}
//                 <Text style={[styles.words, themeStyles.translucentText]}>
//                     {subheaderText}
//                  </Text>
//              </Text>
//           </View>
//       );
//     }





//       getGraphScope = () => {
//         // graphData = navigation.data.comparison;

//         if (this.state.view == 'day') {
//             return this.state.dayData["data"];
//         } else if (this.state.view == 'week') {
//             return this.state.weekData["data"];
//         } else if (this.state.view == 'month') {
//             return this.state.monthData["data"];
//         } else if (this.state.view == 'year') {
//              return this.state.yearData["data"];
//         }
//     }

//     scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
//         this.setState({ view: buttonView,
//             viewNumber: buttonComparator,
//             selectedCard: buttonIndex});
//     }


//     render() {
//         navigation = this.props.navigation;
//         const themeStyles = GetStyle(CurrTheme);
//         header = this.getHeader();
//         // currData = this.getGraphScope();
//         currData = this.getGraphScope(historicalData, cardType);


//         const {state} = this.props.navigation;
//         const tableHead = [' ','Electric', 'Water', 'Gas'];
        
//         const test = []
//         for (var key in this.props.navigation.state.params.item) { 
//           if (Array.isArray(this.props.navigation.state.params.item[key])) {
//             test.push(this.props.navigation.state.params.item[key])
//           }
          
//         }
//         const num = (test.length - 1)
//         const tableData = [,
//         test[0], 
//         test[1], 
//         test[2],
//         test[3],
//         test[4],
//         test[5],
//         test[6],


//         ];


//         return (

//             <View style={[themeStyles.flex, themeStyles.list]}>


//                 <Image style={themeStyles.header} 
//                     source={{ uri: this.props.navigation.state.params.item.avatar }} />

//                 <View style={[themeStyles.header, themeStyles.carletonBlueBackground]}/>
//                 {header}

//                 <ScrollView style={themeStyles.lightBlueBackground}>

//                     <GraphDetail data={this.graphData}
//                         callback={this.scopeCallbackGraph}
//                         selected={this.state.selectedCard}/>                    


//                 </ScrollView>

//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//   card: {
//     paddingTop: 20,
//   },
//   bigyellow: {
//     color: 'green',
//     fontWeight: 'bold',
//     fontSize: 30
//     },
//   blue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     },
//     head: {
//       backgroundColor: 'grey',
//     },
//   table: { 
//     width: 250,
//     marginLeft: 5, 
    
//   },
//   text: { 
//     alignSelf: 'center',
//     marginLeft: 5, 
//     fontSize: 18,
//   },
//   listItem: {
//     height: 50,
//     backgroundColor: 'aqua',
//     borderBottomColor: '#c8c7cc',
//     borderBottomWidth: 0.5,
//     width: 300,
//     alignSelf: 'center',
//     paddingTop: 35,
//     paddingRight: 15,
//     paddingBottom: 55,

//   },
//   listImg: {
//     height: 30,
//     alignSelf: 'stretch',
//   },
//   listText: {
//     paddingLeft: 30,
//     marginLeft: 30,
//     fontSize: 24,
//   },
//   row: {
//     backgroundColor: 'orange',
//   },
//   view: {
//     alignItems: 'center',
//     backgroundColor: 'yellow'
//   },
//   img: {
//     alignSelf: 'stretch',
//     height: 100,
//   },
//   number: {
//     fontSize: 80,
//   },

//   textContainer: {
//     marginBottom: '5%',
//   },

//   words: {
//     fontSize: 20,
//     marginTop: '-2%',
//   },
// })

