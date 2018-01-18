import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform,
         TouchableHighlight, ScrollView } from 'react-native'
import { List, Card, Button } from 'react-native-elements'
import { VictoryTheme } from 'victory-native'
import { LinearGradient } from 'expo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
            selectedCard: 1,
        };
    }

    getGraphScope = () => {
        graphData = navigation.state.params.data.comparison;

        if (this.state.view == 'day') {
            return graphData.day.graph;
        } else if (this.state.view == 'week') {
            return graphData.week.graph;
        } else if (this.state.view == 'month') {
            return graphData.month.graph;
        } else if (this.state.view == 'year') {
             return graphData.year.graph;
        }
    }

    getRanking = () => {
        graphData = navigation.state.params.data.comparison;

        if (this.state.view == 'day') {
            return graphData.day.ranking;
        } else if (this.state.view == 'week') {
            return graphData.week.ranking;
        } else if (this.state.view == 'month') {
            return graphData.month.ranking;
        } else if (this.state.view == 'year') {
             return graphData.year.ranking;
        }
    }

    getHeader = () => {
        if (this.state.selectedCard <= 4) {
            ranking = this.getRanking();
            return (
                <View style={styles.textContainer}>
                   <Text style={styles.number}> {ranking} </Text>
                   <Text style={styles.words}>
                       in energy use compared to the past {this.state.viewNumber} {this.state.view}s
                   </Text>
                </View>)
        } else if (this.state.selectedCard == 5) {
            return (
                <View style={styles.textContainer}>
                   <Text style={styles.number}> !!! </Text>
                   <Text style={styles.words}>
                       testing
                   </Text>
                </View>)
        } else if (this.state.selectedCard == 6) {
            return (
                <View style={styles.textContainer}>
                   <Text style={styles.number}> ??? </Text>
                   <Text style={styles.words}>
                       testing
                   </Text>
                </View>)
        } else if (this.state.selectedCard == 7) {
          return (
              <View style={styles.textContainer}>
                 <Text style={styles.number}> WOW </Text>
                 <Text style={styles.words}>
                     testing
                 </Text>
              </View>)
      } else if (this.state.selectedCard == 8) {
          return (
              <View style={styles.textContainer}>
                 <Text style={styles.number}> Test </Text>
                 <Text style={styles.words}>
                     testing
                 </Text>
              </View>)
      }
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        navigation = this.props.navigation;
        data = this.getGraphScope();
        header = this.getHeader();

        return (
            <View style={[styles.container, themeStyles.list]}>
            <Image source={require('./../assets/noskyWindmill.png')} style={styles.image}/>
                <View style={styles.overlay}/>
             {header}
             <ScrollView style={styles.contentContainer}>

                 <View style={styles.singleView}>
                 <View style={styles.graphContainer}>
                     <Graph
                         theme={CustomThemes.carleton}
                         height={300}
                         width={375}
                         type={'scatter'}
                         graphData={data}/>
                 </View>
                 <View style={styles.flexbox}>
                 <Button
                     fontSize={10}
                     title='D'
                     borderRadius={10}
                     color={this.state.selectedCard == 1 ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.selectedCard == 1 ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'day', viewNumber: 7, selectedCard: 1 })}
                 />
                 <Button
                     fontSize={10}
                     title='W'
                     borderRadius={10}
                     color={this.state.selectedCard == 2 ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.selectedCard == 2 ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'week', viewNumber: 4, selectedCard: 2 })}
                 />
                 <Button
                     fontSize={10}
                     title='M'
                     borderRadius={10}
                     color={this.state.selectedCard == 3 ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.selectedCard == 3 ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'month', viewNumber: 12, selectedCard: 3 })}
                 />
                 <Button
                     fontSize={10}
                     title='Y'
                     borderRadius={10}
                     color={this.state.selectedCard == 4 ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.selectedCard == 4 ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'year', viewNumber: 5, selectedCard: 4 })}
                 />

                 </View>
                 </View>
                 <View style={styles.singleView}>
                    <View style={styles.flexboxCards}>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={()=> this.setState({ selectedCard: 5 })}>
                            <View style={this.state.selectedCard == 5 ?
                                            [styles.card, themeStyles.cardFocused] :
                                            [styles.card, themeStyles.card]}>
                                <FontAwesome name="fire" size={50} style={styles.icon}
                                    color={this.state.selectedCard == 5 ? "white" : "#0B5091"}/>
                                <Text style={this.state.selectedCard == 5 ?
                                             styles.textFocused : styles.text}>
                                    Gas
                                </Text>
                                <Text style={this.state.selectedCard == 5 ?
                                             styles.subFocused : styles.sub}>
                                    115
                                    thm
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={()=> this.setState({ selectedCard: 6 })}>
                            <View style={this.state.selectedCard == 6 ?
                                            [styles.card, themeStyles.cardFocused] :
                                            [styles.card, themeStyles.card]}>
                                <FontAwesome name="lightbulb-o" size={50} style={styles.icon}
                                    color={this.state.selectedCard == 6 ? "white" : "#0B5091"}/>
                                <Text style={this.state.selectedCard == 6 ?
                                             styles.textFocused : styles.text}>
                                    Electric
                                </Text>
                                <Text style={this.state.selectedCard == 6 ?
                                             styles.subFocused : styles.sub}>
                                    61,178
                                    kWh
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.flexboxCards}>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={()=> this.setState({ selectedCard: 7 })}>
                            <View style={this.state.selectedCard == 7 ?
                                            [styles.card, themeStyles.cardFocused] :
                                            [styles.card, themeStyles.card]}>

                                <Text style={this.state.selectedCard == 7 ?
                                             styles.textFocused : styles.text}>
                                    Heat
                                </Text>
                                <Text style={this.state.selectedCard == 7 ?
                                             styles.subFocused : styles.sub}>
                                    6,027,397
                                    kBTU
                                </Text>
                                <FontAwesome name="thermometer" size={50} style={styles.icon}
                                    color={this.state.selectedCard == 7 ? "white" : "#0B5091"}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={()=> this.setState({ selectedCard: 8 })}>
                            <View style={this.state.selectedCard == 8 ?
                                            [styles.card, themeStyles.cardFocused] :
                                            [styles.card, themeStyles.card]}>
                                <Text style={this.state.selectedCard == 8 ?
                                             styles.textFocused : styles.text}>
                                    Water
                                </Text>
                                <FontAwesome name="shower" size={50} style={styles.icon}
                                 color={this.state.selectedCard == 8 ? "white" : "#0B5091"}/>
                                <Text style={this.state.selectedCard == 8 ?
                                             styles.subFocused : styles.sub}>
                                    676,684
                                    gal
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                 </View>
             </ScrollView>
             </View>

            );
    }
}

