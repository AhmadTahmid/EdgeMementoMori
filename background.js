// Listen for new tabs being created
chrome.tabs.onCreated.addListener(async (tab) => {
    // We try to get the intended URL. 
    // 'pendingUrl' is often used when a tab is created with a URL (like "Open in new tab").
    // 'url' might be used if it's already set.
    const intendedUrl = tab.pendingUrl || tab.url;

    // If there is no URL, or it's the default empty tab 'edge://newtab/', we don't need to intercept
    // because "chrome_url_overrides" in manifest.json handles the default new tab case automatically.
    // We also ignore internal browser pages to avoid breaking settings/extensions menus.
    if (!intendedUrl ||
        intendedUrl.startsWith("edge://") ||
        intendedUrl.startsWith("chrome://") ||
        intendedUrl.startsWith("about:")) {
        return;
    }

    // Get the extension's internal index.html URL
    const extensionIndex = chrome.runtime.getURL("index.html");

    // Prevent infinite loops: if the new tab is ALREADY our extension, do nothing.
    if (intendedUrl.startsWith(extensionIndex)) {
        return;
    }

    // Redirect the new tab to our extension, passing the intended URL as a 'target' query param.
    // We use encodeURIComponent to safely include the URL.
    const newUrl = extensionIndex + "?target=" + encodeURIComponent(intendedUrl);

    try {
        await chrome.tabs.update(tab.id, { url: newUrl });
    } catch (e) {
        console.error("Failed to redirect tab:", e);
    }
});
