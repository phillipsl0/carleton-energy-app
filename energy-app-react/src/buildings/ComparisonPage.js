/* ComparisonPage.js
 * Written by Jesse Bolton and Martin Green for Energy App Comps, 2018
 * Comparison between two passed in buildings, using colored views
 * of a proportional width to display bar graphs.
 */

import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { getAvatar } from './Buildings';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { getCurrentBuildingUtilityConsumption } from './../helpers/ApiWrappers.js';
import { moderateScale } from './../helpers/Scaling';

function doMath(building1value, building2value) {
    let utilityPercentA = (building1value / (building1value + building2value)) * 100 + '%';
    let utilityPercentB = (building2value / (building1value + building2value)) * 100 + '%';
    let value = new Array(2);
    value[0] = utilityPercentA;
    value[1] = utilityPercentB;
    return value;
}

class ComparisonPage extends Component {
    static navigationOptions = {
        title: 'Comparison'
    };

    constructor(props) {
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

        let electricGraphdata = doMath(buildingAelectric, buildingBelectric);
        let waterGraphdata = doMath(buildingAwater, buildingBwater);
        let heatGraphdata = doMath(buildingAheat, buildingBheat);

        return (
            <ScrollView style={{backgroundColor: '#fafafa'}}>
                <View style={{paddingTop:10}} />
                <View style={[styles.flexRow, {justifyContent: 'space-around', paddingLeft: 7, paddingRight: 7}]}>
                    <View>
                        <Card containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                            <View>
                                <Image style={styles.listImg}
                                       source={{ uri: getAvatar(this.props.navigation.state.params.building1)}} />
                                <Text style={styles.h1text}>{this.props.navigation.state.params.building1}</Text>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={[themeStyles.card, themeStyles.flex, styles.card]}>
                            <View>
                                <Image style={styles.listImg}
                                       source={{ uri: getAvatar(this.props.navigation.state.params.building2)}} />
                                <Text style={styles.h2text}>{this.props.navigation.state.params.building2}</Text>
                            </View>
                        </Card>
                    </View>
                </View>

                <View>
                    <Card title="Electricity" titleStyle={styles.title} containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={[styles.flexRow, {marginTop: -10}]}>
                            <View><Text style={styles.text}>{buildingAelectric} kWh</Text></View>
                            <View style={styles.graph}>
                                <View style={{width: electricGraphdata[0], backgroundColor: '#447BB0',}} />
                                <View style={{width: electricGraphdata[1], backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBelectric} kWh</Text></View>
                        </View>
                    </Card>

                    <Card title="Water" titleStyle={styles.title} containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={[styles.flexRow, {marginTop: -10}]}>
                            <View><Text style={styles.text}>{buildingAwater} gal</Text></View>
                            <View style={styles.graph}>
                                <View style={{width: waterGraphdata[0], backgroundColor: '#447BB0',}} />
                                <View style={{width: waterGraphdata[1], backgroundColor: '#0B5091',}} />
                            </View>
                            <View><Text style={styles.text}> {buildingBwater} gal</Text></View>
                        </View>
                    </Card>

                    <Card title="Heat" titleStyle={styles.title} containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>
                        <View style={[styles.flexRow, {marginTop: -10}]}>
                            <View><Text style={styles.text}>{buildingAheat} kBTUs</Text></View>
                            <View style={styles.graph}>
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

const styles = StyleSheet.create({
    card: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    h1text: {
        alignSelf: 'center',
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#447BB0',
    },
    h2text: {
        alignSelf: 'center',
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#0B5091',
    },
    text: {
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 8,
        fontSize: moderateScale(14),
        paddingTop: 5,
        paddingBottom: 10,
    },
    title: {
        marginBottom: 2,
    },
    listImg: {
        height: moderateScale(150),
        width: moderateScale(150),
        alignSelf: 'center',
    },
    graph: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        height: moderateScale(25),
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ComparisonPage;
