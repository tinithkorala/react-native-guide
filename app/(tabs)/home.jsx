import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchProducts, signOutApi } from "../../libs/api";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Home = () => {
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    signOutApi();
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const initFn = async () => {
      const { data, status } = await fetchProducts();
      if (status) {
        setProducts(data);
      }
    setLoading(false);
    };
    initFn();
  }, []);

  const posts = [
    {
      id: 1,
      name: "Fresh Salmon Fillet",
      category: "food",
      rating: 4.8,
      price: 25.99,
      currency: "USD",
      unit: "lb",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/pedigree.jpeg?alt=media&token=e6b1ce8a-a87a-48b4-b308-438095456e1c", // Placeholder for now
    },
    {
      id: 2,
      name: "Organic Mixed Greens",
      category: "food",
      rating: 4.9,
      price: 3.99,
      currency: "USD",
      unit: "bunch",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 3,
      name: "Whole Wheat Bread",
      category: "food",
      rating: 4.7,
      price: 2.49,
      currency: "USD",
      unit: "loaf",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 4,
      name: "Greek Yogurt with Berries",
      category: "nutrition",
      rating: 4.5,
      price: 4.29,
      currency: "USD",
      unit: "cup",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 5,
      name: "Multivitamin Supplement",
      category: "nutrition",
      rating: 4.3,
      price: 12.99,
      currency: "USD",
      unit: "bottle",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 6,
      name: "Chicken Breast (Boneless, Skinless)",
      category: "food",
      rating: 4.6,
      price: 5.99,
      currency: "USD",
      unit: "lb",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 7,
      name: "Brown Rice",
      category: "food",
      rating: 4.4,
      price: 2.29,
      currency: "USD",
      unit: "bag",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 8,
      name: "Protein Powder",
      category: "nutrition",
      rating: 4.2,
      price: 29.99,
      currency: "USD",
      unit: "container",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 9,
      name: "Almonds",
      category: "nutrition",
      rating: 4.8,
      price: 7.99,
      currency: "USD",
      unit: "cup",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
    {
      id: 10,
      name: "Oatmeal",
      category: "food",
      rating: 4.7,
      currency: "USD",
      price: 2.99,
      unit: "container",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dog-app-40f5d.appspot.com/o/default-image.png?alt=media&token=af4d3ec8-eb12-4caf-bb7d-26233050196d", // Placeholder for now
    },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Products Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.b1}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.descriptionContainer}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Entypo name="star" size={24} color="black" />
                  <Text>{item.rating}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <FontAwesome6 name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
            />
            <View>
              <Text>Filter by:</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  b1: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // alignItems: 'center',
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  itemImage: {
    width: "100%",
    height: 500,
  },
  itemName: {
    fontSize: 16,
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  listHeaderContainer: {
    padding: 10,
  }
});
