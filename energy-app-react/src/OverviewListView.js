import React from 'react';
import { FlatList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OverviewCards from './OverviewCards'
import Graph from './visualizations/Graph'

const OverviewListView = ({navigation}) => {
   return (
     <List
       style={styles.list}>
       <FlatList
         data={OverviewCards}
         keyExtractor={item => item.title}
         renderItem={({ item }) => (
           <Card
             containerStyle={styles.cardContainer}
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
    return (
        <View style={styles.container}>
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
      backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#e1e8ee',
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
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
      backgroundColor: 'white',
  },
  button: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
})

export default OverviewStack