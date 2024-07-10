import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';

const ProductDetails = () => {

  const { productId } = useLocalSearchParams();

  useEffect(() => {
    console.log("productId ", productId);
  }, [productId]);

  return (
    <View>
      <Text>ProductDetails</Text>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})