import { StackNavigator } from "react-navigation";
import LandingScreen from '../src/Screens/LandingScreen'


const Nav = StackNavigator(
    {
        LandingScreen: {
            screen: LandingScreen
        },


    },
    {
        initialRouteName: "LandingScreen",


        headerMode: 'none'
    }

);

export default Nav;