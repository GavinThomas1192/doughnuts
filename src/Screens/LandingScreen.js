import React from 'react'
import { View, Text, StyleSheet, Image, Platform, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'

class LandingScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            doughnutData: '',
            loading: true
        }
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            try {
                fetch('https://private-bb68d-apchallenge.apiary-mock.com/donuts')
                    .then(response =>
                        response ?
                            response.json().then(jsonObj => this.setState({ doughnutData: jsonObj.types }, () => {
                                this.setState({ loading: false })
                            }))
                            : console.log('Whoops the response is null')
                    )
            } catch (error) { return console.log('Unexpected Error', error) }

        })



    }
    render() {
        console.disableYellowBox = true;
        console.ignoredYellowBox = ['Remote debugger'];
        return (
            <View style={styles.mainContainer}>
                {Platform.OS === 'ios'
                    ? <SafeAreaView
                        style={{
                            backgroundColor: 'black',
                            height: 5,
                        }}>
                        <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />

                    </SafeAreaView>
                    : undefined}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Welcome to the Doughnut Shop!</Text>
                </View>
                <View style={styles.listContainer}>
                    {this.state.loading ?
                        <Text>loading</Text>
                        :
                        this.state.doughnutData.map((ele, index) => {
                            console.log(ele.img)


                            return <View style={styles.individualDoughnutPreviewContainer}>
                                <Image resizeMethod='resize' style={styles.doughnutPreview} source={ele.img[4] !== 's' ?
                                    { uri: 'https://thumbs.dreamstime.com/b/cute-ice-lolly-error-page-not-found-message-image-melting-icrecream-69635826.jpg' } : { uri: ele.img }} alt={"A delicious Doughnut"} />
                                <Text>{ele.name}</Text>
                            </View>
                        })

                    }
                </View>
            </View>
        )
    }
}

export default withNavigation(LandingScreen)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    titleContainer: {
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 24
    },
    individualDoughnutPreviewContainer: {
        width: Dimensions.get('window').width,
        paddingRight: 20,
        paddingLeft: 20
    },
    doughnutPreview: {
        height: 75,
        width: 75
    }
})