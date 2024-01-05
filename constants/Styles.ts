import styled from "styled-components/native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

export const Container = styled.View`
  flex: 1;
  background-color: #fdffff;
`;

export const InputField = styled.TextInput`
  height: 44px;
  border-width: 1px;
  border-color: #ababab;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${Colors.primary};
  height: 50px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: mon-b;
`;

export const ButtonIcon = styled(Ionicons)`
  position: absolute;
  left: 16px;
`;

export const Footer = styled(Animated.View)`
  position: absolute;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-top-color: ${Colors.grey};
  border-top-width: 1px;
`;
