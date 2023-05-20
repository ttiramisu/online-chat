const firebaseConfig = {
  apiKey: "AIzaSyCc1RCwcQLgHCIbdAYQw-iyD9oRm0TfknM",
  authDomain: "chat-test-88207.firebaseapp.com",
  databaseURL: "https://chat-test-88207-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-test-88207",
  storageBucket: "chat-test-88207.appspot.com",
  messagingSenderId: "475093710040",
  appId: "1:475093710040:web:13a5dcf2b0b8aae81d53ad"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

const messagesRef = database.ref('messages');

// Listen for incoming messages
messagesRef.on('child_added', (snapshot) => {
  const message = snapshot.val();
  displayMessage(message);
});

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Send a message
sendButton.addEventListener('click', () => {
  const messageText = messageInput.value.trim();
  if (messageText !== '') {
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
      text: messageText
    });
    messageInput.value = '';
  }
});

// Display a message in the chat window
function displayMessage(message) {
  const { text } = message;
  const messageElement = document.createElement('div');
  messageElement.textContent = text;
  document.getElementById('messages').appendChild(messageElement);
}
