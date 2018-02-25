import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, ScrollView, Picker } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import buildings, {getAvatar} from './Buildings';
import IndividualBuiding from './IndividualBuilding';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import BuildingComparison from './BuildingComparison';
import { getCurrentBuildingUtilityConsumption, getUtilitiesList, getCurrentBuildingUtilityConsumptionGraphFormat} from './../helpers/ApiWrappers.js';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';

function doMath(building1value, building2value) {
    var utilityPercentA = toString(building1value/(building1value + building2value)) + '%';
    var utilityPercentB = toString(building1value/(building1value + building2value)) + '%';
    value = new Array(2);
    value[0] = utilityPercentA;
    value[1] = utilityPercentB;
    return value
}

class ComparisonPage extends Component {
    static navigationOptions = {
        title: 'Comparison'
    };

    constructor(props){
        super(props);
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);

        const buildingAelectric = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Electric'));
        const buildingBelectric = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Electric'));

        const buildingAwater = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Water'));
        const buildingBwater = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Water'));

        const buildingAheat = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Heat'));
        const buildingBheat = Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Heat'));

        var electricGraphdata = doMath(buildingAelectric, buildingBelectric);
        var waterGraphdata = doMath(buildingAwater, buildingBwater);
        var heatGraphdata = doMath(buildingAheat, buildingBheat);
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column', paddingTop: 20,}}>
                <View style={{flex: 0, flexDirection: 'row',}}>
                    <View>
                    <Card containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
                        <View //style={{width: 120, height: 100, alignSelf: 'center'}}
                        >
                            <Image style={styles.listImg} //resizeMode="cover"
                                   source={{ uri: getAvatar(this.props.navigation.state.params.building1)}} />
                        </View>
                    </Card>
                        <Text style={styles.h1text}> {this.props.navigation.state.params.building1} </Text>
                    </View>
                    <View>
                    <Card containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
                        <View //style={{width: 120, height: 100, alignSelf: 'center'}}
                        >
                            <Image style={styles.listImg} //resizeMode="cover"
                                   source={{ uri: getAvatar(this.props.navigation.state.params.building2)}} />
                        </View>
                    </Card>
                        <Text style={styles.h2text}> {this.props.navigation.state.params.building2} </Text>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around',}}
                >
                </View>




