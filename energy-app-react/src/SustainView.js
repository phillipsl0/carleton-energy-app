import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, Linking,
    StyleSheet, View, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { getSustainabilityEvents } from './helpers/ApiWrappers.js';


class SustainListView extends Component {
    static navigationOptions = {
        title: 'Sustain'
    }

    render() {
        // const {navigate} = this.props.navigation;

        events = getSustainabilityEvents();

        // console.log(events);
        // console.log(this.props)
        // console.log(events["events"]["items"].length) // len 17
        // console.log(events["events"]["items"][1]["title"])
        // console.log(SustainData);

        return (
            <FlatList
                data={events["events"]["items"]}
                keyExtractor={item => item["title"]}
                renderItem={({ item }) => (
            <Card title={item["title"]}>
                <Button
                    rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                    fontSize={20}
                    title={item["content"]}
                    backgroundColor='#0B5091'
                    onPress={() => Linking.openURL(item["link"])} />
            </Card>
            )}
                />
            );
    }
}


const SustainStack = StackNavigator({
    Sustain: {
        screen: SustainListView,
    },
    // CardView: {
    // path: 'OverviewCards/:title',
    // screen: OverviewCards,
    // navigationOptions: ({ navigation }) => ({
    //   title: `${navigation.state.params.title}`,
    //   headerTintColor: 'white',
    //   headerStyle: navStyles.header,
    // }),
    // },
    // CardView: {
    //   screen: IndividualBuilding,
    //   // navigationOptions: 
    // },
});

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    }
})

const styles = StyleSheet.create({
    card: {
        paddingTop: 20,
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
        width: 300,
        alignSelf: 'center',
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 55,
    },
    subtitleView: {
        // color: 'black',
        paddingTop: 35,
        paddingRight: 40,
        paddingLeft: 20

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

export default SustainStack;