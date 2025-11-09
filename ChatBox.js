import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ChatBox({ text, isMe, avatar }) {
  return (
    <View style={[styles.messageRow, isMe && styles.reverse]}>
      {/* Avatar */}
      <Image source={avatar} style={styles.avatar} />

      {/* Message Bubble */}
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={[styles.text, isMe ? styles.textMe : styles.textOther]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#ffb6c1", // pastel pink border
  },
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: "70%",
  },
  bubbleMe: {
    backgroundColor: "#ff69b4", // hot pink for user
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  bubbleOther: {
    backgroundColor: "#fff0f5", // lavender blush for AI
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#ffb6c1",
  },
  text: {
    fontSize: 14,
  },
  textMe: {
    color: "#fff",
  },
  textOther: {
    color: "#333",
  },
});