                <View //style={{flex: 2, flexDirection: 'column',}}
                >
                    <Card title="Electricity">
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around',}}>
                            <View><Text style={styles.text}>{buildingAelectric} kWh</Text></View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 20, width: 100,}}>
                                <View style={{width:'40%', backgroundColor: '#447BB0',}} />
                                <View style={{width:'60%', backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBelectric} kWh</Text></View>
                        </View>
                    </Card>
                    <Card>
                        <View>
                            <Text style={styles.text}> Water: </Text>
                            <Text style={styles.text}> {buildingAwater} gal</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', height: 50, width: 200,}}>
                            <View style={{height: 50, width:20, backgroundColor: 'blue'}} >
                                <Text></Text>
                            </View>
                            <View style={{height: 50, width:50, backgroundColor: '#0B5091',}} >
                                <Text></Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}> Water: </Text>
                            <Text style={styles.text}> {buildingBwater} gal</Text>
                        </View>
                    </Card>
                    <Card>
                        <View>
                            <Text style={styles.text}> Gas: </Text>
                            <Text style={styles.text}> {buildingAheat} kBTU</Text>
                        </View>
                        <View>
                            <View style={{height: 50, width:20, backgroundColor: 'blue'}} >
                                <Text> </Text>
                            </View>
                            <View style={{height: 50, width:50, backgroundColor: 'yellow'}} >
                                <Text> </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}> Gas: </Text>
                            <Text style={styles.text}> {buildingBheat} kBTU</Text>
                        </View>
                    </Card>




                    {/*<View style={{width: 130, height: 225}}>
                        <Text style={styles.h1text}> {this.props.navigation.state.params.building1} </Text>
                        <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                            <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                                <Text style={styles.text}> Electric: </Text>
                                <Text style={styles.text}> {buildingAelectric} kWh</Text>
                            </Card>
                        </View>
                        <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                            <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                                <Text style={styles.text}> Water: </Text>
                                <Text style={styles.text}> {buildingAwater} gal</Text>
                            </Card>
                        </View>
                        <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                            <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                                <Text style={styles.text}> Gas: </Text>
                                <Text style={styles.text}> {buildingAheat} kBTU</Text>
                            </Card>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', height: 50, width: 200,}}>
                        <View style={{height: 50, width:20, backgroundColor: 'blue'}} >
                            <Text> </Text>
                        </View>
                        <View style={{height: 50, width:50, backgroundColor: 'yellow'}} >
                            <Text> </Text>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View style={{height: 50, width:waterGraphdata[0], backgroundColor: 'blue'}} >
                            <Text> </Text>
                        </View>
                        <View style={{height: 50, width:waterGraphdata[0], backgroundColor: 'yellow'}} >
                            <Text> </Text>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View style={{height: 50, width:heatGraphdata[0], backgroundColor: 'blue'}} >
                            <Text> </Text>
                        </View>
                        <View style={{height: 50, width:heatGraphdata[0], backgroundColor: 'yellow'}} >
                            <Text> </Text>
                        </View>
                    </View>*/}
                </View>


                {/*<View style={{width: 130, height: 225,}}>
                    <Text style={styles.h2text}> {this.props.navigation.state.params.building2} </Text>
                    <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                        <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                            <Text style={styles.text}> Electric: </Text>
                            <Text style={styles.text}> {buildingBelectric} kWh</Text>
                        </Card>
                    </View>
                    <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                        <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                            <Text style={styles.text}> Water: </Text>
                            <Text style={styles.text}> {buildingBwater} gal</Text>
                        </Card>
                    </View>
                    <View style={{width: 110, height: 110, alignSelf: 'center', paddingBottom: 30, paddingTop: 10}}>
                        <Card containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
                            <Text style={styles.text}> Gas: </Text>
                            <Text style={styles.text}> {buildingBheat} kBTU</Text>
                        </Card>
                    </View>
                </View>*/}
            </ScrollView>
        );
    }
}

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
});


const styles = StyleSheet.create({
    card: {
        paddingTop: 5,
    },
    cards: {
        alignSelf: 'center',
        width: 100,
        height: 120,
    },
    bigyellow: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 30
    },
    blue: {
        color: 'blue',
        fontWeight: 'bold',
    },
    head: {
        backgroundColor: 'grey',
    },
    button: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 200,
    },
    table: {
        width: 250,
        marginLeft: 5,

    },
    h1text: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 24,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#447BB0',
    },
    h2text: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 24,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#0B5091',
    },
    text: {
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 8,
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 10,
        // fontWeight: 'bold',
    },

    listImg: {
        height: 147,
        width: 149,
        alignSelf: 'center',
    },
    listText: {
        paddingLeft: 30,
        marginLeft: 30,
        fontSize: 24,
    },
    row: {
        backgroundColor: 'orange',
    },
    view: {
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    img: {
        alignSelf: 'center',
        height: 30,
        width: 30,
    },
});

// <View style={{
//        flex: 0,
//        flexDirection: 'column',
//        paddingTop: 25,
//      }}>
//        <View style={{width: 100, height: 110, alignSelf: 'center'}}>
//        <Graph

//            type= 'pie'
//            theme={CustomThemes.carleton}
//            graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Electric')}
//            height={95}
//            width={100}
//            innerRadius={10}
//            legend={false} />
//        </View>
//        <View style={{width: 100, height: 110, alignSelf: 'center'}}>
//       <Graph
//          type= 'pie'
//          theme={CustomThemes.carleton}
//          graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Water')}
//          height={95}
//          width={100}
//          innerRadius={10}
//          legend={false} />
//        </View>
//        <View style={{width: 100, height: 110, alignSelf: 'center', paddingBottom: 10}}>
//      <Graph
//        type= 'pie'
//        theme={CustomThemes.carleton}
//        graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Gas')}
//        height={95}
//        width={100}
//        innerRadius={10}
//        legend={false} />
//      </View>
//        </View>


export default ComparisonPage;