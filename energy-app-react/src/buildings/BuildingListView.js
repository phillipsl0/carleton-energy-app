import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, Dimensions, ScrollView,
  View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar, Header, Icon } from 'react-native-elements';

import buildings from './Buildings';
import IndividualBuilding from './IndividualBuilding';
import ComparisonPage from './ComparisonPage';
import BuildingComparison from './BuildingComparison';
import { getCurrentBuildingUtilityConsumption } from './../helpers/ApiWrappers.js';

import { scale, moderateScale, verticalScale} from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes'

const theme = GetStyle();

class BuildingListView extends Component {
  renderHeader = (headerItem) => {
    return <Text style={styles.header}>{headerItem.section.name}</Text>
  }

  renderItem = (item) => {
    return <View style={[theme.card, styles.card, {marginTop: '3%'}]}>
        <Text style={styles.header}>{item.item.name}</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#e1e8ee', marginTop: '1%' }}/>
        <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}, styles.innerView]}>
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
      <ScrollView>
        <FlatList
            data = {buildings}
            renderItem={this.renderItem}
            keyExtractor = {(item) => item.name}

        />
      </ScrollView>
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

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
    headerTitle: {
            fontFamily: theme.font,
    }
})

const BuildingStack = StackNavigator({
  BuildingsListView: {
      screen: BuildingListView,
      navigationOptions: ({ navigation }) => ({
        title: 'Buildings',
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
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
    }), 
  },
  Comparison: {
    screen: BuildingComparison,
    navigationOptions: ({ navigation }) => ({
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
      headerTintColor: 'white',
      headerStyle: navStyles.header,
      headerTitleStyle: navStyles.headerTitle,
      headerBackTitleStyle: navStyles.headerTitle,
      headerBackTitle: 'Back',
    }),
  },
});

BuildingStack.router.getStateForAction = navigateOnce(BuildingStack.router.getStateForAction);

const styles = StyleSheet.create({
  card: {
    marginTop: 3, 
    marginBottom: 6,
    marginLeft: 6, 
    marginRight: 6, 
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    borderColor:'#e1e8ee',
    borderWidth: 1,
    ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, .9)',
          },})
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
    borderColor:'#e1e8ee',
    borderWidth: 1,
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
//      fontWeight: 'bold',
      alignSelf: 'flex-start',
  },
  compareButton: {
    marginRight: 10
  },
  innerView: {
//    borderTopColor: '#e1e8ee',
//    borderTopWidth: 1,
//    borderBottomColor: '#e1e8ee' ,
//    borderBottomWidth: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: '2%',
    paddingBottom: '2%',
    marginTop: '1%',
  }
})

export default BuildingStack;
