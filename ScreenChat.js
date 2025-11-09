import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
} from "react-native";
import ChatBox from "./ChatBox";
import db from "./database/dbSetup";

export default function ScreenChat({ route }) {
  const { user, chatPartner } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const aiReplies = [
    "Welcome to KittyTalks 💖 Where every message is a hug in text form!",
    "Hewwo! 🐾 Ready to sprinkle some sparkle on your convo?",
    "Meowgical greetings! ✨ Let’s make this chat purrfect.",
    "Let’s paws and reflect… yep, that’s a great idea! 🐾",
    "Meow~ that’s a spicy take! 🔥 I like your style.",
    "That’s tea hotter than my pink latte ☕💅",
  ];

  const getAIResponse = () => aiReplies[Math.floor(Math.random() * aiReplies.length)];

  const loadMessages = async () => {
    const result = await db.getAllAsync(
      `SELECT * FROM messages 
       WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
       ORDER BY id DESC`,
      [user.email, chatPartner.email, chatPartner.email, user.email]
    );
    setMessages(result);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      sender: user.email,
      receiver: chatPartner.email,
      text: input,
    };

    await db.runAsync(
      "INSERT INTO messages (sender, receiver, text) VALUES (?, ?, ?)",
      [newMsg.sender, newMsg.receiver, newMsg.text]
    );

    setMessages((prev) => [{ ...newMsg, id: Date.now() }, ...prev]);
    setInput("");

    setTimeout(async () => {
      const botReply = {
        sender: chatPartner.email,
        receiver: user.email,
        text: getAIResponse(),
      };

      await db.runAsync(
        "INSERT INTO messages (sender, receiver, text) VALUES (?, ?, ?)",
        [botReply.sender, botReply.receiver, botReply.text]
      );

      setMessages((prev) => [{ ...botReply, id: Date.now() }, ...prev]);
    }, 1000);
  };

  return (
    <ImageBackground
      source={require("./assets/kitty.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ChatBox
              text={item.text}
              isMe={item.sender === user.email}
              avatar={
                item.sender === user.email
                  ? require("./assets/reciever.jpg")
                  : require("./assets/sender.jpg")
              }
            />
          )}
          inverted
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#ffb6c1"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  chatContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ffb6c1",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ff69b4",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#ff69b4",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
