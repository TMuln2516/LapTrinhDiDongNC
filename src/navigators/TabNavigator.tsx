import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, LoginScreen } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator;