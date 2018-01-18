import { StyleSheet, Platform } from 'react-native'

const DefaultTheme = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    card: {
        backgroundColor: 'white',
        borderColor: '#e1e8ee',
        ...Platform.select({
              ios: {
                shadowColor: 'rgba(0,0,0, .2)',
              },})
    },
    cardFocused: {
        backgroundColor: '#0B5091'
    },
    list: {
        backgroundColor: 'white',
    },
    listItem: {
        borderBottomColor: '#c8c7cc',
    }

})

export default DefaultTheme