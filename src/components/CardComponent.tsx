import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { globalstyles } from "../styles/globalStyles";
import { appColors } from "../constants/appColors";

interface Props {
    children: ReactNode;
    bgColor?: string;
    styles?: StyleProp<ViewStyle>;
}
const CardComponent = (props: Props) => {
    const { children, bgColor, styles } = props;
    return (
        <TouchableOpacity
            style={[
                globalstyles.shadow,
                globalstyles.card,
                {
                    backgroundColor: bgColor ?? appColors.white,
                },
                styles,
            ]}>
            {children}
        </TouchableOpacity>
    );
};
export default CardComponent;