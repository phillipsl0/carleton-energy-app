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
            <ScrollView>
                <Card title="Get Involved"
                    containerStyle={themeStyles.card}
                    titleStyle={themeStyles.title}>

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
                    <Button
                        title="More Events"
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        backgroundColor='#0B5091'
                        onPress={() => Linking.openURL(links[4])} />
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
                    <Button
                        title="More News"
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        backgroundColor='#0B5091'
                        // buttonStyle={themeStyles.button}
                        onPress={() => Linking.openURL(links[5])} />
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
    list: {                 // Keep to local list
        marginBottom: 12, 
        marginTop: -15, 
        borderTopWidth: 0
    },
    // listItem: {
    //     borderBottomColor: '#cbd2d9', 
    //     borderBottomWidth: 0.7
    // }
})

export default SustainStack;