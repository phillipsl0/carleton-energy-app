/* SustainView.js
 * Written by Martin Green for Energy App Comps, 2018
 * Learn More tab which pulls data from Rss2JSON using ApiWrappers
 */

import React, { Component } from 'react';
import { Alert, Image, Linking, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Card, List, ListItem } from 'react-native-elements';

import {
    getSustainabilityEvents,
    getSustainabilityEventsBak,
    getSustainabilityNews,
    getSustainabilityNewsBak
} from './helpers/ApiWrappers.js';
import { moderateScale } from './helpers/Scaling';
import { GetStyle } from './styling/Themes'

const themeStyles = GetStyle();

class SustainListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsData: '',
            eventsData: '',
            neverAlert: false
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        const events = await getSustainabilityEvents();
        const eventsJson = await events.json();
        await this.setStateAsync({eventsData: eventsJson});

        const news = await getSustainabilityNews();
        const newsJson = await news.json();
        await this.setStateAsync({newsData: newsJson})
    }

    alertBrowser = (link) => {

        if (this.state.neverAlert) {
            Linking.openURL(link);
        } else {
            let linkTitle;
            if (link.length > moderateScale(60)) {
                linkTitle = link.substring(0, moderateScale(60) - 5) + '...';
            } else {
                linkTitle = link;
            }
            Alert.alert(
                linkTitle,
                'Open link in web browser?',
                [{text: 'Always Open', onPress: () =>
                        (Linking.openURL(link), this.setState({neverAlert: true}))},
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Open', onPress: () => (Linking.openURL(link))}]
            );
        }
    };

    render() {
        let events = getSustainabilityEventsBak();
        let news = getSustainabilityNewsBak();

        if (this.state.eventsData) {
            events["events"] = this.state.eventsData;
        }
        if (this.state.newsData) {
            news["news"] = this.state.newsData;
        }

        let links = ['https://apps.carleton.edu/sustainability/',
            'https://apps.carleton.edu/sustainability/campus/',
            'https://apps.carleton.edu/sustainability/action/',
            'https://apps.carleton.edu/sustainability/about/',
            'https://apps.carleton.edu/sustainability/events/',
            'https://apps.carleton.edu/sustainability/news/'];


        return (
            <ScrollView style={{backgroundColor: '#fafafa'}}>
                <View style={{paddingTop:5}} />
                <Card containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/cfl.png')} />
                        <View>
                            <Text style={styles.title}>Get Involved</Text>
                        </View>
                    </View>

                    <List containerStyle={styles.list}>
                        <ListItem
                            containerStyle={styles.listItem}
                            title={"Our Campus"}
                            titleStyle={styles.listTitle}
                            titleNumberOfLines={3}
                            onPress={() => this.alertBrowser(links[1])} />
                        <ListItem containerStyle={styles.listItem}
                            title={"Take Action"}
                            titleStyle={styles.listTitle}
                            titleNumberOfLines={3}
                            onPress={() => this.alertBrowser(links[2])} />
                        <ListItem containerStyle={styles.listItem}
                            title={"People & Policies"}
                            titleStyle={styles.listTitle}
                            titleNumberOfLines={3}
                            onPress={() => this.alertBrowser(links[3])} />
                        <View style={styles.listItem} />
                    </List>
                </Card>

                <Card containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/calendar.png')} />
                        <View>
                            <Text style={styles.title}>Upcoming Events</Text>
                        </View>
                        <View style={styles.image} />
                    </View>

                    <List containerStyle={styles.list}>
                        { events["events"]["items"].map((item, key) =>
                            item["content"]
                                ? <ListItem
                                    key={item["guid"]}
                                    containerStyle={styles.listItem}
                                    title={item["title"]}
                                    titleStyle={styles.listTitle}
                                    titleNumberOfLines={3}
                                    onPress={() => this.alertBrowser(item["link"])}
                                    subtitleStyle={styles.subtitle}
                                    subtitle={item["content"]} />
                                : <ListItem
                                    key={item["guid"]}
                                    containerStyle={styles.listItem}
                                    title={item["title"]}
                                    titleStyle={styles.listTitle}
                                    titleNumberOfLines={3}
                                    onPress={() => this.alertBrowser(item["link"])} />
                        )}
                        <View style={styles.listItem} />
                    </List>
                    <View>
                        <Text
                            style={[styles.title, styles.button]}
                            onPress={() => this.alertBrowser(links[4])}>MORE EVENTS</Text>
                    </View>
                </Card>

                <Card containerStyle={[themeStyles.card, themeStyles.shadowed, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/news.png')} />
                        <View>
                            <Text style={styles.title}>Recent News</Text>
                        </View>
                    </View>

                    <List containerStyle={styles.list}>
                        { news["news"]["items"].map((item, key) =>
                            <ListItem
                                key={item["guid"]}
                                containerStyle={styles.listItem}
                                title={item["title"]}
                                titleStyle={styles.listTitle}
                                titleNumberOfLines={3}
                                onPress={() => this.alertBrowser(item["link"])}
                                subtitle={item["content"].replace(/<[^>]+>/g, '')}
                                subtitleStyle={styles.subtitle}
                                subtitleNumberOfLines={3} />,
                        )}
                        <View style={styles.listItem} />
                    </List>
                    <View>
                        <Text
                            style={[styles.title, styles.button]}
                            onPress={() => this.alertBrowser(links[5])}>MORE NEWS</Text>
                    </View>
                </Card>
                <View style={{paddingTop:5}} />
            </ScrollView>
        );

    }
}

/* Function to prevent StackNavigator from navigating multiple times 
 * when navigate button is pressed in succession
 * (note that function also must be called below) */
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;

    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

const SustainStack = StackNavigator({
    Sustain: {
        screen: SustainListView,
        navigationOptions: () => ({
            title: 'Learn More',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: styles.navHeader,
            headerTitleStyle: styles.headerTitle,
            headerBackTitleStyle: styles.headerTitle,
            headerBackTitle: 'Back',
        }),
    }
});

// Calls the function that prevents multiple navigations
SustainStack.router.getStateForAction = navigateOnce(SustainStack.router.getStateForAction);

const styles = StyleSheet.create({
    navHeader: {
        backgroundColor: '#0B5091',
    },
    card: {
        paddingTop: 0,
        marginBottom: 5,
    },
    header: {
        marginBottom: 25,
        paddingLeft: 18,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        marginBottom: 3,
        paddingRight: 25,
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        textAlign: 'right',
        ...Platform.select({
            android: { color: '#529353' },
            ios: { color: '#0b5091' },
        }),
    },
    image: {
        width: moderateScale(40),
        height: moderateScale(40),
    },
    list: {
        marginBottom: 12,
        marginTop: -15,
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 0,
        borderTopWidth: 0,
    },
    listItem: {
        ...Platform.select({
            android: { marginRight: -5, },
        }),
        borderColor: '#cbd2d9',
        borderBottomColor: '#cbd2d9',
        borderBottomWidth: 0,
        borderTopWidth: 2*StyleSheet.hairlineWidth,
    },
    title: {
        paddingLeft: 12,
        paddingTop: 3,
        fontSize: moderateScale(18),
        fontWeight: 'normal',
        color: 'darkslategrey',
    },
    listTitle: {
        color: 'darkslategrey',
        marginLeft: 3,
    },
    subtitle: {
        color: 'slategray',
        fontWeight: 'normal',
        fontStyle: 'italic',
        marginLeft: 3,
    },
    headerTitle: {
        fontFamily: themeStyles.font,
    },
});

export default SustainStack;
