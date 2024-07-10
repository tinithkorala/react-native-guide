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
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

// Icons
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Config values
import { filter, sort } from "../../config/app.config";

// Redux Slice
import { addItem } from "../../store/features/cartSlice";
import { Link, router } from "expo-router";

const Home = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  console.log("cart ", cart);

  const handleSignOut = () => {
    signOutApi();
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  // Handle Filter Value
  const handleFilterValueChange = (value) => {
    setSelectedFilter(value);
  };

  // Handle Sort Value
  const handleSortValueChange = (value) => {
    setSelectedSort(value);
  };

  // Handle Clear Search Filter Sort
  const handleReset = () => {
    setSearchText("");
    setSelectedFilter(null);
    setSelectedSort(null);
  };

  // Fetch products
  useEffect(() => {
    const initFn = async () => {
      const { data, status } = await fetchProducts({
        search: searchText,
        category: selectedFilter,
        sort: selectedSort,
      });
      if (status) {
        setProducts(data);
      }
      setLoading(false);
    };
    initFn();
  }, [searchText, selectedFilter, selectedSort]);

  // Handle Add Item To Cart
  const handleAddItemToCart = (item) => {
    dispatch(addItem(item));
  };

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Products Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  console.log({
    searchText,
    selectedFilter,
    selectedSort,
  });

  return (
    <SafeAreaView style={styles.b1}>
      <View style={styles.listHeaderContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
          />
          <TouchableOpacity onPress={handleReset}>
            <FontAwesome5 name="eraser" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={handleFilterValueChange}
              items={filter}
              value={selectedFilter}
              placeholder={{ label: "Filter by:", value: null }}
            />
          </View>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={handleSortValueChange}
              items={sort}
              value={selectedSort}
              placeholder={{ label: "Sort by:", value: null }}
            />
          </View>
        </View>
      </View>
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
                <Link href={`/pages/${item.id}`}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </Link>
                <Text style={styles.itemName}>{item.id}</Text>
                <View style={styles.ratingContainer}>
                  <Entypo name="star" size={24} color="black" />
                  <Text>{item.rating}</Text>
                </View>
                <Text>{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => handleAddItemToCart(item)}>
                <FontAwesome6 name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={() => <Text>Here</Text>}
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "90%",
  },
  listHeaderContainer: {
    padding: 10,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: "50%",
  },
});
