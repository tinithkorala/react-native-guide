import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUserData, getCurrentUserUid } from "../../libs/api";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initFn = async () => {
      try {
        const uId = getCurrentUserUid();

        if (uId) {
          console.log("uid ", uId);
          const { status, data } = await fetchUserData(uId);
          if (status) {
            setUserData(data);
          }
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    initFn();
  }, []);

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View>
      {userData ? (
        <>
          <Text>Username: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
        </>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
