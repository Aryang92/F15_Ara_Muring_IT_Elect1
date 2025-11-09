import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import db from "../database/dbSetup";

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Fields", "Please enter your email and password");
        return;
      }

      const users = await db.getAllAsync(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email.trim(), password.trim()]
      );

      if (users.length > 0) {
        const user = users[0];
        navigation.replace("UserList", { user });
      } else {
        Alert.alert("Invalid Login", "Incorrect email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/kitty.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require("../assets/kitty.png")} style={styles.logoImage} />
          <Text style={styles.logo}>KittyTalks 🎀</Text>
          <Text style={styles.subtitle}>Welcome back, kitties!</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#ffb6c1"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#ffb6c1"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 60,
    backgroundColor: "rgba(255,255,255,0.7)",
    margin: 20,
    borderRadius: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff69b4",
    marginBottom: 5,
    textShadowColor: "#fff",
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#ff69b4",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffb6c1",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#ff69b4",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#ff69b4",
    marginTop: 20,
    fontSize: 14,
  },
});
