import { StyleSheet, Platform } from 'react-native'

const DefaultTheme = StyleSheet.create({
    containerColoring: {
        backgroundColor: '#F5FCFF',
    },
    cardContainerColoring: {
        backgroundColor: 'white',
        borderColor: '#e1e8ee',
        ...Platform.select({
              ios: {
                shadowColor: 'rgba(0,0,0, .2)',
              },})
    },
    listColoring: {
        backgroundColor: 'white',
    },
    listItemColoring: {
        borderBottomColor: '#c8c7cc',
    }

})

export default DefaultTheme