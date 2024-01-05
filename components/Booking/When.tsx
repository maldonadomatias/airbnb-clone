import React from "react";
import DatePicker from "react-native-modern-datepicker";
import { FadeIn, FadeOut } from "react-native-reanimated";

import Colors from "@/constants/Colors";
import {
  Card,
  CardHeader,
  CardBody,
  CardPreview,
  PreviewText,
  PreviewData,
} from "./Booking.styled";

interface Props {
  openCard: number;
  setOpenCard: React.Dispatch<React.SetStateAction<number>>;
}

const When: React.FC<Props> = ({ openCard, setOpenCard }) => {
  const today = new Date().toISOString().substring(0, 10);

  return (
    <Card>
      {openCard != 1 && (
        <CardPreview
          onPress={() => setOpenCard(1)}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <PreviewText>When</PreviewText>
          <PreviewData>Any week</PreviewData>
        </CardPreview>
      )}

      {openCard == 1 && <CardHeader>When's your trip?</CardHeader>}

      {openCard == 1 && (
        <CardBody>
          <DatePicker
            options={{
              defaultFont: "mon",
              headerFont: "mon-sb",
              mainColor: Colors.primary,
              borderColor: "transparent",
            }}
            current={today}
            selected={today}
            mode={"calendar"}
          />
        </CardBody>
      )}
    </Card>
  );
};

export default When;
