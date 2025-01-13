import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "../screens";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;