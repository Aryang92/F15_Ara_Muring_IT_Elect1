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
  ScrollView,
  SectionList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const ChatAndCommentApp = () => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'comments'
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Keyboard visibility handler
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0 && activeTab === 'chat') {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, activeTab]);

  // Simple bot responses
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello there! How can I assist you today?';
    } else if (lowerCaseMessage.includes('help')) {
      return 'I can help you with general information, answer questions, or just chat! What would you like to know?';
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
      return 'Goodbye! Have a wonderful day! 😊';
    } else if (lowerCaseMessage.includes('comment') || lowerCaseMessage.includes('comments')) {
      return 'You can switch to the comments tab to see what others are saying! Just tap on the "Comments" button above.';
    } else if (lowerCaseMessage.includes('name')) {
      return 'I\'m your friendly chatbot! You can call me ChatBuddy.';
    } else if (lowerCaseMessage.includes('weather')) {
      return 'I don\'t have access to real-time weather data, but I hope it\'s beautiful wherever you are!';
    } else {
      return "That's interesting! I'm still learning, but I'd love to chat more about that. Could you tell me more?";
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
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
      user: 'You', // In real app, use actual user data
      timestamp: 'Just now',
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    Keyboard.dismiss();
  };

  const handleLikeComment = (commentId) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const renderMessage = ({ item }) => (
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
      <Text style={styles.timestamp}>
        {item.timestamp}
      </Text>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.likeButton}
        onPress={() => handleLikeComment(item.id)}
      >
        <Text style={styles.likeText}>👍 {item.likes}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Tabs */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            💬 Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
          onPress={() => setActiveTab('comments')}
        >
          <Text style={[styles.tabText, activeTab === 'comments' && styles.activeTabText]}>
            💭 Comments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {activeTab === 'chat' ? (
          <>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContainer}
            />
            
            {!isKeyboardVisible && (
              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type a message..."
                  placeholderTextColor="#999"
                  onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}
          </>
        ) : (
          <>
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={item => item.id}
              style={styles.commentsList}
              contentContainerStyle={styles.commentsContainer}
            />
            
            {!isKeyboardVisible && (
              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.commentInputContainer}
              >
                <TextInput
                  style={styles.commentInput}
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Write a comment..."
                  placeholderTextColor="#999"
                  multiline
                />
                <TouchableOpacity style={styles.postButton} onPress={handleAddComment}>
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingTop: 40,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    fontSize: 16,
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 8,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentsList: {
    flex: 1,
  },
  commentsContainer: {
    padding: 15,
  },
  commentCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userName: {
    fontWeight: 'bold',
    color: '#007AFF',
    fontSize: 14,
  },
  commentText: {
    color: '#333',
    lineHeight: 20,
    fontSize: 15,
    marginBottom: 8,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    minHeight: 50,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  postButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  likeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  likeText: {
    color: '#666',
    fontSize: 12,
  },
});

export default ChatAndCommentApp;