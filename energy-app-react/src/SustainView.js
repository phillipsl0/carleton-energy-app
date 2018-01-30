import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, Linking, Platform, StatusBar,
    StyleSheet, View, ScrollView, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { getSustainabilityEvents, getSustainabilityNews } from './helpers/ApiWrappers.js';


class SustainListView extends Component {
    // static navigationOptions = {
    //     // header: Platform.OS === 'ios' ? true : null,
    //     ...Platform.select({
    //         android: { header: null }
    //     }),
    //     // header: {
    //     //     // backgroundColor: '#FF0000', // '#0B5091',
    //     // },
    //     title: 'Learn More'
    // }


    render() {
        // const {navigate} = this.props.navigation;

        // console.log(Platform.OS)

        events = getSustainabilityEvents();
        news = getSustainabilityNews();

        links = ['https://apps.carleton.edu/sustainability/', 
                'https://apps.carleton.edu/sustainability/campus/', 
                'https://apps.carleton.edu/sustainability/action/', 
                'https://apps.carleton.edu/sustainability/about/', 
                'https://apps.carleton.edu/sustainability/events/', 
                'https://apps.carleton.edu/sustainability/news/']

        // console.log(news["news"]["items"][1]);
        // console.log(this.props)
        // console.log(events["events"]["items"].length) // len 17
        // console.log(events["events"]["items"][1]["title"])
        // console.log(SustainData);
        // console.log(new Date(news["news"]["items"][0]["pubDate"]))
        // var pubDate = new Date(news["news"]["items"][0]["pubDate"])
        // var content = "<p>You\u2019re likely to find"
        // console.log(pubDate)
        // <Text>{new Date(news["news"]["items"][0]["pubDate"]).toString()}</Text>
        // <Text>{news["news"]["items"][0]["content"]}</Text>
        // <List containerStyle={{marginBottom: 0, marginTop: -15, 
            // borderBottomWidth: 0, borderTopWidth: 0, 
            // borderBottomColor: '#FF0000', borderTopColor: '#00FF00', 
            // borderColor: '#0000FF', borderWidth: 0}}>
        // <Image source={require('./assets/windmillHeader.png')} />
        // image={require('./assets/SustainabilityLogo.png')}>


                // <StatusBar
                //     backgroundColor="#673ab7"
                //     barStyle="light-content"
                //     animated={true}
                // />

        // StatusBar.setBarStyle('light-content', false);
        // StatusBar.setBackgroundColor('#673ab7', true);
        // <MyStatusBar backgroundColor="#673ab7" barStyle="light-content" />
        // <StatusBar
        //     backgroundColor="blue"
        //     barStyle="light-content"
        // />

        return (
            <ScrollView>
                <Card title="Get Involved"
                    containerStyle={{marginBottom: -5}}>

                    <List containerStyle={{marginBottom: 0, marginTop: -15, borderTopWidth: 0}}>
                        <ListItem containerStyle={{borderBottomColor: '#cbd2d9', borderBottomWidth: 0.7}}
                            title={"Our Campus"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[1])} />
                        <ListItem containerStyle={{borderBottomColor: '#cbd2d9', borderBottomWidth: 0.7}}
                            title={"Take Action"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[2])} />
                        <ListItem containerStyle={{borderBottomColor: '#cbd2d9', borderBottomWidth: 0.7}}
                            title={"People & Policies"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[3])} />
                    </List>
                </Card>
                <Card title="Upcoming Events"
                    containerStyle={{marginBottom: -5}}>
                    <List containerStyle={{marginBottom: 0, marginTop: -15, borderTopWidth: 0}}>
                        <ListItem containerStyle={{borderBottomColor: '#cbd2d9', borderBottomWidth: 0.7}}
                            title={events["events"]["items"][0]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(events["events"]["items"][0]["link"])}
                            subtitle={events["events"]["items"][0]["content"]} />
                        <ListItem containerStyle={{borderBottomWidth: 0 }}
                            title={events["events"]["items"][1]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(events["events"]["items"][1]["link"])}
                            subtitle={events["events"]["items"][1]["content"]} />
                    </List>
                    <Button
                        title="More Events"
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        backgroundColor='#0B5091'
                        onPress={() => Linking.openURL(links[4])}
                        />
                </Card>
                <Card title="Recent News"
                    containerStyle={{marginBottom: 10}}>
                    <List containerStyle={{marginBottom: 0, marginTop: -15, borderTopWidth: 0}}>
                        <ListItem containerStyle={{borderBottomColor: '#cbd2d9', borderBottomWidth: 0.7}}
                            title={news["news"]["items"][0]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(news["news"]["items"][0]["link"])}
                            subtitle={
                                news["news"]["items"][0]["content"].replace(/<[^>]+>/g, '')
                            }
                            subtitleNumberOfLines={3} />
                        <ListItem containerStyle={{borderBottomWidth: 0 }}
                            title={news["news"]["items"][1]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(news["news"]["items"][1]["link"])}
                            subtitle={news["news"]["items"][1]["content"].replace(/<[^>]+>/g, '')}
                            subtitleNumberOfLines={3} />
                    </List>
                    <Button
                        title="More News"
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        backgroundColor='#0B5091'
                        onPress={() => Linking.openURL(links[5])}
                        />
                </Card>
            </ScrollView>
            );

                    // <Button
                    //     rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                    //     fontSize={20}
                    //     title={events["events"]["items"][0]["content"]}
                    //     backgroundColor='#0B5091'
                    //     onPress={() => Linking.openURL(events["events"]["items"][0]["link"])} />
                    // } />

            // <FlatList
            //     data={events["events"]["items"]}
            //     keyExtractor={item => item["title"]}
            //     renderItem={({ item }) => (
            // <Card title={item["title"]}>
            //     <Button
            //         rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
            //         fontSize={20}
            //         title={item["content"]}
            //         backgroundColor='#0B5091'
            //         onPress={() => Linking.openURL(item["link"])} />
            // </Card>
            // )}
            //     />
    }
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[{ backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   statusBar: {
//     height: STATUSBAR_HEIGHT,
//   },
//   // appBar: {
//   //   backgroundColor:'#79B45D',
//   //   height: APPBAR_HEIGHT,
//   // },
//   content: {
//     flex: 1,
//     backgroundColor: '#33373B',
//   },
// });

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
    statusBar: {
        backgroundColor: "#C2185B",
        height: StatusBar.currentHeight,
    },
})

const SustainStack = StackNavigator({
    Sustain: {
        screen: SustainListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Learn More',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
        // headerBackgroundColor: '#FF0000', // '#0B5091',
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

const styles02 = StyleSheet.create({
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