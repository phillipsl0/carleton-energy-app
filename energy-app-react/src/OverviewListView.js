import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button } from 'react-native-elements'
import OverviewCards from './OverviewCards'

class OverviewListView extends Component {
    static navigationOptions = {
        title: 'Overview'
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 3,
              width: "86%",
              backgroundColor: "whitesmoke",
              marginLeft: "0%"
            }}
          />
        );
      };

    render() {
        const {navigate} = this.props.navigation;

       return (
         <List
           style={styles.list}>
           <FlatList
             data={OverviewCards}
             ItemSeparatorComponent={this.renderSeparator}
             keyExtractor={item => item.title}
             renderItem={({ item }) => (
               <ListItem
                 style={styles.listItem}
                 onPress={() => this.props.navigation.navigate('CardView', {item:item})}
                 title={item.title}
               />
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
            <View style={styles.view}>
                <Text>Hello</Text>
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
  card: {
    paddingTop: 20,
  },
  list: {
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
})

export default OverviewStack