import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, Picker, Item, Platform } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import buildings from './Buildings';
import OverviewCards from './overview/OverviewCards';
import ComparisonPage from './ComparisonPage';
import { GetStyle } from './styling/Themes';
import CurrTheme from './styling/CurrentTheme';

class BuildingComparison extends Component {
  static navigationOptions = {
        title: 'Building Comparison'
    }
  
  constructor(props){
      super(props);

   this.state = {
      building1: 'Burton',
      building2: 'Burton',
   }
   
}
  

  render() {
    const themeStyles = GetStyle(CurrTheme);
    const { navigate } = this.props.navigation;
    
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        paddingTop: 50,
      }}>
        <View style={{width: 190, height: 250}}>
        <Card
           containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
          <Picker selectedValue={this.state.building1}
            onValueChange={(itemValue, itemIndex) => this.setState({building1: itemValue})}>
            <Picker.Item label="Burton" value="Burton" />
            <Picker.Item label="Sayles" value="Sayles" />
            <Picker.Item label="Severence" value="Severence" />
            <Picker.Item label="Davis" value="Davis" />
            <Picker.Item label="Musser" value="Musser" />
            <Picker.Item label="Myers" value="Myers" />
            <Picker.Item label="Cassat" value="Cassat" />
            <Picker.Item label="Memo" value="Memo" />
            <Picker.Item label="Nourse" value="Nourse" />
            <Picker.Item label="Evans" value="Evans" />
            <Picker.Item label="Goodhue" value="Goodhue" />
            <Picker.Item label="Watson" value="Watson" />
            <Picker.Item label="Scoville" value="Scoville" />
        </Picker>
        </Card>
        </View>
        <View style={{width: 190, height: 250}}>
        <Card
           containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
          <Picker selectedValue={this.state.building2}
            onValueChange={(itemValue, itemIndex) => this.setState({building2: itemValue})}>
            <Picker.Item label="Burton" value="Burton" />
            <Picker.Item label="Sayles" value="Sayles" />
            <Picker.Item label="Severence" value="Severence" />
            <Picker.Item label="Davis" value="Davis" />
            <Picker.Item label="Musser" value="Musser" />
            <Picker.Item label="Myers" value="Myers" />
            <Picker.Item label="Cassat" value="Cassat" />
            <Picker.Item label="Memo" value="Memo" />
            <Picker.Item label="Nourse" value="Nourse" />
            <Picker.Item label="Evans" value="Evans" />
            <Picker.Item label="Goodhue" value="Goodhue" />
            <Picker.Item label="Watson" value="Watson" />
            <Picker.Item label="Scoville" value="Scoville" />
        </Picker>
        </Card>
        </View>
      </View>
      <View>
      <Button
        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
        fontSize={20}
        title='Compare'
        containerViewStyle={styles.button}
        backgroundColor='#0B5091'
        onPress={() => navigate("Comparison", {screen: "ComparisonPage", building1:this.state.building1, building2:this.state.building2})}/>
      </View>
      </View>
    );
  }
};

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

const ComparisonStack = StackNavigator({
    BuildingComparison: {
        screen: BuildingComparison,
        navigationOptions: ({ navigation }) => ({
            title: 'Building Comparison',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    }, 
    Comparison: {
        screen: ComparisonPage,
        navigationOptions: ({ navigation }) => ({
            title: 'Compare',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    },
});

const styles = StyleSheet.create({
  card: {
    paddingBottom: 30,
    backgroundColor: 'yellow',
  },
  bigyellow: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 30
    },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
    },
    head: {
      backgroundColor: 'grey',
    },
  button: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 100,
  },
  table: { 
    width: 250,
    marginLeft: 5, 
    
  },
  text: { 
    alignSelf: 'center',
    marginLeft: 5, 
    fontSize: 18,
  },
  listItem: {
    height: 50,
    backgroundColor: 'aqua',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 190,
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 55,

  },
  listItem2: {
    height: 50,
    backgroundColor: 'yellow',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 190,
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
  row: {
    backgroundColor: 'orange',
  },
  view: {
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
})


export default ComparisonStack;