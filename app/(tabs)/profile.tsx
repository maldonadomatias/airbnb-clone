import { View, Text, Button, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";
import { InputField } from "@/constants/Styles";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdffff" }}>
      <HeaderContainer>
        <Header>Profile</Header>
        <Ionicons name="notifications-outline" size={26} />
      </HeaderContainer>

      {user && (
        <Card>
          <TouchableOpacity onPress={() => onCaptureImage()}>
            <Avatar
              source={{
                uri: user?.imageUrl,
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {edit ? (
              <EditRow>
                <InputField
                  placeholder="First name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={{
                    width: 100,
                  }}
                />
                <InputField
                  placeholder="Last name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={{
                    width: 100,
                  }}
                />
                <TouchableOpacity onPress={() => onSaveUser()}>
                  <Ionicons name="checkmark-outline" size={24} />
                </TouchableOpacity>
              </EditRow>
            ) : (
              <EditRow>
                <Text
                  style={{
                    fontFamily: "mon-sb",
                    fontSize: 24,
                  }}
                >
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </EditRow>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </Card>
      )}

      {isSignedIn && (
        <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />
      )}

      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button
            title="Log In"
            onPress={() => signOut()}
            color={Colors.dark}
          />
        </Link>
      )}
    </SafeAreaView>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;

const Header = styled.Text`
  font-family: mon-b;
  font-size: 24px;
`;

const Card = styled.View`
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  margin-horizontal: 24px;
  margin-top: 24px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 1px 2px;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${Colors.grey};
`;

const EditRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
`;

export default Profile;
