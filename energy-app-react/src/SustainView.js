import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, Linking, Platform,
    StyleSheet, View, ScrollView, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button } from 'react-native-elements';

import { getSustainabilityEvents, getSustainabilityEventsBak,
    getSustainabilityNews, getSustainabilityNewsBak } from './helpers/ApiWrappers.js';
import { scale, moderateScale, verticalScale} from './helpers/Scaling';
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
                        <ListItem
                            containerStyle={[themeStyles.listItem, styles.listItem]}
                            title={"Our Campus"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[1])} />
                        <ListItem containerStyle={[themeStyles.listItem, styles.listItem]}
                            title={"Take Action"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[2])} />
                        <ListItem containerStyle={[themeStyles.listItem, styles.listItem]}
                            title={"People & Policies"}
                            titleNumberOfLines={3}
                            onPress={() => Linking.openURL(links[3])} />
                    </List>
                </Card>

                <Card containerStyle={[themeStyles.card, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/calendar.png')} />
                        <View>
                            <Text style={[styles.title, themeStyles.title]}>Upcoming Events</Text>
                        </View>
                        <View style={styles.image} />
                    </View>

                    <List containerStyle={styles.list}>
                        { events["events"]["items"].map((item, key) => 
                            item["content"] 
                            ? <ListItem
                                key={item["guid"]}
                                containerStyle={[themeStyles.listItem, styles.listItem]}
                                title={item["title"]}
                                titleNumberOfLines={3}
                                onPress={() => Linking.openURL(item["link"])}
                                subtitleStyle={themeStyles.subtitle}
                                subtitle={item["content"]} />
                            : <ListItem
                                key={item["guid"]}
                                containerStyle={[themeStyles.listItem, styles.listItem]}
                                title={item["title"]}
                                titleNumberOfLines={3}
                                onPress={() => Linking.openURL(item["link"])} />
                            )
                        }
                    </List>
                    <View>
                        <Text 
                            style={[styles.title, themeStyles.title, styles.button]}
                            onPress={() => Linking.openURL(links[4])}>MORE EVENTS</Text>
                    </View>
                </Card>

                <Card containerStyle={[themeStyles.card, styles.card]}>

                    <View style={styles.header} >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require('./assets/news.png')} />
                        <View>
                            <Text style={[styles.title, themeStyles.title]}>Recent News</Text>
                        </View>
                    </View>

                    <List containerStyle={styles.list}>
                        { news["news"]["items"].map((item, key) => 
                            <ListItem
                                key={item["guid"]}
                                containerStyle={[themeStyles.listItem, styles.listItem]}
                                title={item["title"]}
                                titleStyle={themeStyles.title}
                                titleNumberOfLines={3}
                                onPress={() => Linking.openURL(item["link"])}
                                subtitle={item["content"].replace(/<[^>]+>/g, '')}
                                subtitleStyle={themeStyles.subtitle}
                                subtitleNumberOfLines={3} />
                        )}
                    </List>
                    <View>
                        <Text 
                            style={[styles.title, themeStyles.title, styles.button]}
                            onPress={() => Linking.openURL(links[5])}>MORE NEWS</Text>
                    </View>
                </Card>
                <View style={{paddingTop:15}} />
            </ScrollView>
            );

    }
}



const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
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
})

export default SustainStack;
