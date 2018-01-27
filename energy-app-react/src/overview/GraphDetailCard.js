import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import GraphButton from './GraphButton';


export default class GraphDetail extends Component {
    constructor(props) {
            super(props);
    }

    sendToParent = (buttonView, buttonComparator, buttonIndex) => {
        this.props.callback(buttonView, buttonComparator, buttonIndex);
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        return(
            <View style={[themeStyles.singleView, themeStyles.shadowed]}>
                <View pointerEvents="none" style={[styles.graphContainer, themeStyles.centered,
                              themeStyles.translucent]}>
                 <Graph
                     theme={CustomThemes.carleton}
                     height={300}
                     width={375}
                     type={'scatter'}
                     graphData={this.props.data}/>
                <Text style={styles.subHead}>
                    (figures in thousands)
                </Text>
                </View>

                <View style={[themeStyles.flexboxRow, themeStyles.translucent]}>
                    <GraphButton title='D'
                        view='day'
                        comparator={7}
                        index={1}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='W'
                        view='week'
                        comparator={4}
                        index={2}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='M'
                        view='month'
                        comparator={12}
                        index={3}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Y'
                        view='year'
                        comparator={5}
                        index={4}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

               </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    graphContainer: {
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
        marginRight: '3%',
        paddingBottom: '3%',
        borderRadius: 10,
    },
    subHead: {
        fontSize: 10,
        color: '#0B5091',
    }
})