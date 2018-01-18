import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { List, Card, Button } from 'react-native-elements'

import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import Graph from './../visualizations/Graph'


export default class OverviewCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'day',
        };
    }

    getGraphScope = () => {
        if (this.state.view == 'day') {
            return navigation.state.params.data.day;
        } else if (this.state.view == 'week') {
            return navigation.state.params.data.month;
        } else if (this.state.view == 'month') {
            return navigation.state.params.data.week;
        } else if (this.state.view == 'year') {
             return navigation.state.params.data.year;
        }
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        navigation = this.props.navigation;
        data = this.getGraphScope();

        return (
            <View style={[styles.container, themeStyles.listColoring]}>
            <View style={styles.flexbox}>
            <Button
                fontSize={10}
                title='D'
                borderRadius={10}
                backgroundColor={this.state.view == 'day' ? '#4d86f7' : '#9E9E9E'}
                style={styles.button}
                onPress={()=> this.setState({ view: 'day' })}
            />
            <Button
                fontSize={10}
                title='W'
                borderRadius={10}
                backgroundColor={this.state.view == 'week' ? '#4d86f7' : '#9E9E9E'}
                style={styles.button}
                onPress={()=> this.setState({ view: 'week' })}
            />
            <Button
                fontSize={10}
                title='M'
                borderRadius={10}
                backgroundColor={this.state.view == 'month' ? '#4d86f7' : '#9E9E9E'}
                style={styles.button}
                onPress={()=> this.setState({ view: 'month' })}
            />
            <Button
                fontSize={10}
                title='Y'
                borderRadius={10}
                backgroundColor={this.state.view == 'year' ? '#4d86f7' : '#9E9E9E'}
                style={styles.button}
                onPress={()=> this.setState({ view: 'year' })}
            />
            </View>

            <Graph
                type={navigation.state.params.graphType}
                graphData={data}/>
            <Text> {this.state.view} </Text>
            </View>
            );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1.0,
      justifyContent: 'center',
      alignItems: 'center',
  },
  flexbox: {
    marginTop: -50,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginRight: '3%',
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
    paddingTop: 0,
  },
})
