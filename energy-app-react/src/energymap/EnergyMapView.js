import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Polygon, Callout, Marker } from 'react-native-maps';

import MapCallout from './MapCallout';
import OverviewCards from './../overview/OverviewCards';
import buildings from './../Buildings'
import { getCurrentBuildingUtilityConsumption, getUtilitiesList } from './../helpers/ApiWrappers.js';
import TopUtilities from './UtilityButtons';
import EnergyMapTimestamp from './EnergyMapTimestamp';

const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
var {screen_height, screen_width} = Dimensions.get('window');

/*
Using tutorials:
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
Polygon onPress: https://snack.expo.io/H1L9ClUGW
Animated region with scroll cards: https://codedaily.io/tutorials/9/Build-a-Map-with-Custom-Animated-Markers-and-Region-Focus-when-Content-is-Scrolled-in-React-Native
Cool native app: https://themeteorchef.com/tutorials/how-to-build-a-react-native-app-with-meteor
Get lat/long: http://www.mapcoordinates.net/en
*/

// ** if want to use user's location, set up geolocation in componentWillMount(): https://school.shoutem.com/lectures/geolocation-app-react-native/

const initialRegion = {
  latitude: 44.4606925434,
  longitude: -93.1533574685,
  latitudeDelta: 0.005223853, //0.00475503 > 0.003861 previously
  longitudeDelta: 0.0086313486, //0.004325397 > 0.003916 previously
}

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
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Cassat": {
          "electricity": {
            "max": 40469,
            "min": 3137,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Davis": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Evans": {
          "electricity": {
            "max": 47703,
            "min": 3228,
          },
          "water": {
            "max": 316880,
            "min": 4232,
          },
        },
        "Goodhue": {
          "electricity": {
            "max": 38955,
            "min": 2427,
          },
          "water": {
            "max": 285100,
            "min": 3200,
          },
        },
        "Memo": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Musser": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Myers": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Nourse": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Sayles": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Scoville": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Severance": {
          "electricity": {
            "max": 21664,
            "min": 1334,
          },
          "water": {
            "max": 47243177,
            "min": 18784,
          },
        },
        "Watson": {
          "electricity": {
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
      northEast: {
        latitude: 44.462039722138684,
        longitude: -93.1505049392581
      },
      southWest: {
        latitude: 44.4592961807,
        longitude: -93.15502781429046
      },
      ready: true,
      utilityShown: 'electricity',
      loading: true
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  };

  // Assemble all of Carleton's buildings BEFORE rendering
  componentWillMount() {
    //this.getNormalizationData();
    this.getBuildingData();
    this.moveToCarleton();
    // this.refs.map.setMapBoundaries(this.state.northEast, this.state.southWest);
    //console.log('EnergyMapView component is mounting...');
    this.closeActivityIndicator();
  };

  openActivityIndicator() {
    this.setState({ loading: true });
  };

  // Closes activity indicator with 2 second delay after call
  closeActivityIndicator() {
    setTimeout(() => this.setState({
      loading: false }), 2000);
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
  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };

  // Updates colors of energy map with new utility selection
  updateUtility = (utilitySelected) => {
    // Begin to update map
    this.openActivityIndicator();
    this.setState({ utilityShown: utilitySelected});
    
    // Update map
    this.getBuildingData();
    this.moveToCarleton();
    this.closeActivityIndicator();
    //{this.props.navigation.setParams({ updated: "Updating time stamp..." })}
  };

  onRegionChange = (region) => {
    //this.setState({ region: region })
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
  determineBuildingColor(buildingName) {
    //console.log("Rendering building colors with: ", this.state.utilityShown)
    var use = getCurrentBuildingUtilityConsumption(buildingName, this.state.utilityShown).toFixed(1)
    //var h = (1.0 - use) * 240
    var building = this.state.buildings_info
    building = building[buildingName][this.state.utilityShown]
    var val = Math.abs(1 - ((use - building.min) / (building.max - building.min))) // taken from https://stats.stackexchange.com/questions/70801/how-to-normalize-data-to-0-1-range
    //console.log("Normalizing " + buildingName, val)
    var h = val * 85 // taken from: https://stackoverflow.com/questions/6660879/python-map-float-range-0-0-1-0-to-color-range-red-green
    //return "hsl(" + h + ", 100%, 50%)";

    return this.setColor(val);
  };

  // taken from: https://ux.stackexchange.com/questions/34875/how-to-translate-a-rating-range-into-red-yellow-green-colours
  // Generates color from normalization of 0 to 10 scale
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

  // Get current building data
  async getBuildingData() {
    try {
      let polygons = buildings.map((building) => {
        return {
          coordinates: building.coordinates,
          name: building.name,
          color: this.determineBuildingColor(building.name),
          marker_coordinate: building.marker_coordinate,
          usage: getCurrentBuildingUtilityConsumption(building.name, this.state.utilityShown).toFixed(1) // used in determineBuildingColor - best way to avoid redundancy?
        }
      });
      this.setState({polygons: polygons});
      return polygons;
    } catch(error) {
        var introStr = "This is embarrassing... \n"
        alert(introStr.concat(error))
    }
  };

  getNormalizationData() {
    try {
      let normalization = buildings.reduce(function(map, building) {
        map[building.name] = building.normalization;
        return map;
      }, {});
      //console.log("Normalization: ", normalization)
      this.setState({buildings_info: normalization})
      var keys = Object.keys(this.state.buildings_info)
    } catch(error) {
        var introStr = "This is embarrassing...: "
        alert(introStr.concat(error))
    }
  };


  // Show callout when building polygon is pressed
  toggleCallout(polygon) {
    // console.log('onPress', polygon.name);
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
    utilityShown = this.state.utilityShown
    loading = this.state.loading
    //console.log("Utility displayed before return:", utilityShown)
    //console.log("Loading?", loading)

    return (
      <View style={styles.container}>
        <MapView
          //maxZoomLevel={5} // max in terms of how far IN you can zoon
          ref="map"
          provider = { PROVIDER_GOOGLE } // show buildings on OS
          key={utilityShown} // key change needed to rerender map
          showsTraffic={false}
          initialRegion={initialRegion}
          onMapReady={this.onMapReady}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          toggleCallout={this.toggleCallout}
          displayUtility={utilityShown}
          style={styles.map}
                  

          // set map boundaries, NE by SW
          //setMapBoundaries={ this.setBoundaries }     
          >
            {this.state.polygons.map((polygon, index) => (
              /* Renders polygons from list */
              <View key={polygon.name}>
                <Polygon
                  tappable={true} // enables onPress - default is false on iOS
                  coordinates={polygon.coordinates}
                  
                  // sets color + fill + width
                  strokeWidth={5}
                  strokeColor={polygon.color}
                  fillColor={polygon.color}
                 
                  onPress={() => this.toggleCallout(polygon)}
                />
                  <Marker
                   ref={ref => polygon.marker = ref}
                   coordinate={polygon.marker_coordinate}
                   opacity={4} // hides markers at 0
                   key={polygon.name}
                  >
                    <Image
                      source={require('./../assets/mapMarker.png')}
                      style={{ height:1, width:1 }}
                    />
                    <Callout
                      tooltip // enables customizable tooltip style
                      style={styles.callout}
                      onPress={() => navigation.navigate('EnergyBuildingView', {item:polygon})}>
                      <MapCallout
                        name={polygon.name}
                        image={'image'} // to be replaced with building image
                        number={polygon.usage}
                        utility={utilityShown}/>
                    </Callout>
                  </Marker>
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
          selected={this.state.utilityShown} />
        {this.state.loading && <View style={styles.loading} accessibe={false}>
          <ActivityIndicator
            size='large'
            color='#0000ff'
            animating={this.state.loading} />
        </View>
        }
      </View>
    );
  }
}

/*
      {this.state.loading && 
        <View style=styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      }
        <Text style={{ position: 'absolute', bottom: 10 }}>
          Latitude: {this.state.region.latitude}{'\n'}
          Longitude: {this.state.region.longitude}{'\n'}
          LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
          LongitudeDelta: {this.state.region.longitudeDelta}{'\n'}
          Last Building Pressed: {this.state.lastBuildingPressed}
        </Text>
*/


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
    // navigationOptions: ({ navigation, updated }) => ({
    //   headerTitle: <EnergyMapHeader/>,
    //   headerStyle: {backgroundColor: '#0B5091'},
    //   ...Platform.select({
    //       android: { header: null }
    //   }),
    // })
    navigationOptions: ({ navigation }) => ({
      title: "Energy Map",
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#0B5091'},
      ...Platform.select({
          android: { header: null }
      }),
    })
  },
  EnergyBuildingView: {
    screen: OverviewCards,
    path: 'buildings/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#0B5091'},
    }),
  },
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screen_width,
    height: screen_height
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
  }
});

export default EnergyMapViewStack;