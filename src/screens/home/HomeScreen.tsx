import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements"
import { Button, View } from "react-native"

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomeScreen</Text>
            <Button title="Logout"
                onPress={async () =>
                    await AsyncStorage.clear()
                }
            />
        </View>
    );
}

export default HomeScreen;