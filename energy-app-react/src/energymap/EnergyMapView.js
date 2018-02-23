import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Polygon, Callout, Marker } from 'react-native-maps';

import { connect } from 'react-redux';
import MapCallout from './MapCallout';
import IndividualBuilding from './../buildings/IndividualBuilding';
import BuildingStack from './../buildings/BuildingListView';
import buildings from './../buildings/Buildings'
import { getCurrentBuildingUtilityConsumption } from './../helpers/ApiWrappers.js';
import TopUtilities from './EnergyMapUtilityButtons';
import EnergyMapTimestamp from './EnergyMapTimestamp';
import ComparisonPage from './../buildings/ComparisonPage';
import BuildingComparison from './../buildings/BuildingComparison';
import { getUnits } from './../helpers/General';

/*
Using tutorials:
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
Polygon onPress: https://snack.expo.io/H1L9ClUGW
Animated region with scroll cards: https://codedaily.io/tutorials/9/Build-a-Map-with-Custom-Animated-Markers-and-Region-Focus-when-Content-is-Scrolled-in-React-Native
Cool native app: https://themeteorchef.com/tutorials/how-to-build-a-react-native-app-with-meteor
Get lat/long: http://www.mapcoordinates.net/en
*/


const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
var {screenHeight, screenWidth} = Dimensions.get('window');

const initialRegion = {
  latitude: 44.4606925434,
  longitude: -93.1533574685,
  latitudeDelta: 0.005223853, //0.00475503 > 0.003861 previously
  longitudeDelta: 0.0086313486, //0.004325397 > 0.003916 previously
}


//Get redux
@connect(
    state => ({
        historicalBuildingData: state.buildings.historicalBuildingData,
        currentBuildingData: state.buildings.currentBuildingData,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_BUILDING_GRAPH_DATA'}),
    }),
)

