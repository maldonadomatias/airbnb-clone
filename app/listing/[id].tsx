import { View, Text, StyleSheet, Dimensions, Share } from "react-native";
import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import listingData from "@/assets/data/airbnb-listings.json";
import { Button, ButtonText, Container, Footer } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const AnimatedImage = styled(Animated.Image)<{ width: number }>`
  width: ${(props) => props.width}px;
  height: ${IMG_HEIGHT}px;
`;

const InfoContainer = styled.View`
  padding: 24px;
  background-color: #fff;
`;

const Name = styled.Text`
  font-size: 26px;
  font-weight: bold;
  font-family: mon-sb;
`;

const Location = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-family: mon-sb;
`;

const Rooms = styled.Text`
  font-size: 16px;
  color: ${Colors.grey};
  margin-vertical: 4px;
  font-family: mon;
`;

const ReviewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Rating = styled.Text`
  font-size: 16px;
  font-family: mon-sb;
`;

const Divider = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${Colors.grey};
  margin-vertical: 16px;
`;

const HostView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const HostImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${Colors.grey};
`;

const Description = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  font-family: mon;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FooterText = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-family: mon-sb;
`;

const FooterPrice = styled.Text`
  font-size: 18px;
  font-family: mon-sb;
`;

const Bar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RoundButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  color: ${Colors.primary};
`;

const AnimatedHeader = styled(Animated.View)`
  background-color: #fff;
  height: 100px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Colors.grey};
`;

const Page: React.FC = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingData as any[]).find((l) => l.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1]),
    };
  });

  const shareListing = async () => {
    try {
      await Share.share({
        message: `Check out this listing on Airbnb: ${listing.name}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => <AnimatedHeader style={headerAnimatedStyle} />,
      headerLeft: () => (
        <RoundButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} />
        </RoundButton>
      ),
      headerRight: () => (
        <Bar>
          <RoundButton onPress={shareListing}>
            <Ionicons name="share-outline" size={24} />
          </RoundButton>
          <RoundButton>
            <Ionicons name="heart-outline" size={24} />
          </RoundButton>
        </Bar>
      ),
    });
  }, []);

  return (
    <Container>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <AnimatedImage
          style={imageAnimatedStyle}
          resizeMode={"cover"}
          source={{ uri: listing.xl_picture_url }}
          width={width}
        />
        <InfoContainer>
          <Name>{listing.name}</Name>
          <Location>
            {listing.room_type} in {listing.smart_location}
          </Location>
          <Rooms>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{" "}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Rooms>
          <ReviewContainer>
            <Ionicons name="star" size={16} />
            <Rating>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews}{" "}
              reviews
            </Rating>
          </ReviewContainer>

          <Divider />
          <HostView>
            <HostImage source={{ uri: listing.host_picture_url }} />
            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </HostView>
          <Divider />

          <Description>{listing.description}</Description>
        </InfoContainer>
      </Animated.ScrollView>

      <Footer entering={SlideInDown.delay(200)}>
        <FooterContainer>
          <FooterText>
            <FooterPrice>${listing.price}</FooterPrice>
            <Text>night</Text>
          </FooterText>
          <Button style={{ paddingHorizontal: 20 }}>
            <ButtonText>Reserve</ButtonText>
          </Button>
        </FooterContainer>
      </Footer>
    </Container>
  );
};

export default Page;
