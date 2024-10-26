let responses = {};

// Load responses from the external JSON file
fetch('responses.json')
  .then(response => response.json())
  .then(data => {
    responses = data.responses;
  })
  .catch(error => console.error('Error loading responses:', error));

// Function to send a message
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
  
    if (message) {
      addMessage(message, 'user-message'); // Display user's message
      inputField.value = ''; // Clear input field
  
      // Generate bot response
      generateBotResponse(message);
    }
}
  
// Function to generate a bot response based on the user input
function generateBotResponse(userMessage) {
    document.getElementById('typingIndicator').style.display = 'inline';
    let botMessage = "I'm here to help you!";

    // Check for responses based on user input
    for (const key in responses) {
      if (userMessage.toLowerCase().includes(key)) {
        botMessage = responses[key];
        break;
      }
    }
  
    // Simulate typing delay
    setTimeout(() => {
      addMessage(botMessage, 'bot-message');
      document.getElementById('typingIndicator').style.display = 'none'; // Hide typing indicator
    }, 1000); // 1 second delay for realism
}
  
// Function to add a message to the chatbox
function addMessage(text, className) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
  
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
}
  
// Load previous messages from local storage if available
window.onload = () => {
    const messages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    messages.forEach(msg => addMessage(msg.text, msg.className));
};

// Save messages to local storage
function saveMessageToLocalStorage(text, className) {
    const messages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    messages.push({ text, className });
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}
// Function to toggle dark mode
document.getElementById('darkModeToggle').addEventListener('change', function () {
    const chatbox = document.querySelector('.chatbox');
    const messagesContainer = document.querySelector('.chatbox-messages');

    if (this.checked) {
        // Enable dark mode
        document.body.classList.add('dark-mode');
        chatbox.classList.add('dark-mode');
        messagesContainer.classList.add('dark-mode');

        // Add dark mode class to messages
        const allMessages = document.querySelectorAll('.message');
        allMessages.forEach(msg => msg.classList.add('dark-mode'));

        // Input area dark mode
        const inputArea = document.querySelector('.chatbox-input-area');
        const inputField = document.querySelector('.chatbox-input');
        inputArea.classList.add('dark-mode');
        inputField.classList.add('dark-mode');

        // Button dark mode
        const sendButton = document.querySelector('.send-button');
        sendButton.classList.add('dark-mode');

        // Button links
        const buttons = document.querySelectorAll('.button-link');
        buttons.forEach(button => button.classList.add('dark-mode'));
    } else {
        // Disable dark mode
        document.body.classList.remove('dark-mode');
        chatbox.classList.remove('dark-mode');
        messagesContainer.classList.remove('dark-mode');

        // Remove dark mode class from messages
        const allMessages = document.querySelectorAll('.message');
        allMessages.forEach(msg => msg.classList.remove('dark-mode'));

        // Input area light mode
        const inputArea = document.querySelector('.chatbox-input-area');
        const inputField = document.querySelector('.chatbox-input');
        inputArea.classList.remove('dark-mode');
        inputField.classList.remove('dark-mode');

        // Button light mode
        const sendButton = document.querySelector('.send-button');
        sendButton.classList.remove('dark-mode');

        // Button links
        const buttons = document.querySelectorAll('.button-link');
        buttons.forEach(button => button.classList.remove('dark-mode'));
    }
});
