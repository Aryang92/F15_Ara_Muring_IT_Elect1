import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import db from "../database/dbSetup";

export default function ProfileForm({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);

  const handleUpdate = async () => {
    await db.runAsync("UPDATE users SET name = ?, password = ? WHERE email = ?", [
      name,
      password,
      user.email,
    ]);
    Alert.alert("Profile Updated", "Your profile was successfully updated!");
  };

  const handleLogout = () => navigation.replace("Login");

  return (
    <ImageBackground
      source={require("../assets/kitty.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formBox}>
        <Text style={styles.header}>🎀 Your Profile</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor="#ffb6c1"
        />

        <TextInput
          style={styles.input}
          value={user.email}
          editable={false}
          placeholder="Email"
          placeholderTextColor="#ffb6c1"
        />

        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#ffb6c1"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formBox: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    color: "#ff69b4",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "#fff",
    textShadowRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffb6c1",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffe4e1",
  },
  logoutText: {
    color: "#ff1493",
    fontWeight: "bold",
    fontSize: 16,
  },
});
