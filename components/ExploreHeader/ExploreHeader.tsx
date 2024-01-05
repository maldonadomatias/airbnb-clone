import React, { useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";

import Colors from "@/constants/Colors";
import { categoriesHeader } from "@/data/fakeData";
import {
  HeaderContainer,
  ActionRow,
  SearchButton,
  SearchTextContainer,
  SearchText,
  SearchSubText,
  FilterButton,
  CategoriesScrollView,
  CategoryButton,
  CategoryText,
  CategoryIcon,
} from "./ExploreHeader.styled";

interface ExploreHeaderProps {
  onCategoryChanged: (index: string) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onCategoryChanged }) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categoriesHeader[index].name);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderContainer>
        <ActionRow>
          <Link href={"/(modals)/booking"} asChild>
            <SearchButton>
              <Ionicons name="search" size={24} />
              <SearchTextContainer>
                <SearchText style={{ fontFamily: "mon-sb" }}>Search</SearchText>
                <SearchSubText
                  style={{ color: Colors.grey, fontFamily: "mon" }}
                >
                  Anywhere · Any week
                </SearchSubText>
              </SearchTextContainer>
            </SearchButton>
          </Link>
          <FilterButton>
            <Ionicons name="options-outline" size={24} />
          </FilterButton>
        </ActionRow>
        <CategoriesScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
        >
          {categoriesHeader.map((item, index) => (
            <CategoryButton
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              onPress={() => selectCategory(index)}
              style={
                activeIndex === index
                  ? { borderBottomColor: "#000", borderBottomWidth: 2 }
                  : {}
              }
            >
              <CategoryIcon
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <CategoryText>{item.name}</CategoryText>
            </CategoryButton>
          ))}
        </CategoriesScrollView>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default ExploreHeader;
