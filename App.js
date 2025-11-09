import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginForm from "./Authentication/LoginForm";
import SignupForm from "./Authentication/SignupForm";
import UserListForm from "./Authentication/UserListForm";
import ScreenChat from "./ScreenChat";
import ProfileForm from "./Authentication/ProfileForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#ffb6c1" }, // pastel pink
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: "🎀 Login to KittyTalks" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupForm}
          options={{ title: "🌸 Create Your Account" }}
        />
        <Stack.Screen
          name="UserList"
          component={UserListForm}
          options={{ title: "🐱 KittyTalks Users" }}
        />
        <Stack.Screen
          name="Chat"
          component={ScreenChat}
          options={({ route }) => ({
            title: `💬 Chat with ${route.params.chatPartner.name}`,
          })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileForm}
          options={{ title: "🎀 Your Kitty Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
