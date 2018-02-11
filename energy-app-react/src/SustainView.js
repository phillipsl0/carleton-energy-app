import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, Linking, Platform,
    StyleSheet, View, ScrollView, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button } from 'react-native-elements';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { getSustainabilityEvents, getSustainabilityEventsBak, 
    getSustainabilityNews, getSustainabilityNewsBak } from './helpers/ApiWrappers.js';
import { GetStyle } from './styling/Themes'
const themeStyles = GetStyle();

class SustainListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
           newsData: '',
           eventsData: ''
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        const events = await getSustainabilityEvents();
        const eventsJson = await events.json()
        await this.setStateAsync({eventsData: eventsJson})

        const news = await getSustainabilityNews();
        const newsJson = await news.json()
        await this.setStateAsync({newsData: newsJson})
    }


    render() {
        events = getSustainabilityEventsBak();
        news = getSustainabilityNewsBak();

        if (this.state.eventsData) {
            events["events"] = this.state.eventsData;
        }
        if (this.state.newsData) {
            news["news"] = this.state.newsData;
        }

        links = ['https://apps.carleton.edu/sustainability/', 
                'https://apps.carleton.edu/sustainability/campus/', 
                'https://apps.carleton.edu/sustainability/action/', 
                'https://apps.carleton.edu/sustainability/about/', 
                'https://apps.carleton.edu/sustainability/events/', 
                'https://apps.carleton.edu/sustainability/news/']

        // console.log("Style", themeStyles)
        
        return (

            <ScrollView style={{backgroundColor: '#fafafa'}}>
                <Card containerStyle={[themeStyles.card, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/cfl.png')} />
                        <View>
                            <Text style={[styles.title, themeStyles.title]}>Get Involved</Text>
                        </View>
                    </View>


                    <List containerStyle={styles.list}>
                        <ListItem containerStyle={themeStyles.listItem}
                            title={"Our Campus"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[1])} />
                        <ListItem containerStyle={themeStyles.testItem}
                            title={"Take Action"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[2])} />
                        <ListItem containerStyle={themeStyles.listItem}
                            title={"People & Policies"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[3])} />
                    </List>
                </Card>

                <Card title="Upcoming Events"
                    containerStyle={themeStyles.card}
                    titleStyle={themeStyles.title}>

                    <List containerStyle={styles.list}>
                        <ListItem containerStyle={themeStyles.listItem}
                            title={events["events"]["items"][0]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(events["events"]["items"][0]["link"])}
                            subtitleStyle={themeStyles.subtitle}
                            subtitle={events["events"]["items"][0]["content"]} />
                        <ListItem containerStyle={themeStyles.listItem}
                            title={events["events"]["items"][1]["title"]}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(events["events"]["items"][1]["link"])}
                            // subtitle={events["events"]["items"][1]["content"]}
                            subtitleStyle={themeStyles.subtitle} />
                    </List>

                    <View>
                        <Text 
                            style={[styles.title, themeStyles.title, styles.button]}
                            onPress={() => Linking.openURL(links[4])}>MORE EVENTS</Text>
                    </View>
                    {//<Button
                        // title="More Events"
                        // rightIcon={{name: "angle-right", type: 'font-awesome', size: 16}}
                        // fontSize={16}
                        // backgroundColor='#529353' //'#0B5091'
                        // // buttonStyle={styles.button}
                        // onPress={() => Linking.openURL(links[4])} />
                    }

                </Card>

                <Card title="Recent News"
                    containerStyle={[themeStyles.card, {marginBottom: 10}]}
                    titleStyle={themeStyles.title}>

                    <List containerStyle={styles.list}>
                        <ListItem containerStyle={themeStyles.listItem}
                            title={news["news"]["items"][0]["title"]}
                            titleStyle={themeStyles.title}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(news["news"]["items"][0]["link"])}
                            subtitle={news["news"]["items"][0]["content"].replace(/<[^>]+>/g, '')}
                            subtitleStyle={themeStyles.subtitle}
                            subtitleNumberOfLines={3} />
                        <ListItem containerStyle={themeStyles.listItem}
                            title={news["news"]["items"][1]["title"]}
                            titleStyle={themeStyles.title}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(news["news"]["items"][1]["link"])}
                            subtitle={news["news"]["items"][1]["content"].replace(/<[^>]+>/g, '')}
                            subtitleStyle={themeStyles.subtitle}
                            subtitleNumberOfLines={3} /> 
                    </List>

                    <View>
                        <Text 
                            style={[styles.title, themeStyles.title, styles.button]}
                            onPress={() => Linking.openURL(links[5])}>MORE NEWS</Text>
                    </View>
                    {// <Button
                    //     title="More News"
                    //     rightIcon={{name: "angle-right", type: 'font-awesome', size: 16}}
                    //     fontSize={16}
                    //     backgroundColor='#529353' //'#0B5091'
                    //     // buttonStyle={styles.button}
                    //     onPress={() => Linking.openURL(links[5])} />
                    }

                </Card>
            </ScrollView>
            );

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



const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
        // headerTintColor: 'white'
    },
    // headerTitle: {
    //     fontFamily: 'lato-bold',
    // }
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
            // headerTitleStyle: navStyles.headerTitle,
        }),
    }
});

const styles = StyleSheet.create({

    card: {
        paddingTop: 0,
        // margin: 10,
    },
    header: {
        marginBottom: 25,
        paddingLeft: 18,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        marginBottom: 3,
        paddingRight: 25,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#529353'
    },
    image: {
        width: moderateScale(40),
        height: moderateScale(40),
    },
    list: {
        marginBottom: 12,
        marginTop: -15,
        marginLeft: 15,
        marginRight: 20,
        borderTopColor: '#cbd2d9',
        borderBottomColor: '#cbd2d940',
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listItem: {
        marginLeft: -15,
        marginRight: -10,
        borderColor: '#cbd2d940',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    title: {
        paddingLeft: 12,
        fontSize: 18,
        fontWeight: 'normal',
    },
    // listItem: {
    //     borderBottomColor: '#cbd2d9', 
    //     borderBottomWidth: 0.7
    // }
})

export default SustainStack;