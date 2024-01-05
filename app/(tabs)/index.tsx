import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";

import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";

import ExploreHeader from "@/components/ExploreHeader/ExploreHeader";
import ListingsBottomSheet from "@/components/Listing/ListingBottomSheet";
import ListingsMap from "@/components/Map/ListingsMap";

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const geoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
