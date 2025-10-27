import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  Image
} from 'react-native';

const ChatHead = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Love nagkaon na ikaw?', 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [comments, setComments] = useState([
    { 
      id: '1', 
      text: 'Hi yasin my love mwaa!', 
      user: 'Shael', 
      timestamp: '2 hours ago',
      likes: 3
    },
    { 
      id: '2', 
      text: 'Hilom shael mura kag tala tskkkk!', 
      user: 'Yasin', 
      timestamp: '1 hour ago',
      likes: 5
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [newComment, setNewComment] = useState('');
  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "Sge love mwah 😘",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const comment = {
      id: Date.now().toString(),
      text: newComment,
      user: 'You',
      timestamp: 'Just now',
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    Keyboard.dismiss();
  };

  const handleLikeComment = (id) => {
    setComments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  // --- DISPLAY CHAT MESSAGE WITH AVATAR ---
  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageRow,
      item.sender === 'user' ? styles.userRow : styles.botRow
    ]}>
      
      {item.sender === 'bot' && (
        <Image 
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.avatar}
        />
      )}

      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      {item.sender === 'user' && (
        <Image 
          source={{ uri: "https://i.pravatar.cc/150?img=5" }}
          style={styles.avatar}
        />
      )}
    </View>
  );

  // --- DISPLAY COMMENT WITH PROFILE PIC ---
  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Image 
          source={{ uri: `https://i.pravatar.cc/150?u=${item.user}` }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <TouchableOpacity onPress={() => handleLikeComment(item.id)}>
          <Text style={styles.likeText}>👍 {item.likes}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>💬 Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
          onPress={() => setActiveTab('comments')}
        >
          <Text style={[styles.tabText, activeTab === 'comments' && styles.activeTabText]}>💭 Comments</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT / COMMENTS CONTENT */}
      {activeTab === 'chat' ? (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesContainer}
          />

          <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.commentsContainer}
          />

          <KeyboardAvoidingView style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Write a comment..."
              multiline
            />
            <TouchableOpacity style={styles.postButton} onPress={handleAddComment}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#fff"},
  header:{flexDirection:"row",backgroundColor:"#007AFF",paddingTop:40},
  tab:{flex:1,padding:15,alignItems:"center"},
  activeTab:{borderBottomWidth:3,borderBottomColor:"#fff"},
  tabText:{color:"#eee",fontSize:16},
  activeTabText:{color:"#fff", fontWeight:"bold"},
  
  // Chat message layout
  messageRow:{flexDirection:"row",alignItems:"flex-end",marginVertical:6},
  userRow:{justifyContent:"flex-end"},
  botRow:{justifyContent:"flex-start"},
  avatar:{width:35,height:35,borderRadius:50,marginHorizontal:8},

  messageBubble:{maxWidth:"70%",padding:10,borderRadius:15},
  userBubble:{backgroundColor:"#007AFF",alignSelf:"flex-end"},
  botBubble:{backgroundColor:"#E5E5EA",alignSelf:"flex-start"},
  messageText:{fontSize:15},
  userMessageText:{color:"#fff"},
  botMessageText:{color:"#000"},
  timestamp:{fontSize:10,marginTop:3,color:"#777"},

  inputContainer:{flexDirection:"row",padding:10,borderTopWidth:1,borderColor:"#ccc"},
  input:{flex:1,borderWidth:1,borderColor:"#ccc",borderRadius:20,paddingHorizontal:15},
  sendButton:{backgroundColor:"#007AFF",marginLeft:10,borderRadius:20,paddingHorizontal:18,justifyContent:"center"},
  sendButtonText:{color:"#fff"},

  commentCard:{backgroundColor:"#f8f8f8",padding:12,borderRadius:10,marginBottom:10},
  commentHeader:{flexDirection:"row",alignItems:"center"},
  userName:{fontWeight:"bold",color:"#007AFF"},
  commentText:{marginTop:5,fontSize:15,color:"#333"},
  likeText:{color:"#444",fontSize:12,marginLeft:8},

  commentInputContainer:{flexDirection:"row",padding:10,borderTopWidth:1,borderColor:"#ddd"},
  commentInput:{flex:1,borderWidth:1,borderColor:"#ddd",borderRadius:10,padding:10,backgroundColor:"#fff"},
  postButton:{marginLeft:10,backgroundColor:"#34C759",borderRadius:10,paddingVertical:10,paddingHorizontal:15},
  postButtonText:{color:"#fff",fontWeight:"bold"},
});

export default ChatHead;
