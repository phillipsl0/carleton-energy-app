import React, { Component } from 'react';
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import buildings from './Buildings';
import IndividualBuilding from './IndividualBuilding';
import ComparisonPage from './ComparisonPage';
import BuildingComparison from './BuildingComparison';

import { moderateScale } from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const theme = GetStyle();

class BuildingListView extends Component {

    renderItem = (item) => {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => this.props.navigation.navigate('BuildingCardView', {item:item.item})}>
                <View style={[theme.card, styles.card, theme.shadowed]}>
                    <Text style={styles.header}>{item.item.name}</Text>
                    <View style={styles.border}/>
                    <View style={[styles.outerView, styles.innerView]}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                            <Image resizeMode="cover" style={styles.image} source={{uri: item.item.avatar}}/>

                            <View style={styles.iconFlex}>
                                <Text style={styles.icon}><FontAwesome name="lightbulb-o" size={moderateScale(24)} color="#0B5091" /></Text>
                                <Text style={styles.text}>{item.item.electricity}</Text></View>

                            <View style={styles.iconFlex}>
                                <Text style={styles.icon}> <FontAwesome name="shower" size={moderateScale(24)} color="#0B5091" /></Text>
                                <Text style={styles.text}>{item.item.water}</Text></View>

                            <View style={styles.iconFlex}>
                                <Text style={styles.icon}><FontAwesome name="fire" size={moderateScale(24)} color="#0B5091" /></Text>
                                <Text style={styles.text}>{item.item.heat}</Text></View>

                            <View style={styles.iconFlex}>
                                <Text style={styles.icon}><FontAwesome name="angle-right" size={moderateScale(24)} color="#0B5091" /></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fafafa'}}>
                <View style={{paddingTop:8}} />
                <FlatList
                    data={buildings}
                    renderItem={this.renderItem}
                    keyExtractor = {(item) => item.name}
                />
                <View style={{paddingTop:5}} />
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
});

const BuildingStack = StackNavigator({
    BuildingsListView: {
        screen: BuildingListView,
        navigationOptions: () => ({
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
        navigationOptions: () => ({
            headerTintColor: 'white',
            headerStyle: navStyles.header,
            headerTitleStyle: navStyles.headerTitle,
            headerBackTitleStyle: navStyles.headerTitle,
            headerBackTitle: 'Back',
        }),
    },
    ComparisonPage: {
        screen: ComparisonPage,
        navigationOptions: () => ({
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
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e8ee',
        marginTop: '1%' },
    card: {
        marginTop: 5,
        marginBottom: 5,
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
    text: {
        marginLeft: 5,
        textAlign: 'center',
        fontSize: moderateScale(16),
        color: 'darkslategrey',
    },
    icon: {
        marginLeft: 5,
        textAlign: 'center',
        fontSize: moderateScale(16),
    },
    iconFlex: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        fontSize: moderateScale(18),
        color:'darkslategrey',
        paddingLeft: 3,
        marginTop: moderateScale(-8),
        backgroundColor: 'white',
        alignSelf: 'flex-start',
    },
    image: {
        alignItems:'center',
        width:75,
        height:75,
        marginLeft: 3,
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
        // backgroundColor: '#F5FCFF',
        paddingTop: '2%',
        // paddingBottom: '1%',
        // marginTop: '1%',
    }
});

export default BuildingStack;
