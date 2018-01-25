import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Polygon, Callout, Marker } from 'react-native-maps';

import MapCallout from './MapCallout';
import IndividualBuilding from './../IndividualBuilding'
import buildings from './../Buildings'
import { getCurrentBuildingUtilityConsumption } from './../helpers/ApiWrappers.js';


/*
Google API Key:
AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI 
*/
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

class HeatMapView extends Component {
  constructor(props) {
    super(props);
    
    // Turn fixed regions into state
    // Get drawn polygon coordinates: http://www.birdtheme.org/useful/v3tool.html
    // Get exact point lat/long: http://www.mapcoordinates.net/en
    this.state = {
      lastBuildingPressed: "No buildings have been pressed",
      polygons: [],
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
      ready: true
    };
    //this.onRegionChange = this.onRegionChange.bind(this);
    // this.setMapBoundaries = this.setMapBoundaries.bind(this) ({latitude: 44.4592961807, longitude: -93.15502781429046}, {latitude: 44.4592961807, longitude: -93.15502781429046});
  }

  // Assemble all of Carleton's buildings
  componentDidMount() {
    this.getBuildingData();
    this.moveToCarleton();
    // this.refs.map.setMapBoundaries(this.state.northEast, this.state.southWest);
    console.log('Component did mount');
  }

  setRegion(region) {
    if(this.state.ready) {
      setTimeout(() => this.refs.map.animateToRegion(region), 1);
    }
  }

  moveToCarleton() {
    this.setRegion(this.state.region);
  }

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };

  // Algorithm to generate CSS hsl color code from [0, 1] value
  determineBuildingColor(buildingName) {
    var use = getCurrentBuildingUtilityConsumption(buildingName, "water").toFixed(1)
    console.log(buildingName, use)
    // algorithm based on 5 color heatmap: https://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
    var h = (1.0 - use) * 240
    return "hsl(" + h + ", 100%, 50%)";
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
          usage: getCurrentBuildingUtilityConsumption(building.name, "water").toFixed(1) // used in determineBuildingColor - best way to avoid redundancy?
        }
      })
      this.setState({polygons: polygons})
      return polygons
    } catch(error) {
      var introStr = "This is embarrassing...: "
      alert(introStr.concat(error))
    }
  }


  // Show callout when building polygon is pressed
  toggleCallout(polygon) {
    console.log('onPress', polygon.name);
    this.setState({lastBuildingPressed: polygon.name})

    if (polygon.open) {
      polygon.marker.hideCallout();
    } else {
      polygon.marker.showCallout();
    }

    polygon.open = !polygon.open;
  }

  moveMaptoLocation(latlng) {
    this.refs.map.animateToRegion({
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      ...latlng,
    }, 3000);
  }

  setBoundaries() {
    this.refs.map.setMapBoundaries(
      {
        latitude: 44.4592961807,
        longitude: -93.15502781429046
      }, {
        latitude: 44.4592961807,
        longitude: -93.15502781429046
      });
    //this.refs.mapsetMapBoundaries({latitude: 44.4592961807, longitude: -93.15502781429046}, {latitude: 44.4592961807, longitude: -93.15502781429046});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          provider = { PROVIDER_GOOGLE } // show buildings on OS
          showsTraffic={false}
          initialRegion={initialRegion}
          onMapReady={this.onMapReady}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}


          //control zooming
          minZoomLevel={0}
          maxZoomLevel={5}
          
          // show loading indicator while map loads
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          

          // set map boundaries, NE by SW
          setMapBoundaries={ this.setBoundaries }       
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
                      onPress={() => this.props.navigation.navigate('HeatBuildingView', {item:polygon})}>

                      <MapCallout
                        name={polygon.name}
                        image={'image'} // to be replaced with building image
                        number={polygon.usage}/>

                    </Callout>
                  </Marker>
              </View>
            ))}
        </MapView>
        <TouchableOpacity style={styles.button}
          onPress={() => this.setBoundaries()}>
          <Text> Button </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
/*
        <TouchableOpacity style={styles.button}
          onPress={() => this.setBoundaries()}>
          <Text> Button </Text>
        </TouchableOpacity>


        <Text style={{ position: 'absolute', bottom: 10 }}>
          Latitude: {this.state.region.latitude}{'\n'}
          Longitude: {this.state.region.longitude}{'\n'}
          LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
          LongitudeDelta: {this.state.region.longitudeDelta}{'\n'}
          Last Building Pressed: {this.state.lastBuildingPressed}
        </Text>
*/

// Stack of HeatMap
const HeatMapStack = StackNavigator({
  HeatMapView: {
    screen: HeatMapView,
    navigationOptions: ({ navigation }) => ({
      title: "Heat Map",
      headerTintColor: 'white',
      headerStyle: navStyles.header,
    })
  },
  HeatBuildingView: {
    screen: IndividualBuilding,
    path: 'buildings/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`,
      headerTintColor: 'white',
      headerStyle: navStyles.header,
    }),
  },
});

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    }
})

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderColor: 'red',
    margin: 10,
  },
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
    bottom: 125, // was 300
    //width: screen_width,
    //height: screen_height
  },
  callout: {
    flex: 1,
    position: 'relative'
  }
});

export default HeatMapStack;