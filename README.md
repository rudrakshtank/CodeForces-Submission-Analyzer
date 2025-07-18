
# Codeforces Submission Analyzer Chrome Extension

This extension lets you paste a Codeforces submission URL. If the submission verdict is **Accepted**, it sends the source code to Together AI:

## ✨ Features
It returns:
- **Time complexity**
- **Space complexity**
- **Efficiency commentary**
- **Practical suggestions to improve the code**

## 📥 Installation

1. Download and extract `codeforces_submission_analyzer` files.
2. Paste your **together.ai** api key.
3. Open **chrome://extensions** in Chrome.
4. Enable **Developer mode** (top-right).
5. Click **Load unpacked** and select the extracted folder.

The extension icon will appear in the toolbar. Click it, paste a submission link, and press **Analyze**.

## 📁 Files Included

| File | Description |
|------|-------------|
| `manifest.json` | Configuration file that defines extension metadata, permissions, and scripts. |
| `popup.html` | Markup for the extension's popup interface shown on clicking the icon. |
| `popup.js` | Contains the JavaScript logic for fetching and analyzing Codeforces submissions. |
| `styles.css` | Stylesheet for customizing the layout and design of the popup interface. |


*API key is embedded for demonstration only in working.*
