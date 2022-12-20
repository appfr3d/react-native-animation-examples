import React, { useLayoutEffect, useRef } from "react";
import { Animated, FlatList, Text } from "react-native";

import { items } from "../items";
import { styles } from "../styles";

export function AnimatedScreen() {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) => (
        <ListItem item={item.title} index={index} />
      )}
    />
  );
}

type ListItemProps = {
  item: string;
  index: number;
};

function ListItem({ item, index }: ListItemProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-1000)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    Animated.sequence([
      // Index of item in the list
      Animated.delay(200 * index),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(shake, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotateZ = shake.interpolate({
    inputRange: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    outputRange: ["0deg", "-4deg", "4deg", "-4deg", "4deg", "-4deg", "0deg"],
  });

  const transform = [{ translateY }, { scale }, { rotateZ }];

  return (
    <Animated.View style={[{ transform }, styles.listItem]}>
      <Text style={{ fontSize: 18 }}>{item}</Text>
    </Animated.View>
  );
}
