import React, { Component } from 'react';
import { Item, Picker, StyleSheet, View } from 'react-native'
import { Button, Card } from 'react-native-elements';
import ComparisonPage from './ComparisonPage';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { getBuildingsList } from './../helpers/ApiWrappers.js';

class BuildingComparison extends Component {
    static navigationOptions = {
        title: 'Choose two buildings',
        backgroundColor: '#F3B61D',
    }
    constructor(props){
        super(props);

        this.state = {
            building1: this.props.navigation.state.params.item,
            building2: 'Burton',
        }

    }


    render() {
        const themeStyles = GetStyle(CurrTheme);
        const { navigate } = this.props.navigation;
        const buildings = getBuildingsList()
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingTop: 50,
                }}>
                    <View style={{width: 190, height: 300}}>
                        <Card
                            containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
                            <Picker selectedValue={this.state.building1}
                                    mode = 'dialog'
                                    onValueChange={(itemValue, itemIndex) => this.setState({building1: itemValue})}>
                                {buildings.map((item,index) => {
                                    return(<Picker.Item label={item} value={item} key={item}/>);
                                })}
                            </Picker>
                        </Card>
                    </View>
                    <View style={{width: 190, height: 300}}>
                        <Card
                            containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
                            <Picker selectedValue={this.state.building2}
                                    mode = 'dialog'
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
                        onPress={() => navigate("ComparisonPage", {screen: "ComparisonPage", building1:this.state.building1, building2:this.state.building2})}/>
                </View>
                <View>
                </View>
            </View>
        );
    }
};

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

// const ComparisonStack = StackNavigator({
//     BuildingComparison: {
//         screen: BuildingComparison,
//     }, 
//     Comparison: {
//         screen: ComparisonPage,
//     },
// });

const styles = StyleSheet.create({
    card: {
        paddingBottom: 30,
        backgroundColor: 'yellow',
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
        paddingBottom: 100,
    },
    table: {
        width: 250,
        marginLeft: 5,

    },
    text: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 18,
    },
    listItem: {
        height: 50,
        backgroundColor: 'aqua',
        borderBottomColor: '#c8c7cc',
        borderBottomWidth: 0.5,
        width: 190,
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 55,

    },
    listItem2: {
        height: 50,
        backgroundColor: 'yellow',
        borderBottomColor: '#c8c7cc',
        borderBottomWidth: 0.5,
        width: 190,
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 55,

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
    view: {
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    img: {
        alignSelf: 'stretch',
        height: 100,
    },
})


export default BuildingComparison;