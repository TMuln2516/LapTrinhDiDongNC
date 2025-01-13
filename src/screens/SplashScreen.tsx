import { Text } from "@react-navigation/elements"
import { ActivityIndicator, Image, ImageBackground, View } from "react-native"
import SpaceComponent from "../components/SpaceComponent";
import { appInfo } from "../constants/appInfos";
import { appColors } from "../constants/appColors";

const SplashScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/images/splash-img.png')}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            imageStyle={{ flex: 1 }}>
            <Image
                source={require('../assets/images/logo.png')}
                style={{
                    width: appInfo.sizes.WIDTH * 0.7,
                    resizeMode: 'contain',
                }}
            />
            <SpaceComponent height={16} />
            <ActivityIndicator color={appColors.gray} size={22} />
        </ImageBackground>
    );
}

export default SplashScreen;