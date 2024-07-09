import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { signOutApi } from '../../libs/api'

const Home = () => {

  const handleSignOut = () => {
    signOutApi();
  }

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleSignOut}><Text>Sign Out</Text></TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})