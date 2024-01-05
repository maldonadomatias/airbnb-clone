import React from "react";
import styled from "styled-components/native";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { Button, ButtonIcon, ButtonText, InputField } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 26px;
`;

const SeparatorView = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-vertical: 30px;
`;

const Separator = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grey};
  flex: 1;
`;

const SeparatorText = styled.Text`
  font-family: "mon-sb";
  color: ${Colors.grey};
`;

const ButtonContainer = styled.View`
  flex: 1;
  gap: 10px;
`;

const OutlinedButton = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: ${Colors.grey};
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-horizontal: 10px;
`;

const OutlinedButtonText = styled.Text`
  color: ${Colors.dark};
  font-family: "mon-sb";
  font-size: 16px;
`;

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page: React.FC = () => {
  useWarmUpBrowser(); // Warm up the browser to reduce the time it takes to open the modal for ANDROID

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <Container>
      <InputField
        autoCapitalize="none"
        placeholder="Email"
        style={{ marginBottom: 30 }}
      />
      <Button onPress={() => {}}>
        <ButtonText>Continue</ButtonText>
      </Button>
      <SeparatorView>
        <Separator />
        <SeparatorText>or</SeparatorText>
        <Separator />
      </SeparatorView>
      <ButtonContainer>
        <OutlinedButton onPress={() => {}}>
          <ButtonIcon name="call-outline" size={24} color={Colors.dark} />
          <OutlinedButtonText>Continue with Phone</OutlinedButtonText>
        </OutlinedButton>
        <OutlinedButton onPress={() => onSelectAuth(Strategy.Google)}>
          <ButtonIcon name="logo-google" size={24} color={Colors.dark} />
          <OutlinedButtonText>Continue with Google</OutlinedButtonText>
        </OutlinedButton>
        <OutlinedButton onPress={() => onSelectAuth(Strategy.Facebook)}>
          <ButtonIcon name="logo-facebook" size={24} color={Colors.dark} />
          <OutlinedButtonText>Continue with Facebook</OutlinedButtonText>
        </OutlinedButton>
        <OutlinedButton onPress={() => onSelectAuth(Strategy.Apple)}>
          <ButtonIcon name="logo-apple" size={24} color={Colors.dark} />
          <OutlinedButtonText>Continue with Apple</OutlinedButtonText>
        </OutlinedButton>
      </ButtonContainer>
    </Container>
  );
};

export default Page;
