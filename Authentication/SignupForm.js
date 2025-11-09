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

export default function SignupForm({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Missing Fields", "Please fill in all fields");
        return;
      }

      await db.runAsync(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name.trim(), email.trim(), password.trim()]
      );

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        Alert.alert("Duplicate Email", "This email is already registered");
      } else {
        console.error(err);
        Alert.alert("Error", "Something went wrong while signing up");
      }
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
          <Text style={styles.logo}>Create Account 🎀</Text>
          <Text style={styles.subtitle}>Join the KittyTalks Chat Club!</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#ffb6c1"
            value={name}
            onChangeText={setName}
          />

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

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
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
    fontSize: 30,
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
