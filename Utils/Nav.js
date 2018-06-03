import { StackNavigator, } from "react-navigation";
import LandingScreen from '../src/Screens/LandingScreen'
import SingleDoughnutScreen from '../src/Screens/SingleDoughnutScreen'

const Nav = StackNavigator(
    {
        LandingScreen: {
            screen: LandingScreen
        },
        SingleDoughnutScreen: {
            screen: SingleDoughnutScreen
        },
    },
    {
        initialRouteName: "LandingScreen",
        headerMode: 'screen',
    }

);

export default Nav;