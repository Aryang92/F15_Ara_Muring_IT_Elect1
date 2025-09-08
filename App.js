import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! Ara Muring ", sender: "other", timestamp: new Date() },
    { id: "2", text: "Heeyyyy wanna chat!!!", sender: "me", timestamp: new Date() },
  ]);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      text: input,
      sender: "me",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Auto reply
    setTimeout(() => {
      const botReply = {
        id: (Date.now() + 1).toString() + Math.random().toString(36).substr(2, 5),
        text: "Hello",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const addComment = () => {
    if (commentInput.trim() === "") return;

    const newComment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      text: commentInput,
      timestamp: new Date(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        alignSelf: item.sender === "me" ? "flex-end" : "flex-start",
        backgroundColor: item.sender === "me" ? "#0084ff" : "#e5e5ea",
        borderRadius: 20,
        margin: 5,
        padding: 10,
        maxWidth: "70%",
      }}
    >
      <Text style={{ color: item.sender === "me" ? "#fff" : "#000" }}>
        {item.text}
      </Text>
      <Text style={{ 
        fontSize: 10, 
        color: item.sender === "me" ? "#e1f5fe" : "#666",
        alignSelf: "flex-end",
        marginTop: 4
      }}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const renderComment = ({ item }) => (
    <View
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 10,
        marginVertical: 4,
      }}
    >
      <Text style={{ color: "#333" }}>{item.text}</Text>
      <Text style={{ 
        fontSize: 10, 
        color: "#666",
        alignSelf: "flex-end",
        marginTop: 4
      }}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        {/* CHAT BOX */}
        <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10, textAlign: "center" }}>
          Chat Box
        </Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 10 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        {/* Chat Input */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderTopWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 20,
              paddingHorizontal: 15,
              marginRight: 10,
              paddingVertical: 8,
            }}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: "#0084ff",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* COMMENT SECTION */}
        <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10, textAlign: "center" }}>
          Comments
        </Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          contentContainerStyle={{ padding: 10 }}
        />

        {/* Comment Input */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderTopWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 20,
              paddingHorizontal: 15,
              marginRight: 10,
              paddingVertical: 8,
            }}
            placeholder="Write a comment..."
            value={commentInput}
            onChangeText={setCommentInput}
          />
          <TouchableOpacity
            onPress={addComment}
            style={{
              backgroundColor: "#34a853",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Comment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
