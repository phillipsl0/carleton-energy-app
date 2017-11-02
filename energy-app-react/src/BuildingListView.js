import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button } from 'react-native-elements'
import buildings from './Buildings'

class BuildingListView extends Component {
    static navigationOptions = {
        title: 'Buildings'
    }

    render() {
        const {navigate} = this.props.navigation;

       return (
         <List>
           <FlatList
             data={buildings}
             keyExtractor={item => item.name}
             renderItem={({ item }) => (
               <ListItem
                 roundAvatar
                 onPress={() => this.props.navigation.navigate('IndividualBuilding', {item:item})}
                 title={item.name}
                 avatar={{ uri: item.avatar }}
               />
             )}
           />
         </List>
       );
     }
}

class IndividualBuilding extends Component {
    render() {
        const {state} = this.props.navigation;
        return (
            <View style={styles.view}>
                <Text>{this.props.navigation.state.params.item.name}</Text>
                <Image
                style = {styles.img}
                source={{ uri: this.props.navigation.state.params.item.avatar }}
                />
            </View>
        );
    }
}

const BuildingStack = StackNavigator({
    Buildings: {
        screen: BuildingListView,
    },
    IndividualBuilding: {
        path: 'buildings/:name',
        screen: IndividualBuilding,
    },
});

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
  },
  listItem: {
    height: 40,
  },
  view: {
    alignItems: 'center',
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
})

export default BuildingStack;