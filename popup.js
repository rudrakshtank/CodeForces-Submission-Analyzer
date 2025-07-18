const apiKey = "YOUR_TOGETHER.AI_API_KEY";
const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const urlInput = document.getElementById('url').value.trim();
  const statusDiv = document.getElementById('status');
  const resultDiv = document.getElementById('result');
  statusDiv.textContent = '';
  resultDiv.textContent = '';

  if (!/^https?:\/\/codeforces\.com\/contest\/\d+\/submission\/\d+/.test(urlInput)) {
    statusDiv.textContent = 'Please enter a valid Codeforces submission URL.';
    return;
  }

  try {
    statusDiv.textContent = 'Fetching submission page...';
    const res = await fetch(urlInput);
    if (!res.ok) throw new Error('Network response was not ok');
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Detect verdict
    const verdictEl = doc.querySelector('.verdict-accepted') || doc.querySelector('.submission-verdict');
    const verdict = verdictEl ? verdictEl.textContent.trim() : 'Unknown';

    if (!/accepted/i.test(verdict)) {
      statusDiv.textContent = `Verdict: ${verdict}. Only Accepted submissions can be analyzed.`;
      return;
    }
    statusDiv.textContent = 'Accepted ✔ Extracting source code...';

    const codeEl = doc.getElementById('program-source-text');
    if (!codeEl) {
      statusDiv.textContent = 'Unable to locate source code.';
      return;
    }

    const sourceCode = codeEl.textContent;
    statusDiv.textContent = 'Analyzing with Together AI...';

    const analysisText = await getAnalysis(sourceCode);
    statusDiv.textContent = 'Analysis completed!';
    resultDiv.textContent = analysisText;
  } catch (err) {
    statusDiv.textContent = 'Error: ' + err.message;
  }
});

async function getAnalysis(code) {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {role: 'system', content: "You are an expert in algorithms. For the given code, do the following per test case: 1) State Time Complexity, 2) State Space Complexity, 3) Briefly comment on the efficiency If the time complexity is not optimal, and then suggest a better approach and provide the optimized code (no comments, only code) Keep the response concise. Do not include unnecessary explanations, C/C++ headers, or test case handling. Focus only on the logic per test case."},
        {role: 'user', content: `Here is the submission code: ${code}`}
      ],
      max_tokens: 600,
      temperature: 0.2
    })
  });

  const data = await response.json();
  if (data && data.choices && data.choices.length) {
    return data.choices[0].message.content.trim();
  }
  throw new Error('Unexpected response format from Together AI.');
}
