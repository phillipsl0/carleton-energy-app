import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button } from 'react-native-elements'
import OverviewCards from './OverviewCards'
import Graph from './visualizations/Graph'
import { VictoryContainer, VictoryChart } from "victory-native";
import Svg from "react-native-svg";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { scale, moderateScale, verticalScale} from './helpers/Scaling';


class OverviewListView extends Component {
    static navigationOptions = {
        title: 'Overview'
    }


    render() {
        const {navigate} = this.props.navigation;

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
                    graphData={item.data}
                 />
                 <Button
                    rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                    fontSize={20}
                    title='More'
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('CardView', {item:item})}
                 />
               </Card>
             )}
           />
         </List>
       );
     }
}

class CardView extends Component {
    render() {
        const {state} = this.props.navigation;
        return (
            <View style={styles.container}>
                 <Graph
                    type={this.props.navigation.state.params.item.graphType}
                    graphData={this.props.navigation.state.params.item.data}
                 />
            </View>
        );
    }
}

const OverviewStack = StackNavigator({
    OverviewListView: {
        screen: OverviewListView,
    },
    CardView: {
        path: 'OverviewCards/:title',
        screen: CardView,
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
  listItem: {
    height: 100,
    paddingBottom: 20
  },
  view: {
    alignItems: 'center',
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
  button: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
})

export default OverviewStack