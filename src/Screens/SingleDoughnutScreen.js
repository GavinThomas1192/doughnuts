import React from 'react';
import {
    ScrollView,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import {
    RkCard,
    RkText,
    RkStyleSheet,
} from 'react-native-ui-kitten';

class SingleDoughnutScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Doughy Goodness',
        headerStyle: { backgroundColor: '#6200EE' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: Platform.OS === 'ios' ? 'white' : undefined,
        headerLeft: Platform.OS === 'android' ? null : undefined
    })


    render() {
        const singleDoughnutData = this.props.navigation.state.params.doughnut
        return (
            <View>
                <ScrollView style={styles.root}>
                    <RkCard style={styles.card} rkType='article'>
                        <Image rkCardImg source={singleDoughnutData.img[4] !== 's' ? { uri: 'https://thumbs.dreamstime.com/b/cute-ice-lolly-error-page-not-found-message-image-melting-icrecream-69635826.jpg' } : { uri: singleDoughnutData.img }} />
                        <View rkCardHeader>
                            <View>
                                <RkText style={styles.title} rkType='header4'>{singleDoughnutData.name}</RkText>
                            </View>
                        </View>
                        <View rkCardContent>
                            <View>
                                <RkText style={styles.descriptionText} rkType='primary3 bigLine'>{singleDoughnutData.description}</RkText>
                            </View>
                        </View>
                        <View rkCardFooter>
                            <RkText style={styles.descriptionText}>27 Likes</RkText>
                        </View>
                    </RkCard>
                </ScrollView>
            </View>
        )
    }
}

export default SingleDoughnutScreen

let styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: '#BB86FC',
        height: Dimensions.get('window').height
    },
    title: {
        marginBottom: 5,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    descriptionText: {
        color: 'white'
    },

    card: {
        backgroundColor: '#BB86FC'
    },
    mainContainer: {
        backgroundColor: '#6200EE'
    }
}));