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
import DefaultTheme from './../styling/DefaultTheme.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const theme = GetStyle();

class BuildingListView extends Component {
  renderHeader = (headerItem) => {
    return <Text style={[themeStyles.container, styles.header]}>{headerItem.section.name}</Text>
  }

  renderItem = (item) => {
    return <View style={[theme.card, styles.card, styles.card]}>
        <Text style={styles.header}>{item.item.name}</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#e1e8ee', marginTop: '1%' }}/>
        <View style={[styles.outerView, styles.innerView]}>
            <Image
            style={styles.image} source={{uri: item.item.avatar}}/>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={styles.text}><FontAwesome name="lightbulb-o" size={moderateScale(16)} color="#0B5091" />: {item.item.electricity}</Text>
                <Text style={styles.text}><FontAwesome name="shower" size={moderateScale(16)} color="#0B5091" />: {item.item.water}</Text>
                <Text style={styles.text}><FontAwesome name="fire" size={moderateScale(16)} color="#0B5091" />: {item.item.heat}</Text>
            </View>
            <Button
                rightIcon={{name: "angle-right", type: 'font-awesome', size: moderateScale(20)}}
                fontSize={moderateScale(14)}
                title='More Info'
                style={{paddingBottom:20}}
                backgroundColor='#0B5091'
                onPress={() => this.props.navigation.navigate('BuildingCardView', {item:item.item})}/>
        </View>
      </View>
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={{paddingTop:'3%'}}>
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
  img: {
    alignSelf: 'stretch',
    height: 100,
      marginTop: 0,
      marginLeft: 6,
      marginRight: 6,
      paddingLeft: 5,
      paddingRight: 5,
  },
  text: {
      alignSelf: 'flex-start',
      marginLeft: 5,
      fontSize: moderateScale(16),
      color: 'darkslategrey',
  },
  header: {
      fontSize: moderateScale(18),
      color:'darkslategrey',
      paddingLeft: 3,
      backgroundColor: 'white',
//      fontWeight: 'bold',
      alignSelf: 'flex-start',
  },
  image: {
      alignItems:'center',
      width:75,
  },
  outerView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white'
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
