const chatFrame = document.createElement("iframe");
chatFrame.src = chrome.runtime.getURL("index.html"); // Load your UI
chatFrame.id = "chatFrame";
document.body.appendChild(chatFrame);

const style = document.createElement("style");
style.innerHTML = `
    #chatFrame {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;  /* Adjust based on your chat UI */
        height: 500px; /* Adjust based on your chat UI */
        border: none;
        z-index: 10000;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px; /* Optional for rounded corners */
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        background: white;
    }
`;
document.head.appendChild(style);