const styles = StyleSheet.create({
  icon: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  number: {
    color: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: 'transparent',
    fontSize: 100,
  },
  singleView: {
    borderBottomColor: '#B9C8D6',
    borderBottomWidth: 1,
    paddingBottom: '3%',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '5%',
    ...Platform.select({
        ios: {
            shadowOpacity: 0.75,
            shadowRadius: 5,
            shadowColor: '#B9C8D6',
            shadowOffset: { height: 0, width: 0 },
        },
        android: {
            elevation: 3,

        },
    }),

  },
  words: {
      color: 'rgba(255, 255, 255, 0.75)',
      backgroundColor: 'transparent',
      fontSize: 16,
      marginTop: '-3%',
    },
  image: {
    position: 'absolute',
    left: -5,
    right: 0,
    top: 0,
    ...Platform.select({
          ios: {
            shadowOpacity: 0.75,
            shadowRadius: 5,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            shadowColor: '#B9C8D6',
            shadowOffset: { height: 0, width: 0 },
            paddingBottom: 140,
            height: 146,
          },
          android: {
            height: 163,
          }
        })
  },
  overlay: {
    position: 'absolute',
    left: -10,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#0B5091',
    opacity: 0.75,
    ...Platform.select({
              ios: {
                height: 146,
              },
              android: {
                height: 163,
              }
            })
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  graphContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: '3%',
      marginBottom: '3%',
      marginLeft: '3%',
      marginRight: '3%',
      borderRadius: 10,
    },
  contentContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#e1e8ee'
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
  flexboxCards: {
      paddingTop: 10,
      paddingBottom: 10,
      flex: 1.0,
      marginLeft: '6%',
      marginRight: '10%',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  card: {
    width: 125,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
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
  cardFocused: {
  },
  list: {
      flex: 1,
      marginLeft: '3%',
      marginRight: '3%',
  },
  text: {
    color: '#0B5091',
    fontSize: 15,
  },
  textFocused: {
    color: 'white',
    fontSize: 15,
  },
  sub: {
    color: '#9E9E9E',
    fontSize: 12,
  },
  subFocused: {
    color: 'white',
    fontSize: 12,
  },
  button: {
  },
})
