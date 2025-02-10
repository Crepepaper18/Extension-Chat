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
