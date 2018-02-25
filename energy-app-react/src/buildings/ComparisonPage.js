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
    var utilityPercentA = (building1value/(building1value + building2value))*100 + '%';
    var utilityPercentB = (building2value/(building1value + building2value))*100 + '%';
    value = new Array(2);
    value[0] = utilityPercentA;
    value[1] = utilityPercentB;
    return value;
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
            <ScrollView style={{backgroundColor: '#fafafa'}}>
                <View style={{paddingTop:10}} />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 7, paddingRight: 7}}>
                    <View>
                        <Card containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                            <View>
                                <Image style={styles.listImg} //resizeMode="cover"
                                       source={{ uri: getAvatar(this.props.navigation.state.params.building1)}} />
                                <Text style={styles.h1text}>{this.props.navigation.state.params.building1}</Text>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={[themeStyles.card, themeStyles.flex, styles.card]}>
                            <View>
                                <Image style={styles.listImg} //resizeMode="cover"
                                       source={{ uri: getAvatar(this.props.navigation.state.params.building2)}} />
                                <Text style={styles.h2text}>{this.props.navigation.state.params.building2}</Text>
                            </View>
                        </Card>
                    </View>
                </View>

                <View>
                    <Card 
                        title="Electricity"
                        titleStyle={styles.title}
                        containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            <View><Text style={styles.text}>{buildingAelectric} kWh</Text></View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 30,}}>
                                <View style={{width: electricGraphdata[0], backgroundColor: '#447BB0',}} />
                                <View style={{width: electricGraphdata[1], backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBelectric} kWh</Text></View>
                        </View>
                    </Card>

                    <Card title="Water" titleStyle={styles.title} containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            <View><Text style={styles.text}>{buildingAwater} gal</Text></View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 30,}}>
                                <View style={{width: waterGraphdata[0], backgroundColor: '#447BB0',}} />
                                <View style={{width: waterGraphdata[1], backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBwater} gal</Text></View>
                        </View>
                    </Card>

                    <Card title="Heat" titleStyle={styles.title} containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            <View><Text style={styles.text}>{buildingAheat} kBTUs</Text></View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 30,}}>
                                <View style={{width: heatGraphdata[0], backgroundColor: '#447BB0',}} />
                                <View style={{width: heatGraphdata[1], backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBheat} kBTUs</Text></View>
                        </View>
                    </Card>

                </View>
                <View style={{paddingTop:10}} />
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
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    button: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 200,
    },
    h1text: {
        alignSelf: 'center',
        // marginLeft: 5,
        fontSize: 24,
        // paddingBottom: 10,
        fontWeight: 'bold',
        color: '#447BB0',
    },
    h2text: {
        alignSelf: 'center',
        // marginLeft: 5,
        fontSize: 24,
        // paddingBottom: 10,
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
    title: {
        marginBottom: 2,
    },
    listImg: {
        height: 147,
        width: 149,
        alignSelf: 'center',
    },
    img: {
        alignSelf: 'center',
        height: 30,
        width: 30,
    },
});


export default ComparisonPage;