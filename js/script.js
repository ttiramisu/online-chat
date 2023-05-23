// Retrieve user email from local storage
const userEmail = localStorage.getItem('userEmail');

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
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText !== '') {
    const userEmail = localStorage.getItem('userEmail');
    const currentTime = new Date().getTime();

    const newMessageRef = messagesRef.push();
    newMessageRef.set({
      text: messageText,
      email: userEmail,
      timestamp: currentTime
    });
    messageInput.value = '';
  }
}

// Add event listener to send button
sendButton.addEventListener('click', sendMessage);

// Add event listener to message input for Enter key press
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Display a message in the chat window
function displayMessage(message) {
  const { text, email, timestamp } = message;
  const hiddenEmail = hideEmail(email);
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  const timeStamp = document.createElement('p');
  const timeString = formatTime(timestamp);
  timeStamp.textContent = timeString;
  timeStamp.classList.add('msg-time');

  const contentElement = document.createElement('span');
  contentElement.textContent = hiddenEmail + ': ' + text;
  messageElement.appendChild(contentElement);
  messageElement.appendChild(timeStamp);

  const messagesContainer = document.getElementById('messages');
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to format the timestamp to display only the time
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  return timeString;
}

// Function to hide parts of the email
function hideEmail(email) {
  const atIndex = email.indexOf('@');
  const hiddenEmail = email.slice(0, atIndex);

  return hiddenEmail;
}

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace('index.html');
  }
});

const logedInAs = document.getElementById('log-in-as');
logedInAs.textContent = `You are loged in as ${hiddenEmail}`;