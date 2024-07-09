import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, router } from "expo-router";

import { auth } from './../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const RootLayout = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to home
        router.replace('/home'); 
      }
    });
    return unsubscribe;
  }, [])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
