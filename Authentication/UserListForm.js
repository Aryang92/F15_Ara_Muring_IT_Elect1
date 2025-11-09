import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import db from "../database/dbSetup";

export default function UserListForm({ navigation, route }) {
  const { user } = route.params;
  const [users, setUsers] = useState([]);

  const ensureDefaultUser = async () => {
    const existing = await db.getAllAsync("SELECT * FROM users WHERE email = ?", [
      "eman@gmail.com",
    ]);
    if (existing.length === 0) {
      await db.runAsync(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        ["Eman Bacosa", "eman@gmail.com", "eman1234"]
      );
    }
  };

  const loadUsers = async () => {
    try {
      await ensureDefaultUser();

      const result = await db.getAllAsync("SELECT * FROM users WHERE email != ?", [
        user.email,
      ]);

      const withLastMessage = await Promise.all(
        result.map(async (u) => {
          const lastMsg = await db.getAllAsync(
            `SELECT text FROM messages
             WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
             ORDER BY id DESC LIMIT 1`,
            [user.email, u.email, u.email, user.email]
          );
          return {
            ...u,
            lastMessage: lastMsg[0]?.text || "No messages yet 🐱💬",
          };
        })
      );
      setUsers(withLastMessage);
    } catch (e) {
      console.error("Error loading users:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadUsers);
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "🎀 Kitty Talks",
      headerStyle: { backgroundColor: "#ffb6c1" },
      headerTintColor: "#fff",
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Menu", "Choose an option", [
              {
                text: "Edit Profile",
                onPress: () => navigation.navigate("Profile", { user }),
              },
              {
                text: "Logout",
                style: "destructive",
                onPress: () => navigation.replace("Login"),
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text style={{ fontSize: 24, color: "#fff", marginRight: 10 }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/kitty.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.header}>🐱 Connected Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => navigation.navigate("Chat", { user, chatPartner: item })}
          >
            <Image source={require("../assets/sender.jpg")} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No other users yet 🎀</Text>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff69b4",
    textAlign: "center",
    marginVertical: 10,
    textShadowColor: "#fff",
    textShadowRadius: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    borderColor: "#ffb6c1",
    borderWidth: 1,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#ffb6c1",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ff1493",
  },
  lastMsg: {
    color: "#555",
    fontSize: 14,
    marginTop: 3,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#ff69b4",
    fontSize: 16,
  },
});
