import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ icon, name, color, focused }) => {
  return <View style={styles.container}>{icon}</View>;
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome5 name="shopping-cart" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="educational"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <MaterialCommunityIcons name="book-education" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome name="user" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
