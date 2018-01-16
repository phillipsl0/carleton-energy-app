import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform, ScrollView } from 'react-native'
import { List, Card, Button } from 'react-native-elements'
import { VictoryTheme } from 'victory-native'
import { LinearGradient } from 'expo';

import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import Graph from './../visualizations/Graph'
import { default as CustomThemes } from './../visualizations/GraphThemes'


export default class OverviewCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'day',
            viewNumber: 7,
        };
    }

    getGraphScope = () => {
        if (this.state.view == 'day') {
            return navigation.state.params.data.day.graph;
        } else if (this.state.view == 'week') {
            return navigation.state.params.data.month.graph;
        } else if (this.state.view == 'month') {
            return navigation.state.params.data.week.graph;
        } else if (this.state.view == 'year') {
             return navigation.state.params.data.year.graph;
        }
    }

    getRanking = () => {
        if (this.state.view == 'day') {
            return navigation.state.params.data.day.ranking;
        } else if (this.state.view == 'week') {
            return navigation.state.params.data.month.ranking;
        } else if (this.state.view == 'month') {
            return navigation.state.params.data.week.ranking;
        } else if (this.state.view == 'year') {
             return navigation.state.params.data.year.ranking;
        }
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        navigation = this.props.navigation;
        data = this.getGraphScope();
        ranking = this.getRanking();

        return (
            <View style={[styles.container, themeStyles.listColoring]}>
             <ScrollView style={styles.contentContainer}>
             <LinearGradient
                styles={styles.linearGradient}
                colors={['#4372A0', '#2B5E90']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 600,
                  }}>
             </LinearGradient>
             <View style={styles.textContainer}>
                <Text style={styles.number}> {ranking} </Text>
                <Text style={styles.words}>
                    in energy use compared to the past {this.state.viewNumber} {this.state.view}s</Text>
                <View style={styles.graphContainer}>
                <Graph
                    theme={CustomThemes.white}
                    type={navigation.state.params.graphType}
                    graphData={data}/>
                </View>
             </View>
             <View style={styles.flexbox}>
             <Button
                 fontSize={10}
                 title='D'
                 borderRadius={10}
                 color={this.state.view == 'day' ? 'white' : '#9E9E9E'}
                 backgroundColor={this.state.view == 'day' ? '#0B5091' : 'white'}
                 style={styles.button}
                 onPress={()=> this.setState({ view: 'day', viewNumber: 7 })}
             />
             <Button
                 fontSize={10}
                 title='W'
                 borderRadius={10}
                 color={this.state.view == 'week' ? 'white' : '#9E9E9E'}
                 backgroundColor={this.state.view == 'week' ? '#0B5091' : 'white'}
                 style={styles.button}
                 onPress={()=> this.setState({ view: 'week', viewNumber: 4 })}
             />
             <Button
                 fontSize={10}
                 title='M'
                 borderRadius={10}
                 color={this.state.view == 'month' ? 'white' : '#9E9E9E'}
                 backgroundColor={this.state.view == 'month' ? '#0B5091' : 'white'}
                 style={styles.button}
                 onPress={()=> this.setState({ view: 'month', viewNumber: 12 })}
             />
             <Button
                 fontSize={10}
                 title='Y'
                 borderRadius={10}
                 color={this.state.view == 'year' ? 'white' : '#9E9E9E'}
                 backgroundColor={this.state.view == 'year' ? '#0B5091' : 'white'}
                 style={styles.button}
                 onPress={()=> this.setState({ view: 'year', viewNumber: 5 })}
             />

             </View>
             </ScrollView>
             </View>

            );
    }
}

const styles = StyleSheet.create({
  number: {
    color: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    fontSize: 100,
  },
  words: {
      color: 'rgba(255, 255, 255, 0.5)',
      backgroundColor: 'transparent',
      fontSize: 16,
    },
  linearGradient: {
    flex: 1,
    paddingBottom: 200,
    ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, .9)',
            shadowOffset: {height: 100, width: 0},
            shadowOpacity: 1,
            shadowRadius: 1
          },})
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: '5%',
      marginBottom: '5%',
      marginLeft: '10%',
      marginRight: '10%',
      borderRadius: 10,
    },
  contentContainer: {
    flex: 1,
    marginTop: 0,
  },
  container: {
      flex: 1.0,
  },
  flexbox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1.0,
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  list: {
      flex: 1,
      marginLeft: '3%',
      marginRight: '3%',
  },
  button: {
  },
})
