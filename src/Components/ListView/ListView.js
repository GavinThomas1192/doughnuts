import React from 'react';
import {
    FlatList,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import {
    RkText,
    RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            doughnutData: ''

        }
    }



    handleFavorite = async (item) => {
        this.setState({ favorite: !this.state.favorite })
        this.props.data.map((ele, index) => {
            ele.name === item.name ? ele.favorite = true : undefined
        })
    }

    renderItem = (info) => {
        return (
            <TouchableOpacity
                delayPressIn={70}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('SingleDoughnutScreen', { doughnut: info.item })}>
                <RkCard rkType='horizontal' style={styles.card}>
                    <Image rkCardImg source={info.item.img[4] !== 's' ? { uri: 'https://thumbs.dreamstime.com/b/cute-ice-lolly-error-page-not-found-message-image-melting-icrecream-69635826.jpg' } : { uri: info.item.img }} alt={"A delicious Doughnut"} />

                    <View style={styles.cardContent} rkCardContent>
                        <RkText style={styles.text} numberOfLines={1} rkType='header6'>{info.item.name}</RkText>
                        <TouchableOpacity onPress={() => this.handleFavorite(info.item)}>
                            <Icon name={info.item.favorite ? 'heart' : 'heart-outline'} size={30} color="#03DAC6" />
                        </TouchableOpacity>
                    </View>


                </RkCard>
            </TouchableOpacity>
        )
    }

    render() {
        return (

            <FlatList
                extraData={this.state}
                data={this.props.data}
                renderItem={this.renderItem}
                style={styles.container} />

        )
    }
}


const styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 14
    },
    card: {
        marginVertical: 8,
        backgroundColor: '#BB86FC'
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    post: {
        marginTop: 13,
        color: 'white'
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
}));

export default withNavigation(ListView)