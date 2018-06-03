import React from 'react'
import { Platform, StyleSheet, View, Text, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS } from 'react-native';

export default class ProgressBar extends React.Component {
    constructor() {
        super();

        this.state = {

            Progress_Value: 0.00
        }
    }

    componentDidMount() {
        this.Start_Progress()
    }

    componentWillUnmount() {
        this.setState({ Progress_Value: 1 })
        clearInterval(this.value)

    }

    Start_Progress = () => {

        this.value = setInterval(() => {
            this.state.Progress_Value <= 1 ? this.setState({ Progress_Value: this.state.Progress_Value + .01 }) : undefined
        }, 100);

    }

    render() {
        return (
            <View style={styles.MainContainer}>
                {
                    (Platform.OS === 'android')
                        ?
                        (<ProgressBarAndroid styleAttr="Horizontal" progress={this.state.Progress_Value} indeterminate={false} />)
                        :
                        (<ProgressViewIOS progress={this.state.Progress_Value} />)
                }

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                paddingTop: (Platform.OS === 'ios') ? 70 : 50,
                margin: 20
            },

        button: {

            width: '100%',
            backgroundColor: '#00BCD4',
            borderRadius: 5,
            padding: 10,
            marginTop: 10,

        },

        TextStyle: {
            color: '#fff',
            textAlign: 'center',
        }
    });