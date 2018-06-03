import React from 'react'
import { View, Text, StyleSheet, Image, Platform, SafeAreaView, StatusBar, Dimensions, FlatList, ListItem, ScrollView, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import ListView from '../Components/ListView/ListView'
import ProgressBar from '../Components/ProgressBar/ProgressBar'

class LandingScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            doughnutData: '',
            loading: true
        }
    }

    static navigationOptions = {
        header: null
    }
    fetchDoughnutData = () => {
        try {
            fetch('https://private-bb68d-apchallenge.apiary-mock.com/donuts')
                .then(response =>
                    response ?
                        response.json().then(jsonObj => this.setState({ doughnutData: jsonObj.types }, async () => {
                            this.setState({ loading: false })
                            try {
                                await AsyncStorage.setItem('doughnutData', JSON.stringify(this.state.doughnutData));
                            } catch (error) {
                                console.log('Unexpected Error', error)
                            }
                        }))
                        : console.log('Whoops the response is null')
                )
        } catch (error) { return console.log('Unexpected Error', error) }
    }

    componentDidMount = () => {
        this.setState({ loading: true }, async () => {
            try {
                const storedData = await AsyncStorage.getItem('doughnutData');
                storedData !== null ? this.setState({ doughnutData: JSON.parse(storedData), loading: false }) : this.fetchDoughnutData()
            } catch (error) {
                console.log('Error fetching old data!', error)
            }
        })
    }
    render() {
        console.disableYellowBox = true;
        console.ignoredYellowBox = ['Remote debugger'];
        return (
            <View style={styles.mainContainer}>
                <SafeAreaView
                    style={{
                        backgroundColor: "#6200EE",
                        height: 5,
                    }}>
                    <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
                </SafeAreaView>

                <View style={styles.listContainer}>
                    {this.state.loading ?
                        <View style={styles.progressBarContainer}>
                            <ProgressBar />
                        </View>
                        :
                        <ScrollView>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Doughnut Shop!</Text>
                            </View>
                            <ListView data={this.state.doughnutData} />
                        </ScrollView>

                    }
                </View>
            </View >
        )
    }
}

export default withNavigation(LandingScreen)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#6200EE'
    },
    titleContainer: {
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    },
    listContainer: {
        flex: 1
    },
    doughnutPreview: {
        height: 75,
        width: 75
    },
    progressBarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})