import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.Text<{ active: boolean }>`
  font-size: 18px;
  font-family: "mon-sb";
  color: ${({ active }) => (active ? "#333" : `${Colors.grey}`)};
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
`;

const ModalHeaderText: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <Container>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Title active={active === 0}>Stays</Title>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Title active={active === 1}>Experiences</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default ModalHeaderText;
