import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { signOutApi } from '../../libs/api'

import { useSelector } from 'react-redux';

const Home = () => {

  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    signOutApi();
  }

  return (
    <View>
      <Text>{user.username}</Text>
      <TouchableOpacity onPress={handleSignOut}><Text>Sign Out</Text></TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})