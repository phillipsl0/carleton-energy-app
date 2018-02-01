import { StyleSheet, Platform } from 'react-native'

// import CurrFont from './../styling/CurrentFont';

const lightBlue = '#e1e8ee';
const mediumBlue = '#B9C8D6';
const carletonBlue = '#0B5091';

const fontFamily = 'lato';
const font = fontFamily+'-regular';
const fontBold = fontFamily+'-bold';


const DefaultTheme = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderColor: lightBlue,

        ...Platform.select({
              ios: {
                shadowColor: 'rgba(0,0,0, .2)',
              },})
    },

    carletonBlueBackground: {
        backgroundColor: carletonBlue,
    },

    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        backgroundColor: '#F5FCFF',
    },

    flexboxRow: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1.0,
        marginLeft: '10%',
        marginRight: '10%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    flex: {
        flex: 1.0,
    },

    fontBold: {
        fontFamily: fontBold,
    },

    fontRegular: {
        fontFamily: font,
    },

    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        opacity: 0.5,
        ...Platform.select({
            ios: {
                height: 147,
            },
            android: {
                height: 163,
                width: 412,
            }
        })
    },

    lightBlueBackground: {
        backgroundColor: lightBlue,
    },

    list: {
        backgroundColor: 'white',
    },

    listItem: {
        borderBottomColor: '#c8c7cc',
    },

    shadowed: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: mediumBlue,
                shadowOffset: { height: 0, width: 0 },
            },
            android: {
                elevation: 3,

            },
        }),
    },

    singleView: {
        borderBottomColor: mediumBlue,
        borderBottomWidth: 1,
        paddingBottom: '3%',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '3%',
    },

    translucent: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    translucentText: {
        fontFamily: font,
        color: 'rgba(255, 255, 255, 0.75)',
        backgroundColor: 'transparent',
    }

})

export default {DefaultTheme, fontFamily, font, fontBold}