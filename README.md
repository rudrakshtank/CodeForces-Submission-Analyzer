
# Codeforces Submission Analyzer Chrome Extension

This extension lets you paste a Codeforces submission URL. If the submission verdict is **Accepted**, it sends the source code to Together AI and returns:

1. **Time complexity**
2. **Space complexity**
3. **Efficiency commentary**
4. **Practical suggestions to improve the code**

## Installation

1. Download and extract `codeforces_submission_analyzer.zip`.
2. Open **chrome://extensions** in Chrome.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the extracted folder.

The extension icon will appear in the toolbar. Click it, paste a submission link, and press **Analyze**.

*API key is embedded for demonstration only. Rotate it or move it to `chrome.storage.sync` for production.*
