import { ReactNode } from "react";
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { globalstyles } from "../styles/globalStyles";
import { appColors } from "../constants/appColors";
import TextComponent from "./TextComponent";
import { fontFamilies } from "../constants/fontFamilies";

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textstyles?: StyleProp<TextStyle>;
    textFont?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
}

const ButtonComponent = (props: Props) => {
    const { text, color, disable, icon, iconFlex, onPress, styles, textColor, textFont, textstyles, type } = props;

    return type === 'primary' ? (
        <View style={{ alignContent: "center" }}>
            <TouchableOpacity disabled={disable}
                onPress={onPress}
                style={[
                    globalstyles.button,
                    globalstyles.shadow,
                    {
                        backgroundColor: color
                            ? color
                            : disable
                                ? appColors.gray4
                                : appColors.primary,
                        marginBottom: 17,
                        width: "90%",
                    },
                    styles,
                ]}>
                {icon && iconFlex === 'left' && icon}
                <TextComponent
                    text={text}
                    color={textColor ?? appColors.white}
                    styles={[
                        textstyles,
                        {
                            marginLeft: icon ? 12 : 0,
                            fontSize: 16,
                            textAlign: 'center',
                        },
                    ]}
                    flex={icon && iconFlex === 'right' ? 1 : 0}
                    font={textFont ?? fontFamilies.medium}
                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        </View >
    ) : (
        <TouchableOpacity onPress={onPress}>
            <TextComponent
                flex={0}
                text={text}
                color={type === "link" ? appColors.primary : appColors.text}></TextComponent>
        </TouchableOpacity>
    )
}

export default ButtonComponent;