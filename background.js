chrome.runtime.onInstalled.addListener(() => {
    console.log("Chat extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "connectSocket") {
        const socket = io("http://localhost:9000");

        socket.on("connect", () => {
            console.log("Background: Connected to WebSocket server");
        });

        socket.on("message", (data) => {
            console.log("Background: Message received", data);
            chrome.runtime.sendMessage({ type: "newMessage", data });
        });

        sendResponse({ status: "Connected to WebSocket" });
    }
});

let chatWindowId = null;

// Open the chat window
chrome.action.onClicked.addListener(() => {
    if (chatWindowId) {
        chrome.windows.update(chatWindowId, { focused: true });
    } else {
        chrome.windows.create({
            url: chrome.runtime.getURL("index.html"),
            type: "popup",
            width: 400,
            height: 600
        }, (win) => {
            chatWindowId = win.id;
        });
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId !== chatWindowId && chatWindowId !== null) {
        chrome.windows.update(chatWindowId, { focused: true });
    }
});