class EnergyMapView extends Component {
  constructor(props) {
    super(props);
    
    // Turn fixed regions into state
    // Get drawn polygon coordinates: http://www.birdtheme.org/useful/v3tool.html
    // Get exact point lat/long: http://www.mapcoordinates.net/en
    this.state = {
      lastBuildingPressed: "No buildings have been pressed",
      polygons: [],
      buildings_info: {
        "Burton": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Cassat": {
          "electric": {
            "max": 40469,
            "min": 3137,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Davis": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Evans": {
          "electric": {
            "max": 47703,
            "min": 3228,
          },
          "water": {
            "max": 316880,
            "min": 4232,
          },
        },
        "Goodhue": {
          "electric": {
            "max": 38955,
            "min": 2427,
          },
          "water": {
            "max": 285100,
            "min": 3200,
          },
        },
        "Memo": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Musser": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Myers": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Nourse": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Sayles": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Scoville": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Severance": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Watson": {
          "electric": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        }
      },
      // Initial region is Carleton's coordinates
      region: {
        // Carleton's coordinates
        latitude: 44.4606925434,
        longitude: -93.1533574685,
        latitudeDelta: 0.005223853, //0.00475503 > 0.003861 previously
        longitudeDelta: 0.0086313486, //0.004325397 > 0.003916 previously
      },
      ready: true,
      utilityNameShown: 'total',
      utilityIndexShown: 1, // for IndividualBuilding's UtilitiesMiniCard
      mapLoading: true
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  };


  // Assemble all of Carleton's buildings BEFORE rendering
  componentWillMount() {
    this.getBuildingData('electric'); // Initialize with electric
    this.moveToCarleton();
    //console.log('EnergyMapView component is mounting...');
    this.closeActivityIndicator();
    //console.log("Component did mount")
  };

  openActivityIndicator() {
    this.setState({ mapLoading: true });
  };

  // Closes activity indicator with 2 second delay after call
  closeActivityIndicator() {
    setTimeout(() => this.setState({
      mapLoading: false }), 2000);
  };

  setRegion(region) {
    if(this.state.ready) {
      setTimeout(() => this.refs.map.animateToRegion(region), 1);
    }
  };

  moveToCarleton() {
    this.setRegion(this.state.region);
  };

  // Indicates when map is ready
  onMapReady = () => {
    this.setState({ ready: true });
    this.moveToCarleton();
    //console.log("Map ready: moving to Carleton")
  };

  // Maps utility name to its respective utility mini card index
  mapUtilityNameToIndex(utilityName) {
    if (utilityName == 'total') {
      return (1);
    }
    else if (utilityName == 'heat') {
      return (2);
    }
    else if (utilityName == 'electric') {
      return (3);
    }
    else if (utilityName == 'water') {
      return (4);
    }
    return (1);
  };

  mapUtilityNameToAPI(utilityName) {
    if (utilityName == 'electric') {
      return ('electricity');
    }
    return (utilityName);
  };

  getCurrentBuildingUsage(building, utilityName) {
    if (utilityName == 'total') {
      return this.props.currentBuildingData["total"];
    } else if (utilityName == 'electricity') {
      return this.props.currentBuildingData["data"][3]["y"];
    } else if (utilityName == 'heat') {
      return this.props.currentBuildingData["data"][2]["y"];
    } else if (utilityName == 'water') {
      return this.props.currentBuildingData["data"][3]["y"];
    };
    return 0
  };


  // Updates colors of energy map with new utility selection
  updateUtility = (utilitySelected) => {
    // Begin to update map
    this.openActivityIndicator();
    this.moveToCarleton();  // Veronica, I moved this, it looks better on Android this way. - Martin
    utilitySelected = utilitySelected.toLowerCase() // lower case
    utilityIndex = this.mapUtilityNameToIndex(utilitySelected) // Get index for buildings
    this.setState({ utilityNameShown: utilitySelected, utilityIndexShown: utilityIndex });
    
    // Update map
    this.getBuildingData(utilitySelected);
    // this.moveToCarleton();
    this.closeActivityIndicator();
  };

  onRegionChange = (region) => {
    //console.log('onRegionChange', region);
    //this.checkCalloutRender(region);
  };

  onRegionChangeComplete = (region) => {
    //console.log('onRegionChangeComplete', region);
  };

  /*
  Algorithm to generate CSS hsl color code from [0, 1] value
  Based on: https://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
  0 : green
  .5 : yellow
  1 : red
  */
  determineBuildingColor(buildingName, utilitySelected) {
    try {
      // var use = getCurrentBuildingUtilityConsumption(buildingName, this.mapUtilityNameToAPI(utilitySelected)).toFixed(1)
      var use = this.getCurrentBuildingUsage(buildingName, utilitySelected);
      //var h = (1.0 - use) * 240
      //console.log("Usage selected utility", use)
      var building = this.state.buildings_info
      building = building[buildingName][utilitySelected]
      var val = Math.abs(1 - ((use - building.min) / (building.max - building.min))) // taken from https://stats.stackexchange.com/questions/70801/how-to-normalize-data-to-0-1-range
      //console.log("Normalizing " + buildingName, val)
      var h = val * 85 // taken from: https://stackoverflow.com/questions/6660879/python-map-float-range-0-0-1-0-to-color-range-red-green
      return this.setColor(val);

    } catch (err) {
      // Returns grey if unable to get building data from API
      console.log("Error in setting colors: ", err);
      return ("lightgrey");
    }
  };

  // Taken from: https://ux.stackexchange.com/questions/34875/how-to-translate-a-rating-range-into-red-yellow-green-colours
  // Generates color of value normalizated on 0 to 10 scale
  setColor(value) {
    var color;
    var parts = (value > 5) ? (1-((value-5)/5)) : value/5;
    parts = Math.round(parts * 255);
    if (value > 5) {
        color = [255, parts, 0];
    }
    else if (value < 5){
        color = [parts, 255, 0];
    }
    else {
        color = [255,255,0]
    }
    return "rgb(" + color.join(',') + ")";
}

  // Calls API to get current building data - initializes with electric
  async getBuildingData(utilitySelected) {
    try {
      let polygons = buildings.map((building) => {
        // Call API for building colors
        var color = this.determineBuildingColor(building.name, utilitySelected)
        // if no data avaiable, set buildings to light blue
        if (color == 'lightgrey') {
          outline = 'blue'
        } else {
          outline = color
        }

        return {
          item: building,
          coordinates: building.coordinates,
          name: building.name,
          // colorBuilding: this.determineBuildingColor(building.name, utilitySelected),
          colorBuilding: color,
          colorOutline: outline,
          marker_coordinate: building.marker_coordinate,
          usage: getCurrentBuildingUtilityConsumption(building.name, utilitySelected).toFixed(1) // used in determineBuildingColor - best way to avoid redundancy?
        }
      });
      this.setState({polygons: polygons});
      return polygons;
    } catch(error) {
        var introStr = "Error getting building data: \n"
        alert(introStr.concat(error))
    }
  };

  // getNormalizationData() {
  //   try {
  //     let normalization = buildings.reduce(function(map, building) {
  //       map[building.name] = building.normalization;
  //       return map;
  //     }, {});
  //     //console.log("Normalization: ", normalization)
  //     this.setState({buildings_info: normalization})
  //     var keys = Object.keys(this.state.buildings_info)
  //   } catch(error) {
  //       var introStr = "This is embarrassing...: "
  //       alert(introStr.concat(error))
  //   }
  // };


  // Show callout when building polygon is pressed
  toggleCallout(polygon) {
    this.setState({lastBuildingPressed: polygon.name})

    if (polygon.open) {
      polygon.marker.hideCallout();
    } else {
      polygon.marker.showCallout();
    }

    polygon.open = !polygon.open;
  };

  round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  };

