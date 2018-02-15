import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text } from 'react-native';
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
        
        const { currentData } = this.props;
        var turbineTotal = Math.round(currentData.turbine[0]["y"]+currentData.turbine[1]["y"]);

        return (
            <View style={[theme.flex, styles.background]}>
            <View style={[styles.background, styles.head, {alignItems: 'center'}]}>
                <Image source={require('./../assets/windmill.png')}
                    style={[theme.header, styles.image]}/>
                <View style={styles.textContainer}>
                <Text style={[styles.units, theme.fontRegular]}>
                    Currently generating
                </Text>
                <Text style={[styles.number, theme.fontBold]}>
                    {roundNumber(turbineTotal)}
                </Text>
                <Text style={[styles.units, theme.fontRegular]}>
                    kWh
                </Text>
                </View>
                </View>
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
        height: verticalScale(310),
        left: -2,
        opacity: 0.9,
        ...Platform.select({
            android: {
                top: '-5%',
                width: 415,
                height: verticalScale(350),
            }
        }),
    },
    main: {
        backgroundColor: '#E1E8EE',
    },
    head: {
        height: verticalScale(310),
        ...Platform.select({
            android: {
                height: verticalScale(310),
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
                paddingTop: '2%',
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