
export default class GraphDetailCard extends Component {
    constructor(props) {
            super(props);

            this.state = {
                view: 'day',
                viewNumber: 7,
                selectedCard: 1,
            };
        }
    render()
    getGraphScope = () => {
            graphData = navigation.state.params.data.comparison;

            if (this.state.view == 'day') {
                return graphData.day.graph;
            } else if (this.state.view == 'week') {
                return graphData.week.graph;
            } else if (this.state.view == 'month') {
                return graphData.month.graph;
            } else if (this.state.view == 'year') {
                 return graphData.year.graph;
            }
        }

        getRanking = () => {
            graphData = navigation.state.params.data.comparison;

            if (this.state.view == 'day') {
                return graphData.day.ranking;
            } else if (this.state.view == 'week') {
                return graphData.week.ranking;
            } else if (this.state.view == 'month') {
                return graphData.month.ranking;
            } else if (this.state.view == 'year') {
                 return graphData.year.ranking;
            }
        }


<View style={styles.graphContainer}>
                     <Graph
                         theme={CustomThemes.carleton}
                         height={300}
                         width={375}
                         type={'scatter'}
                         graphData={data}/>
                 </View>
                 <View style={styles.flexbox}>
                 <Button
                     fontSize={10}
                     title='D'
                     borderRadius={10}
                     color={this.state.view == 'day' ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.view == 'day' ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'day', viewNumber: 7 })}
                 />
                 <Button
                     fontSize={10}
                     title='W'
                     borderRadius={10}
                     color={this.state.view == 'week' ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.view == 'week' ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'week', viewNumber: 4 })}
                 />
                 <Button
                     fontSize={10}
                     title='M'
                     borderRadius={10}
                     color={this.state.view == 'month' ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.view == 'month' ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'month', viewNumber: 12 })}
                 />
                 <Button
                     fontSize={10}
                     title='Y'
                     borderRadius={10}
                     color={this.state.view == 'year' ? 'white' : '#9E9E9E'}
                     backgroundColor={this.state.view == 'year' ? '#0B5091' : 'white'}
                     style={styles.button}
                     onPress={()=> this.setState({ view: 'year', viewNumber: 5 })}
                 />

                 </View>
}