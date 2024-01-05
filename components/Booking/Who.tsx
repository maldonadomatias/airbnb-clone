import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardPreview,
  PreviewText,
  PreviewData,
  GuestItem,
} from "./Booking.styled";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Colors from "@/constants/Colors";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const guestGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

interface Props {
  openCard: number;
  setOpenCard: React.Dispatch<React.SetStateAction<number>>;
}

const Who: React.FC<Props> = ({ openCard, setOpenCard }) => {
  const [groups, setGroups] = useState(guestGroups);
  return (
    <Card>
      {openCard != 2 && (
        <CardPreview
          onPress={() => setOpenCard(2)}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <PreviewText>Who</PreviewText>
          <PreviewData>Add guests</PreviewData>
        </CardPreview>
      )}

      {openCard == 2 && <CardHeader>Who's coming?</CardHeader>}

      {openCard == 2 && (
        <CardBody>
          {groups.map((item, index) => (
            <GuestItem
              key={index}
              style={[
                index + 1 < guestGroups.length
                  ? {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: Colors.grey,
                    }
                  : null,
              ]}
            >
              <View>
                <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    fontSize: 14,
                    color: Colors.grey,
                  }}
                >
                  {item.text}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const newGroups = [...groups];
                    newGroups[index].count =
                      newGroups[index].count > 0
                        ? newGroups[index].count - 1
                        : 0;

                    setGroups(newGroups);
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={26}
                    color={groups[index].count > 0 ? Colors.grey : "#cdcdcd"}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "mon",
                    fontSize: 16,
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {item.count}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const newGroups = [...groups];
                    newGroups[index].count++;
                    setGroups(newGroups);
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={26}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              </View>
            </GuestItem>
          ))}
        </CardBody>
      )}
    </Card>
  );
};

export default Who;
