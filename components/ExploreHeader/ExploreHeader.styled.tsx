import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
  background-color: #fff;
  height: 130px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 1px 10px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
  padding-bottom: 16px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  gap: 15px;
  padding: 14px;
  align-items: center;
  width: 280px;
  border-radius: 30px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  shadow-offset: 1px 1px;
`;

const SearchTextContainer = styled.View`
  gap: 3px;
`;

const SearchText = styled.Text`
  font-family: "mon-sb";
`;

const SearchSubText = styled.Text`
  color: ${Colors.grey};
  font-family: "mon";
  font-size: 12px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 10px;
  border-width: 1px;
  border-color: #c2c2c2;
  border-radius: 24px;
`;

const CategoriesScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: "center",
    gap: 30,
    paddingHorizontal: 16,
  },
})``;

const CategoryButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  gap: 2px;
`;

const CategoryText = styled.Text`
  font-size: 12px;
  font-family: "mon-sb";
  color: ${Colors.grey};
`;

const CategoryIcon = styled(MaterialIcons)`
  font-size: 24px;
  color: ${Colors.grey};
`;

export {
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
};
