import { View, Text, ListRenderItem, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Container } from "@/constants/Styles";
import styled from "styled-components/native";

const AnimatedListing = styled(Animated.View)`
  padding: 16px;
  gap: 10px;
  margin-vertical: 16px;
`;

const AnimatedImage = styled(Animated.Image)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const HeartIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  top: 30px;
`;

const Info = styled.Text`
  text-align: center;
  font-family: mon-sb;
  font-size: 16px;
  margin-top: 4px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`;

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <AnimatedListing entering={FadeInRight} exiting={FadeOutLeft}>
          <AnimatedImage source={{ uri: item.medium_url }} />
          <HeartIconContainer>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </HeartIconContainer>
          <TextContainer>
            <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </TextContainer>
          <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
          <PriceContainer>
            <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </PriceContainer>
        </AnimatedListing>
      </TouchableOpacity>
    </Link>
  );

  return (
    <Container>
      <BottomSheetFlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={<Info>{items.length} homes</Info>}
      />
    </Container>
  );
};

export default Listings;
