chrome.tabs.onCreated.addListener(async (tab) => {
    const intendedUrl = tab.pendingUrl || tab.url;

    if (!intendedUrl ||
        intendedUrl.startsWith("edge://") ||
        intendedUrl.startsWith("chrome://") ||
        intendedUrl.startsWith("about:")) {
        return;
    }

    const extensionIndex = chrome.runtime.getURL("index.html");

    if (intendedUrl.startsWith(extensionIndex)) {
        return;
    }

    const newUrl = extensionIndex + "?target=" + encodeURIComponent(intendedUrl);

    try {
        await chrome.tabs.update(tab.id, { url: newUrl });
    } catch (e) {
        console.error("Failed to redirect tab:", e);
    }
});
