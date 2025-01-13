import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements"
import { useEffect, useState } from "react";
import { Button, Image, Switch, View } from "react-native"
import ContainerComponent from "../../components/ContainerComponent";
import SectionComponent from "../../components/SectionComponent";
import TextComponent from "../../components/TextComponent";
import SpaceComponent from "../../components/SpaceComponent";
import InputComponent from "../../components/InputComponent";
import { appColors } from "../../constants/appColors";
import RowComponent from "../../components/RowComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { Lock, Sms } from 'iconsax-react-native'
import { Validate } from "../../utils/validate";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        const emailValidation = Validate.email(email);
        if (!email || !password || !emailValidation) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);

    return (
        <ContainerComponent isImageBackground isScroll>
            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75,
                }}>
                <Image
                    source={require('../../assets/images/text-logo.png')}
                    style={{
                        width: 162,
                        height:
                            114,
                        marginBottom: 30,
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent size={24} title text="Sign in" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={email}
                    placeholder="Email"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={password}
                    placeholder="Password"
                    onChange={val => setPassword(val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <RowComponent justify="space-between">
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ true: appColors.primary }}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(isRemember)}
                        />
                        <SpaceComponent width={4} />
                        <TextComponent text="Remember me" />
                    </RowComponent>
                    <ButtonComponent
                        text="Forgot Password?"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent>
                <ButtonComponent
                    disable={isDisable}
                    //onPress={handleLogin}
                    text="SIGN IN"
                    type="primary"
                />
            </SectionComponent>
            {/* <SocialLogin /> */}
            <SectionComponent>
                <RowComponent justify="center">
                    <TextComponent text="Don't have an account?" />
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    );
}

export default LoginScreen;