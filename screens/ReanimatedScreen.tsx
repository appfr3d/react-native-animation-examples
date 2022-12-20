import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { items } from "../items";
import { styles } from "../styles";

const ITEM_HEIGHT = 78;

const initialOrder = items.map((_, i) => i);

export function ReanimatedScreen() {
  const [order, setOrder] = useState(initialOrder);

  const mixOrder = () => {
    const mixedOrder = [...order].sort(() => 0.5 - Math.random());
    setOrder(mixedOrder);
  };

  return (
    <>
      <FlatList
        data={items}
        extraData={order}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <ListItem item={item.title} index={index} order={order} />
        )}
      />
      <TouchableOpacity onPress={mixOrder} style={styles.button}>
        <Text style={styles.buttonText}>Mix it up!</Text>
      </TouchableOpacity>
    </>
  );
}

type ListItemProps = {
  item: string;
  index: number;
  order: number[];
};

function ListItem({ item, index, order }: ListItemProps) {
  const translationY = useSharedValue(0);

  useEffect(() => {
    translationY.value = withSpring((order[index] - index) * ITEM_HEIGHT);
  }, [order]);

  const transform = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
    };
  });

  return (
    <Animated.View style={[styles.listItem, transform, { zIndex: index }]}>
      <Text style={styles.text}>{item}</Text>
    </Animated.View>
  );
}
