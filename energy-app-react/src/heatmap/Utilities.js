import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Heading, Overlay } from 'react-native';
import { getCurrentBuildingUtilityConsumption, getUtilitiesList } from './../helpers/ApiWrappers.js';
import { Button } from 'react-native-elements'

const UTILITIES = getUtilitiesList();

// const OverlayUtilities = ({ onUtilityelect }) => (
//     <Overlay styleName="fill-parent">
//         <Heading style={{marginBottom: 15}}>What do you feel like?</Heading>
//         {UTILITIES.map(utility => (
// 			<Button
// 				onPress={() => onUtilitySelect(utility)}
// 				key={utility}
// 				title={utility}
// 				styleName="muted">
// 			</Button>
//         ))}
//     </Overlay>
// );

// Generates horizontal buttons that fill the screen, side by side
const BottomUtilities = ({ onUtilitySelect }) => (
	<View style={styles.container}>
		{UTILITIES.map(utility => (
			<View style={styles.buttonContainer} key={utility + " bottom view"}>
				<Button
					onPress={() => onUtilitySelect(utility)}
					key={utility}
					title={utility}
				  	backgroundColor={'#ffffff'}
				  	color={'blue'}
					/>
			</View>
		))}
	</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    position: 'absolute'
  },
  buttonContainer: {
    flex: 1,
  }
});

export default BottomUtilities;