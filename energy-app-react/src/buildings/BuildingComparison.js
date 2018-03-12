/* BuildingComparison.js
 * Written by Jesse Bolton and Martin Green for Energy App Comps, 2018
 * Picker page to select two buildings to pass to ComparisonPage.js
 */

import React, { Component } from 'react';
import { Picker, StyleSheet, View, Dimensions } from 'react-native'
import { Button, Card } from 'react-native-elements';
import ComparisonPage from './ComparisonPage';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { getBuildingsList } from './../helpers/ApiWrappers.js';

class BuildingComparison extends Component {
    static navigationOptions = {
        title: 'Choose two buildings',
        backgroundColor: '#F3B61D',
    };

    constructor(props) {
        super(props);

        this.state = {
            building1: this.props.navigation.state.params.item,
            building2: 'Burton',
        }
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        const { navigate } = this.props.navigation;
        const buildings = getBuildingsList();
        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafafa'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 50}}>
                    <View style={{width: Dimensions.get('window').width/2 - 25, height: 300}}>
                        <Card containerStyle={[styles.card, themeStyles.card, themeStyles.shadowed, themeStyles.flex]}>
                            <Picker selectedValue={this.state.building1}
                                    mode = 'dropdown'
                                    onValueChange={(itemValue, itemIndex) => this.setState({building1: itemValue})}>
                                {buildings.map((item,index) => {
                                    return(<Picker.Item label={item} value={item} key={item}/>);
                                })}
                            </Picker>
                        </Card>
                    </View>
                    <View style={{width: Dimensions.get('window').width/2 - 25, height: 300}}>
                        <Card containerStyle={[styles.card, themeStyles.card, themeStyles.shadowed, themeStyles.flex]}>
                            <Picker selectedValue={this.state.building2}
                                    mode = 'dropdown'
                                    onValueChange={(itemValue, itemIndex) => this.setState({building2: itemValue})}>
                                {buildings.map((item,index) => {
                                    return(<Picker.Item label={item} value={item} key={item}/>);
                                })}
                            </Picker>
                        </Card>
                    </View>
                </View>
                <View>
                    <Button
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        title='Compare'
                        containerViewStyle={styles.button}
                        backgroundColor='#0B5091'
                        onPress={() => navigate("ComparisonPage", {
                            screen: "ComparisonPage", building1:this.state.building1, building2:this.state.building2
                        })}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        paddingBottom: 30,
        backgroundColor: 'yellow',
    },
    button: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 100,
    },
});

export default BuildingComparison;
