import React, { useEffect, useState } from "react";
import { LayoutAnimation, FlatList, Text, View } from "react-native";

import { items, ItemType } from "../items";
import { styles } from "../styles";

export function LayoutAnimationScreen() {
  const [listItems, setListItems] = useState<ItemType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setListItems(items);
    }, 1000);
  }, []);

  return (
    <FlatList
      data={listItems}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <ListItem item={item.title} />}
    />
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
