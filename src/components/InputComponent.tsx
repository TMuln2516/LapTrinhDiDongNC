import { ReactNode, useState } from "react";
import { KeyboardType, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { appColors } from "../constants/appColors";
import { globalstyles } from "../styles/globalStyles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    value: string;
    onChange: (val: string) => void;
    affix?: ReactNode;
    placeholder?: string;
    suffix?: ReactNode;
    isPassword?: boolean;
    allowClear?: boolean;
    type?: KeyboardType;
    onEnd?: () => void;
}

const InputComponent = (props: Props) => {
    const { onChange, value, affix, allowClear, isPassword, onEnd, placeholder, suffix, type } = props;

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

    return (
        <View style={[styles.inputContainer]}>
            {affix ?? affix}
            <TextInput
                style={[styles.input, globalstyles.text]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
            />
            {suffix ?? suffix}
            <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')} />
            {
                isPassword ? (
                    <FontAwesome
                        name={isShowPass ? 'eye-slash' : 'eye'}
                        size={22}
                        color={appColors.gray} />
                ) : (
                    value.length > 0 && allowClear && (
                        <AntDesign name="close" size={22} color={appColors.text} />
                    )
                )
            }
        </View>
    );
}

export default InputComponent;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: appColors.white,
        marginBottom: 19,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.text,
    },
});