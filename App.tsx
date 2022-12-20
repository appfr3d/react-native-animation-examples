import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FlatList, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  LottieAnimationScreen,
  LayoutAnimationScreen,
  AnimatedScreen,
  ReanimatedScreen,
  NoAnimationScreen,
} from "./screens";

const screens = [
  {
    name: "NoAnimationScreen",
    title: "👎 No animation",
  },
  {
    name: "LottieAnimationScreen",
    title: "⏱ Loading animation",
  },
  {
    name: "LayoutAnimationScreen",
    title: "🎊 Fade in",
  },
  {
    name: "AnimatedScreen",
    title: "💫 Sequenced layout",
  },
  {
    name: "ReanimatedScreen",
    title: "🔁 Rearrange list",
  },
] as const;

export type StackParamList = {
  NavigationScreen: undefined;
  NoAnimationScreen: undefined;
  LottieAnimationScreen: undefined;
  LayoutAnimationScreen: undefined;
  AnimatedScreen: undefined;
  ReanimatedScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NavigationScreen"
          component={NavigationScreen}
          options={{ title: "🎄 My Animated Wishlist 🎄" }}
        />
        <Stack.Screen
          name="NoAnimationScreen"
          component={NoAnimationScreen}
          options={{ title: screens[0].title }}
        />
        <Stack.Screen
          name="LottieAnimationScreen"
          component={LottieAnimationScreen}
          options={{ title: screens[1].title }}
        />
        <Stack.Screen
          name="LayoutAnimationScreen"
          component={LayoutAnimationScreen}
          options={{ title: screens[2].title }}
        />
        <Stack.Screen
          name="AnimatedScreen"
          component={AnimatedScreen}
          options={{ title: screens[3].title }}
        />
        <Stack.Screen
          name="ReanimatedScreen"
          component={ReanimatedScreen}
          options={{ title: screens[4].title }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type Props = NativeStackScreenProps<StackParamList, "NavigationScreen">;
function NavigationScreen({ navigation }: Props) {
  return (
    <FlatList
      data={screens}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <Pressable
          style={(state) => {
            return {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 60,
              marginTop: 18,
              marginHorizontal: 18,
              padding: 12,
              borderRadius: 12,
              backgroundColor: state.pressed ? "#ccc" : "#fff",
            };
          }}
          onPress={() => navigation.navigate(item.name)}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Feather name="chevron-right" size={30} color="black" />
        </Pressable>
      )}
    />
  );
}
