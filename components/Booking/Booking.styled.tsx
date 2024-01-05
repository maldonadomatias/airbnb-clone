import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Container = styled(BlurView)`
  flex: 1;
  padding-top: 100px;
`;

const Card = styled.View`
  background-color: #fff;
  border-radius: 14px;
  margin: 10px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  shadow-offset: {
    width: 2px;
    height: 2px;
  }
  gap: 20px;
`;

const CardHeader = styled.Text`
  font-family: "mon-b";
  font-size: 24px;
  padding: 20px;
`;

const CardBody = styled(Animated.View)`
  padding: 20px;
`;

const CardPreview = styled(AnimatedTouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const SearchSection = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-width: 1px;
  border-color: #ababab;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const SearchIcon = styled(Ionicons)`
  padding: 10px;
`;

const InputField = styled.TextInput`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;

const Place = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const PreviewText = styled.Text`
  font-family: "mon-sb";
  font-size: 14px;
  color: ${Colors.grey};
`;

const PreviewData = styled.Text`
  font-family: "mon-sb";
  font-size: 14px;
  color: ${Colors.dark};
`;

const GuestItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
`;

export {
  AnimatedTouchableOpacity,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardPreview,
  SearchSection,
  SearchIcon,
  InputField,
  Place,
  PreviewText,
  PreviewData,
  GuestItem,
};
