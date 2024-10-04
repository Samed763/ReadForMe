chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "readText",
      title: "Read selected text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "readText" && info.selectionText) {
      chrome.tts.speak(info.selectionText, {
        voiceName: "Google US English",
        rate: 1.0
      });
    }
  });
  