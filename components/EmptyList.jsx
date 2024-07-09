import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyList = ({title, subtitle}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})