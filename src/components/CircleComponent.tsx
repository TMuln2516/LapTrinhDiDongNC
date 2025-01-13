import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { appColors } from "../constants/appColors";

interface Props {
    size?: number;
    children: ReactNode;
    color?: string;
    onPress?: () => void;
    styles?: StyleProp<ViewStyle>;
}
const CircleComponent = (props: Props) => {
    const { size, color, onPress, children, styles } = props;
    const localstyle: any = {
        width: size ?? 40,
        height: size ?? 40,
        backgroundColor: color ?? appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    };
    return onPress ? (
        <TouchableOpacity style={[localstyle, styles]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={[localstyle, styles]}>{children}</View>
    );
};
export default CircleComponent;