  // Close open callout upon user zoom
  checkCalloutRender(region) {
    //console.log("New region: ", this.round(region.latitudeDelta, 5))
    //console.log("State region: ", this.round(this.state.region.latitudeDelta, 5))
    if (this.round(region.latitudeDelta, 5) != this.round(this.state.region.latitudeDelta, 5)) {
      this.state.polygons.map((polygon) => {
        if (polygon.open) {
          this.toggleCallout(polygon)
        }
      })
    }
  };

  moveMaptoLocation(latlng) {
    this.refs.map.animateToRegion({
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      ...latlng,
    }, 10);
  };

  // CURRENTLY BROKEN AS OF 1/25/18: error in React framework 
  setBoundaries() {
    this.refs.map.setMapBoundaries(
      {
        latitude: 44.4592961807,
        longitude: -93.15502781429046
      }, {
        latitude: 44.4592961807,
        longitude: -93.15502781429046
      });
  };


  render() {
    navigation = this.props.navigation;
    utilityNameShown = this.state.utilityNameShown;
    mapLoading = this.state.mapLoading;
    const { refresh, loading, historicalData, currentData } = this.props; // redux
    isMapReady = false; // fix for Android latLang error

    return (
      <View style={styles.container}>
        <MapView
          //maxZoomLevel={5} // max in terms of how far IN you can zoon
          ref="map"
          provider = { PROVIDER_GOOGLE } // show buildings on OS
          key={utilityNameShown} // key change needed to rerender map
          showsTraffic={false}
          showsCompass={false}
          initialRegion={initialRegion}
          onMapReady={this.onMapReady}
          onLayout={this.onMapReady}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          displayUtility={utilityNameShown}
          style={styles.map}
          >
            {isMapReady = true}
            {isMapReady && this.state.polygons.map((polygon, index) => (
              /* Renders polygons from list */
              <View key={polygon.name}>
                <Polygon
                  tappable={true} // enables onPress - default is false on iOS
                  coordinates={polygon.coordinates}
                  
                  // sets color + fill + width
                  strokeWidth={2}
                  strokeColor={polygon.colorOutline}
                  fillColor={polygon.colorBuilding}
                  onPress={() => this.toggleCallout(polygon)}
                  />
                  { (Platform.OS === 'ios') ?
                    <Marker
                     ref={ref => polygon.marker = ref}
                     coordinate={polygon.marker_coordinate}
                     opacity={0} // hides markers at 0
                     key={polygon.name}
                    >
                      <Image
                        source={require('./../assets/mapMarker.png')}
                        style={{ height:1, width:1 }}
                      />
                      <Callout
                        tooltip // enables customizable tooltip style
                        style={styles.callout}
                        onPress={() => navigation.navigate('EnergyBuildingView', {item:polygon.item, selected: this.state.utilityIndexShown })}>
                        <MapCallout
                          name={polygon.name}
                          image={'image'} // to be replaced with building image
                          number={polygon.usage}
                          utility={utilityNameShown}/>
                      </Callout>
                    </Marker>
                  :
                    <Marker
                     ref={ref => polygon.marker = ref}
                     coordinate={polygon.marker_coordinate}
                     opacity={0} // hides markers at 0
                     key={polygon.name}

                     title={polygon.name}
                     description={polygon.usage + ' ' + getUnits(utilityNameShown)}
                     onCalloutPress={() => navigation.navigate(
                       'EnergyBuildingView', 
                       {item:polygon.item, selected: this.state.utilityIndexShown })}
                    >
                      <Image
                        source={require('./../assets/mapMarker.png')}
                        style={{ height:1, width:1 }}
                      />
                    </Marker>
                  }
              </View>
            ))}
        </MapView>
        <View style={styles.rightSwipeHack}></View>
        <EnergyMapTimestamp />
        <TouchableOpacity
          // Button to go back to home location
          style={styles.homeButton}
          onPress={() => this.moveMaptoLocation(initialRegion)}>
          <Icon
            // see: https://react-native-training.github.io/react-native-elements/API/icons/
            name='home'
            color='white'
            type='material-community'
          />
        </TouchableOpacity>
        <TopUtilities
          // top utilities
          onUtilitySelect={this.updateUtility}
          selected={this.state.utilityNameShown} />
        {this.state.mapLoading && <View style={styles.loading} accessibe={false}>
          <ActivityIndicator
            size='large'
            color='#0000ff'
            animating={this.state.mapLoading} />
        </View>
        }
      </View>
    );
  }
}


