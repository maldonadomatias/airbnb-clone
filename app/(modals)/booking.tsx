import { View, Text } from "react-native";
import { useState } from "react";
import { SlideInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import styled from "styled-components/native";

import { Button, ButtonIcon, ButtonText, Footer } from "@/constants/Styles";

import Where from "@/components/Booking/Where";
import When from "@/components/Booking/When";
import Who from "@/components/Booking/Who";

const Page = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <Container intensity={70} tint="light">
      {/*  Where */}
      <Where
        openCard={openCard}
        setOpenCard={setOpenCard}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />

      {/* When */}
      <When openCard={openCard} setOpenCard={setOpenCard} />

      {/* Who */}
      <Who openCard={openCard} setOpenCard={setOpenCard} />

      {/* Footer */}
      <Footer entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ height: "100%", justifyContent: "center" }}
            onPress={onClearAll}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <Button
            style={[{ paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <ButtonIcon name="search-outline" size={24} color={"#fff"} />
            <ButtonText>Search</ButtonText>
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

const Container = styled(BlurView)`
  flex: 1;
  padding-top: 100px;
`;

export default Page;
