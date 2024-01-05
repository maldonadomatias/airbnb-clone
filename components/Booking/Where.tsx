import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
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
} from "./Booking.styled";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  openCard: number;
  setOpenCard: React.Dispatch<React.SetStateAction<number>>;
  selectedPlace: number;
  setSelectedPlace: React.Dispatch<React.SetStateAction<number>>;
}

const Where: React.FC<Props> = ({
  openCard,
  setOpenCard,
  selectedPlace,
  setSelectedPlace,
}) => {
  return (
    <Card>
      {openCard != 0 && (
        <CardPreview
          onPress={() => setOpenCard(0)}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <PreviewText>Where</PreviewText>
          <PreviewData>I'm flexible</PreviewData>
        </CardPreview>
      )}

      {openCard == 0 && <CardHeader>Where to?</CardHeader>}
      {openCard == 0 && (
        <CardBody entering={FadeIn} exiting={FadeOut}>
          <SearchSection>
            <SearchIcon name="ios-search" size={20} color="#000" />
            <InputField
              placeholder="Search destinations"
              placeholderTextColor={Colors.grey}
            />
          </SearchSection>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row", gap: 25 }}
          >
            {places.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedPlace(index)}
                key={index}
              >
                <Place
                  source={item.img}
                  style={
                    selectedPlace == index
                      ? { borderColor: Colors.grey, borderWidth: 2 }
                      : {}
                  }
                />
                <Text style={{ fontFamily: "mon", paddingTop: 6 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CardBody>
      )}
    </Card>
  );
};

export default Where;
