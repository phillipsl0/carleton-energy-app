import { StyleSheet, Platform } from 'react-native'

import CurrFont from './../styling/CurrentFont';
import { moderateScale, verticalScale } from './../helpers/Scaling';


const lightBlue = '#e1e8ee';
const mediumBlue = '#B9C8D6';
const carletonBlue = '#0B5091';

const fontFamily = 'lato';
const font = fontFamily+'-regular';
const boldFont = fontFamily+'-bold';

const DefaultTheme = StyleSheet.create({
    button: {
        marginTop: '3%',
    },
  
    card: {
        backgroundColor: 'white',
        borderColor: lightBlue,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,

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
        flex: 1.0,
        flexDirection: 'row',
        alignItems: 'center',

    },

    flexButtons: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: '10%',
        marginRight: '10%',
        borderRadius: 10,
        justifyContent: 'space-between'
    },

    flexBoxColumn: {
        flex: 1.0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    flex: {
        flex: 1.0,
    },

    fontBold: {
        fontFamily: boldFont,
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
                height: verticalScale(160),
            },
            android: {
                height: verticalScale(160),
                width: 412,
            }
        })
    },

    lightBlueBackground: {
        backgroundColor: lightBlue,
    },

    list: {
        backgroundColor: 'white',
        // marginLeft: '3%',
        // marginRight: '3%',
    },

    listItem: {
        borderColor: '#cbd2d940', 
        borderBottomWidth: StyleSheet.hairlineWidth
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
                elevation: 1,

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

    subtitle: {
        color: 'slategray',
        fontWeight: 'normal',
        fontStyle: 'italic',
    },
    
    title: {
        color: 'darkslategrey'
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

export default {DefaultTheme, fontFamily, font, boldFont}