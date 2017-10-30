import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OverviewScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Overview</Text>
  </View>
);

const BuildingsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Buildings</Text>
  </View>
);

const HeatMapScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Heat Map</Text>
  </View>
);

const RootTabs = TabNavigator({
  Overview: {
    screen: OverviewScreen,
    navigationOptions: {
      tabBarLabel: 'Overview',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome name="tachometer" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
      ),
    },
  },
  Buildings: {
    screen: BuildingsScreen,
    navigationOptions: {
      tabBarLabel: 'Buildings',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome name="building" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
      ),
    },
  },
  HeatMap: {
      screen: HeatMapScreen,
      navigationOptions: {
        tabBarLabel: 'Heat Map',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="fire" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        ),
      },
    }
});

export default RootTabs;