// Fix double navigation bug in stack
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;

    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

// Stack of EnergyMap
const EnergyMapViewStack = StackNavigator({
  EnergyMapView: {
    screen: EnergyMapView,
     transitionConfig: () => ({
      // disable animation
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      }
    }),
    navigationOptions: ({ navigation }) => ({
      title: "Energy Map",
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#0B5091'},
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
      ...Platform.select({
          android: { header: null }
      }),
    })
  },
  EnergyBuildingView: {
    screen: IndividualBuilding,
    path: 'buildings/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`,
      headerTintColor: 'white',
      headerStyle: navStyles.header,
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
      headerRight: (
         <TouchableOpacity
          style={styles.compareButton}
          // Navigate to comparison screen
          onPress={() => navigation.navigate("Comparison", {item:navigation.state.params.item.name})}>
          <Icon
            // see: https://react-native-training.github.io/react-native-elements/API/icons/
            name='compare-arrows'
            color='white'
            type='material-icons'
            size={30}
          />
        </TouchableOpacity>
      ),
    }), 
  },
  Comparison: {
    screen: BuildingComparison,
    navigationOptions: ({ navigation }) => ({
      ...Platform.select({
          android: { header: null }
      }),
      headerTintColor: 'white',
      headerStyle: navStyles.header,
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
    }),
  },
  ComparisonPage: {
    screen: ComparisonPage,
    navigationOptions: ({ navigation }) => ({
        title: 'Comparison',
        ...Platform.select({
            android: { header: null }
        }),
        headerTintColor: 'white',
        headerStyle: navStyles.header,
        headerTitleStyle: navStyles.headerTitle,
        headerBackTitleStyle: navStyles.headerTitle,
        headerBackTitle: 'Back',
    }),
  },
});

EnergyMapViewStack.router.getStateForAction = navigateOnce(EnergyMapViewStack.router.getStateForAction);

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
    headerTitle: {
        fontFamily: theme.font,
    }
})

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...Platform.select({
      ios: { ...StyleSheet.absoluteFillObject },
      android: {
        flex: 1,
        //...StyleSheet.absoluteFillObject,
        height: screenHeight,
        width: screenWidth,
      },
    }),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rightSwipeHack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: Dimensions.get('window').width - 20,
    left: 0,
    backgroundColor: 'transparent'
  },
  callout: {
    flex: 1,
    position: 'relative'
  },
  homeButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0B5091',
    borderColor: 'red',
    margin: 10,
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 5,
    justifyContent: 'center'
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  },
  compareButton: {
    marginRight: 10
  }
});

export default EnergyMapViewStack;