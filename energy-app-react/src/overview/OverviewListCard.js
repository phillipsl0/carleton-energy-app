import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Comparator from './../helpers/Comparators';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { moderateScale, calculateRatio, combineData } from './../helpers/General';

const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        currentData: state.data.currentData,
        loading: state.data.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

export default class OverviewListCard extends Component {
    // Navigate to correct screen based on which card was pressed
    returnScreen = ( item, navigation ) => {
        switch(item.title) {
            case "Wind Turbine Energy":
                navigation.navigate('TurbineView',
                           {graphType:item.graphType, data:item.data, title: item.title});
                break;

            case "Energy Use":
                navigation.navigate('OverviewCardView',
                           {graphType:item.graphType, data:item.data, title: item.title, card: 1});
                break;

            case "Energy Generation":
                navigation.navigate('OverviewCardView',
                           {graphType:item.graphType, data:item.data, title: item.title, card: 2});
                 break;

            default:
                alert("Sorry, this is a fake card for viewing purposes only.");
        }
    }

    // Return different views based on the card type
    returnUnique = (currentData) => {
        item = this.props.cardItem;
        var windRatio = calculateRatio(currentData);

        switch (item.title) {
            case "Wind Turbine Energy":
                return(
                <View style={[theme.container, theme.flexboxRow]}>
                  <View style={[{alignItems: 'center'}]}>

                      <Text style={[ styles.font, { paddingTop: '0%' }]}>
                        Wind energy currently accounts
                      </Text>

                      <Text style={[ styles.font, theme.fontBold]}>
                        for {windRatio["percentage"]}%
                      </Text>

                      <Text style={ styles.font }>
                        of overall energy use.
                      </Text>
                  </View>
                </View>
            );
            break;

            case "Energy Use":
                return(
                    <Graph
                        type={item.graphType}
                        legend={true}
                        theme={CustomThemes.carleton}
                        graphData={currentData.usage}/>
                );
                break;

            case "Energy Generation":
                return(
                    <Graph
                      type={item.graphType}
                      legend={true}
                      theme={CustomThemes.carleton}
                      graphData={currentData.generation}/>
                );
                break;

            case "Comparison Facts":
                return(
                    <Comparator
                       data={currentData.turbine}
                       number={3}/>
                );
            default:
                break;
        }
    }

    render() {
        var item = this.props.cardItem;
        var navigation = this.props.cardNavigation;
        const { refresh, loading, currentData } = this.props;
        var uniquePortion = this.returnUnique(currentData);

        return(
            <Card
             containerStyle={[theme.card, theme.flex]}
             title={item.title}
             titleStyle={styles.title}
             dividerStyle={styles.divider}>

             <TouchableHighlight
                onPress={() => this.returnScreen(item, navigation)}
                underlayColor="transparent">
            <View pointerEvents="none" style={[theme.container, theme.flexboxRow]}>
                {uniquePortion}

                <TouchableHighlight
                    onPress={() => this.returnScreen(item, navigation)}
                    underlayColor="transparent"
                    style={[styles.button, {position: 'absolute', right: 0}]}>

                    <FontAwesome name="angle-right" size={moderateScale(40)} color="#0B5091" />

                </TouchableHighlight>

            </View>
            </TouchableHighlight>

            {item.title === "Energy Use" &&
                <Comparator
                     data={currentData.usage}
                     cardType="use"
                     number={1}/>
            }

            {item.title === "Energy Generation" &&
                <Comparator
                     data={currentData.usage}
                     cardType="generation"
                     number={1}/>
            }
            </Card>

        );

    }
}

//<Svg width={200} style={[{ padding: '26%', overflow: 'hidden' } ]}>
//                   <Image source={require('./../assets/windmill.png')}
//                        style={{ position: 'absolute'}}/>
//                      <Text style={[ styles.font, { paddingTop: '0%' }]}>
//                        Wind energy currently accounts
//                      </Text>
//
//                      <Text style={[ styles.font, theme.fontBold]}>
//                        for {windRatio["percentage"]}%
//                      </Text>
//
//                      <Text style={ styles.font }>
//                        of overall energy use.
//                      </Text>
//                </Svg>
const styles = StyleSheet.create({
  button: {
    marginRight: '3%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },

  card: {
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    marginTop: 10,
    marginBottom: 0,
  },

  divider: {
    marginBottom: 5,
  },

  font: {
    fontSize: moderateScale(12),
    color: '#647C92',
    paddingTop: '1%',
    backgroundColor: 'transparent',
  },

  list: {
      marginLeft: '3%',
      marginRight: '3%',
  },

  title: {
    fontSize: 14,
    marginBottom: 10
  },
})