import React from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart, VictoryTheme } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OverviewCards from './OverviewCards'
import ExampleData from './OverviewExampleData'
import Graph from './../visualizations/Graph'
import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'

const OverviewListView = ({navigation}) => {
    const themeStyles = GetStyle(CurrTheme);

    return (
     <List
       style={[styles.list, themeStyles.list]}>
       <FlatList
         data={ExampleData}
         keyExtractor={item => item.title}
         renderItem={({ item }) => (
           <Card
             containerStyle={[styles.card, themeStyles.card]}
             title={item.title}
             titleStyle={styles.title}>
             <View style={styles.container, themeStyles.container}>
             <Graph
                type={item.graphType}
                theme={VictoryTheme.grayscale}
                graphData={item.data.current}/>
             </View>
             <Button
                rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                fontSize={20}
                title='More'
                containerViewStyle={styles.button}
                backgroundColor='#0B5091'
                onPress={() => navigation.navigate('CardView',
                                 {graphType:item.graphType, data:item.data, title: item.title})}/>
           </Card>
         )}
       />
     </List>
   );
}
const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    }
})

const OverviewStack = StackNavigator({
    OverviewListView: {
        screen: OverviewListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Overview',
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    },
    CardView: {
        path: 'OverviewCards/:title',
        screen: OverviewCards,
        navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title}`,
              headerTintColor: 'white',
              headerStyle: navStyles.header,
            }),
    }},
    {
        headerTintColor: '#0B5091'

    }
);

const styles = StyleSheet.create({
  title: {
  },
  container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  list: {
      flex: 1,
      marginLeft: '3%',
      marginRight: '3%',
  },
  button: {
    marginTop: '3%',
  },
})

export default OverviewStack