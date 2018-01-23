import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Dimensions, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Polygon, Callout, Marker } from 'react-native-maps';
import MapCallout from './MapCallout';
import IndividualBuilding from './../IndividualBuilding'
import buildings from './../Buildings'

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
      }
    };
    // Holder for previous state to help control scrolling
    // this.prev_state = {
    //   region: {
    //     // Carleton's coordinates
    //     latitude: 44.4606925434,
    //     longitude: -93.1533574685,
    //     latitudeDelta: 0.005223853, //0.00475503 > 0.003861 previously
    //     longitudeDelta: 0.0086313486, //0.004325397 > 0.003916 previously
    //   }
    // }
    //this.onRegionChange = this.onRegionChange.bind(this);
  }

  // Assemble all of Carleton's buildings
  componentDidMount() {
    this.getBuildingData()
  }


  // Get current building data
  async getBuildingData() {
    try {
      let polygons = buildings.map((building) => {
        return {
          coordinates: building.coordinates,
          name: building.name,
          color: building.color,
          marker_coordinate: building.marker_coordinate
        }
      })
      this.setState({polygons: polygons})
      return polygons
    } catch(error) {
      alert("This is embarrassing...:" + error)
    }
  }


  // Called when location/zoom are changed with new location/zoom
  onRegionChange(region) {
    // Check to make sure region is within bounds of Carleton
    if (((region.latitude <= 44.46316089) && (region.latitude >= 44.45690153)) && ((region.longitude <= -93.14903207) && (region.longitude >= -93.15727215))) {
      this.setState({ region });
      // Update region if within bounds
      this.prev_state.region = region;
    // If user scrolls beyond Carleton's region, revert back to previous state
    } else {
      this.setState(this.prev_state.region);
    }
  }


  // Called when a polygon is pressed
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

  static navigationOptions = {
    title: 'HeatMap'
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          provider = { PROVIDER_GOOGLE } // show buildings on OS
          style={styles.map}
          showsTraffic={false}
          //zoomEnabled={false} // stops user from zooming
          
          loadingEnabled // shows loading indicator while map loads
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          
          initialRegion={this.state.region}          
          //onRegionChange={this.onRegionChange}
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
                        image={'image'}
                        number={'90'}/>

                    </Callout>
                  </Marker>
              </View>
            ))}
        </MapView> 
      </View>
    );
  }
}
/*
        <Text style={{ position: 'absolute', bottom: 10 }}>
          Latitude: {this.state.region.latitude}{'\n'}
          Longitude: {this.state.region.longitude}{'\n'}
          LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
          LongitudeDelta: {this.state.region.longitudeDelta}{'\n'}
          Last Building Pressed: {this.state.lastBuildingPressed}
        </Text>
*/


const HeatMapStack = StackNavigator({
  HeatMapView: {
    screen: HeatMapView,
  },
  HeatBuildingView: {
    screen: IndividualBuilding,
    path: 'buildings/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`,
      headerTintColor: 'white',
      headerStyle: styles.header,
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
    bottom: 125, // was 300
    //width: screen_width,
    //height: screen_height
  },
  callout: {
    flex: 1,
    position: 'relative'
  },
  header: {
      backgroundColor: '#0B5091',
  }
});

export default HeatMapStack;