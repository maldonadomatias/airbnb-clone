import { StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Container } from "@/constants/Styles";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

const CustomMarker = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 1px 10px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
`;

const MarkerText = styled.Text`
  font-family: "mon-sb";
  font-size: 14px;
`;

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.52, // Berlin's latitude
  longitude: 13.405, // Berlin's longitude
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap: React.FC<Props> = ({ listings }) => {
  const router = useRouter();

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
        onPress={onPress}
      >
        <CustomMarker
          style={{
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MarkerText style={{ color: "#fff", fontSize: 16 }}>
            {points}
          </MarkerText>
        </CustomMarker>
      </Marker>
    );
  };

  return (
    <Container>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <CustomMarker>
              <MarkerText>${item.properties.price}</MarkerText>
            </CustomMarker>
          </Marker>
        ))}
      </MapView>
    </Container>
  );
};

export default ListingsMap;
