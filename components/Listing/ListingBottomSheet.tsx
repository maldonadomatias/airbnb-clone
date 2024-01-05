import { Text } from "react-native";
import { useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";

import Listings from "@/components/Listing/Listings";
import Colors from "@/constants/Colors";

const ContentContainer = styled.View`
  flex: 1;
`;

const AbsoluteView = styled.View`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-items: center;
`;

const Btn = styled.TouchableOpacity`
  background-color: ${Colors.dark};
  padding: 14px;
  height: 50px;
  border-radius: 30px;
  flex-direction: row;
  margin-horizontal: auto;
  align-items: center;
`;

const SheetContainer = styled(BottomSheet)`
  background-color: #fff;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  shadow-offset: 1px 1px;
`;

interface Props {
  listings: any[];
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <SheetContainer
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
    >
      <ContentContainer>
        <Listings listings={listings} refresh={refresh} category={category} />
        <AbsoluteView>
          <Btn onPress={onShowMap}>
            <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </Btn>
        </AbsoluteView>
      </ContentContainer>
    </SheetContainer>
  );
};

export default ListingsBottomSheet;
