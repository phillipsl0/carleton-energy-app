import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Utility from './Utility';

@connect(
    state => ({
        currentData: state.data.currentData,
        loading: state.data.loading,
        layout: state.ui.layout,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

export default class Utilities extends Component {
    constructor(props) {
        super(props);
    }

    sendToParent = ( buttonIndex ) => {
        this.props.callback(buttonIndex);
    }

    getCardData = (data) => {
        var result = new Array(data.length);

        for (var i = 0; i < data.length; i++) {
            var name = {};
            name["name"] = data[i]["x"];
            result[i] = name;
        }

        return result;
    }

    getUtilities() {
        var utilitiesArray = [
          {
            type: "Gas",
            unit: "thm",
            icon: "fire",
          },
          {
            type: "Electric",
            unit: "kWh",
            icon: "lightbulb-o",
          },
          {
            type: "Heat",
            unit: "kBTU",
            icon: "thermometer",
          },
          {
            type: "Water",
            unit: "gal",
            icon: "shower",
          },
          {
            type: "Wind",
            unit: "kWh",
            icon: "leaf",
          },
          {
            type: "Geothermal",
            unit: "kWh",
            icon: "fire",
          },
          {
            type: "Solar",
            unit: "kWh",
            icon: "sun-o",
          }
        ];
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        const { refresh, loading, currentData, layout } = this.props;
        console.log(this.getCardData(currentData));

        return(
        <View style={[themeStyles.flexboxRow, themeStyles.centered]}>
               <Utility index={5}
                    icon={"fire"}
                    utilityType={"Gas"}
                    number={'151'}
                    unit={"thm"}
                    callback={this.sendToParent}
                    selected={this.props.selected}/>

               <Utility index={6}
                  icon={"lightbulb-o"}
                  utilityType={"Electric"}
                  number={'61,178'}
                  unit={"kWh"}
                  callback={this.sendToParent}
                  selected={this.props.selected}/>

                <Utility index={7}
                   icon={"thermometer"}
                   utilityType={"Heat"}
                   number={'6,027,397'}
                   unit={"kBTU"}
                   callback={this.sendToParent}
                   selected={this.props.selected}/>

                <Utility index={8}
                   icon={"shower"}
                   utilityType={"Water"}
                   number={'676,684'}
                   unit={"gal"}
                   callback={this.sendToParent}
                   selected={this.props.selected}/>
        </View>);
    }
}

const styles = StyleSheet.create({

})