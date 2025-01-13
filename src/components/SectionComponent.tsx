import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { globalstyles } from "../styles/globalStyles";

interface Props {
    children: ReactNode;
    styles?: StyleProp<ViewStyle>;
}
const SectionComponent = (props: Props) => {
    const { children, styles } = props;
    return <View style={[globalstyles.section, styles]}>{children}</View>;
};
export default SectionComponent;