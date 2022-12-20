import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import Lottie from "lottie-react-native";

import { items, ItemType } from "../items";
import { styles } from "../styles";

// From: https://lottiefiles.com/124732-layer-lottie-animation
const LottieLoadingAnimation = require("../assets/loading-lottie-animation.json");

export function LottieAnimationScreen() {
  const [listItems, setListItems] = useState<ItemType[]>([]);

  useEffect(() => {
    // Simulate fetch from database
    setTimeout(() => {
      setListItems(items);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {listItems.length === 0 ? (
        <Lottie
          style={{ width: 200, alignSelf: "center" }}
          source={LottieLoadingAnimation}
          autoPlay
          loop
        />
      ) : (
        <FlatList
          data={listItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <ListItem item={item.title} />}
        />
      )}
    </View>
  );
}

type ListItemProps = {
  item: string;
};

function ListItem({ item }: ListItemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={{ fontSize: 18 }}>{item}</Text>
    </View>
  );
}
