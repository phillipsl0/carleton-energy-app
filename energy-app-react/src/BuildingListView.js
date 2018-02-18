import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, Dimensions,
  View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar, Header, Icon } from 'react-native-elements';

import buildings from './Buildings';
import IndividualBuilding from './IndividualBuilding';
import ComparisonPage from './ComparisonPage';
import BuildingComparison from './BuildingComparison';
// import SelectStack from './IndividualBuilding';
import { getCurrentBuildingUtilityConsumption } from './helpers/ApiWrappers.js';

import { scale, moderateScale, verticalScale} from './helpers/Scaling';
import { GetStyle } from './styling/Themes'

const themeStyles = GetStyle();

class BuildingListView extends Component {
  renderHeader = (headerItem) => {
    return <Text style={styles.header}>{headerItem.section.name}</Text>
  }

  renderItem = (item) => {
    return <View style={[themeStyles.card, themeStyles.shadowed, styles.card]}>
        <Text style={styles.header}>{item.item.name}</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white',}}>
            <Image
            style={{alignItems:'center', width:75, borderColor:'white', borderWidth:1, marginBottom:3, marginLeft:3}} source={{uri: item.item.avatar}}/>
            <View style={{flex: 1, flexDirection: 'column', paddingTop:'2%'}}>
                <Text style={styles.text}>Electricity: {item.item.electricity}</Text>
                <Text style={styles.text}>Water: {item.item.water}</Text>
                <Text style={styles.text}>Heat: {item.item.heat}</Text>
            </View>
            <Button
                rightIcon={{name: "angle-right", type: 'font-awesome', size: moderateScale(20)}}
                fontSize={moderateScale(14)}
                title='More Info'
                style={{paddingBottom:20}}
                containerViewStyle={styles.button}
                backgroundColor='#0B5091'
                onPress={() => this.props.navigation.navigate('BuildingCardView', {item:item.item})}/>
        </View>
      </View>
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={{paddingTop:8}} />
        <FlatList
            data = {buildings}
            renderItem={this.renderItem}
            keyExtractor = {(item) => item.name}
        />
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

const BuildingStack = StackNavigator({
  Buildings: {
      screen: BuildingListView,
      navigationOptions: ({ navigation }) => ({
          title: 'Buildings',
          ...Platform.select({
              android: { header: null }
          }),
          headerTintColor: 'white',
          headerStyle: navStyles.header,
      }),
  },
  BuildingCardView: {
    screen: IndividualBuilding,
    path: 'buildings/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`,
      headerTintColor: 'white',
      headerStyle: navStyles.header,
      headerRight: (
         <TouchableOpacity
          // UPDATE ENERGYMAPVIEW IF CHANGE
          // Navigate to comparison scree
          style={styles.compareButton}
          onPress={() => navigation.navigate("Comparison")}>
          <Icon
            // see: https://react-native-training.github.io/react-native-elements/API/icons/
            name='compare-arrows'
            color='white'
            type='material-icons'
            size={30}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
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
    }),
  },
});

BuildingStack.router.getStateForAction = navigateOnce(BuildingStack.router.getStateForAction);

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

const styles = StyleSheet.create({
  card: {
    marginTop: 0, 
    marginLeft: 6, 
    marginRight: 6, 
    paddingLeft: 5,
    paddingRight: 5,
    // borderWidth: 1, 
    // borderColor:'#cbd2d9', 
    // borderRadius:3, 
    // backgroundColor:'white'
  },
  // card: {
  //   paddingTop: 20,
  // },
  head: {
      backgroundColor: 'grey',
    },
  table: {
    width: 250,
    marginLeft: 5,

  },
  text: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: moderateScale(16),
    color: 'darkslategrey',
  },
  listItem: {
    height: 50,
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 0, //300,
    marginLeft: '25%',
    marginRight: '25%',
    alignSelf: 'center',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 20,
    // color: 'silver'
    // paddingBottom: 55,
  },
  subtitleText: {
    paddingTop: 5,
    paddingRight: 40,
    paddingLeft: 20,
    color: 'silver',
    fontSize: 15
  },
  listImg: {
    height: 30,
    alignSelf: 'stretch',
  },
  listText: {
    paddingLeft: 30,
    marginLeft: 30,
    fontSize: 24,
  },
  row: {
    backgroundColor: 'orange',
  },
  button: {
    marginTop: '3%',

  },
  view: {
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
  header: {
      fontSize: moderateScale(18),
      color:'darkslategrey',
      paddingLeft: 3,
      backgroundColor: 'white',
      fontWeight: 'bold',
      alignSelf: 'flex-start',
  },
  compareButton: {
    marginRight: 10
  }
})

export default BuildingStack;
