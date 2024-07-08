import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "./../../assets/images/logo.png";

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
