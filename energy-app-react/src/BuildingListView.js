import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements'
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
//                 style={styles.listItem}
                 onPress={() => this.props.navigation.navigate('IndividualBuilding', {item:item})}
                 title={item.name}
                 avatar={<Avatar
                            style={styles.listImg}
                            source={ { uri: item.avatar }}
                            containerStyle={{alignSelf: 'stretch'}}
                            />}
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
    height: 50,
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 55,
  },
  listImg: {
    height: 30,
    alignSelf: 'stretch',
  },
  listText: {
    paddingLeft: 30,
    marginLeft: 30,
    fontSize: 24,
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