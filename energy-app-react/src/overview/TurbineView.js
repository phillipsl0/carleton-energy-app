import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Platform, Text, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';


import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { fake } from './OverviewExampleData'
import { moderateScale, verticalScale, roundNumber } from './../helpers/General';
import CurrFont from './../styling/CurrentFont';

const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';
const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        currentData: state.data.currentData,
    }),
)

export default class Windmill extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { width, height } = Dimensions.get('window');

        const { currentData } = this.props;
        var turbineTotal = Math.round(currentData.turbine[0]["y"]+currentData.turbine[1]["y"]);

        return (
            <View style={[styles.main]}>
                <ImageBackground source={require('./../assets/windmillFull.png')}
                    resizeMode="cover"
                    style={[{ width: width + 5, height: width*.8}, styles.image, styles.head]}>
                <Text style={[styles.units, theme.fontRegular]}>
                    Currently generating
                </Text>
                <Text style={[styles.number, theme.fontBold]}>
                    {roundNumber(turbineTotal)}
                </Text>
                <Text style={[styles.units, theme.fontRegular]}>
                    kWh
                </Text>
                </ImageBackground>
                <List style={styles.list}>
                  {
                    fake.map((item, i) => (
                      <ListItem
                        style={styles.listItem}
                        key={i}
                        title={item.title}
                        rightTitle={item.x}
                        rightTitleStyle={{ color: '#647C92', marginRight: 5 }}
                        chevronColor={'transparent'}
                        fontFamily={defaultFontBold}
                        leftIcon={{name: item.icon, type: 'material-community', color: '#647C92'}}
                      />
                    ))
                  }
                </List>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        marginLeft: '2%',
        marginTop: '15%',
        width: moderateScale(320),
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: moderateScale(70),
        backgroundColor: 'transparent',
        color: 'white',
    },
    units: {
        fontSize: moderateScale(20),
        backgroundColor: 'transparent',
        color: 'white',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        left: '-1%',
        top: '-3%'
    },

    main: {
        backgroundColor: '#E1E8EE',
    },
    head: {
        ...Platform.select({
            android: {
                height: verticalScale(290),
                top: '-5%'
            }
        })
    },
    list: {
//        borderTopColor: "#FFFFFF",
//        borderTopWidth: 1,
        marginTop: 0,
        backgroundColor: '#E1E8EE',
        ...Platform.select({
            ios: {
                paddingTop: '0x%',
            }
        })
    },

    listItem: {
        backgroundColor: '#E1E8EE',
        paddingTop: '4%',
        paddingBottom: '4%',
        paddingRight: '4%',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,

    },

})