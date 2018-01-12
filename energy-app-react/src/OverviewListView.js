import React from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OverviewCards from './OverviewCards'
import Graph from './visualizations/Graph'
import { GetStyle } from './styling/Themes'
import CurrTheme from './styling/CurrentTheme'

const OverviewListView = ({navigation}) => {
    const themeStyles = GetStyle(CurrTheme);

   return (
     <List
       style={styles.list, themeStyles.listColoring}>
       <FlatList
         data={OverviewCards}
         keyExtractor={item => item.title}
         renderItem={({ item }) => (
           <Card
             containerStyle={styles.cardContainer, themeStyles.cardContainerColoring}
             title={item.title}>
             <Graph
                type={item.graphType}
                graphData={item.data}/>
             <Button
                rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                fontSize={20}
                title='More'
                style={styles.button}
                onPress={() => navigation.navigate('CardView',
                                 {graphType:item.graphType, data:item.data, title: item.title})}/>
           </Card>
         )}
       />
     </List>
   );
}

const CardView = ({ navigation }) => {
    const themeStyles = GetStyle(CurrTheme);
    return (
        <View style={themeStyles.containerColoring, styles.container}>
          <Graph
            type={navigation.state.params.graphType}
            graphData={navigation.state.params.data}/>
        </View>
    );
}

const OverviewStack = StackNavigator({
    OverviewListView: {
        screen: OverviewListView,
        navigationOptions: {
            title: 'Overview',
        }
    },
    CardView: {
        path: 'OverviewCards/:title',
        screen: CardView,
        navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title}`,
            }),
    },
});

const styles = StyleSheet.create({
  container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  cardContainer: {
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
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
})

export default OverviewStack