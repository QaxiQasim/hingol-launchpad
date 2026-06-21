import fs from 'fs';
import readline from 'readline';

const logFilePath = 'C:/Users/Innovation Factory/.gemini/antigravity-ide/brain/b088e2fa-80e2-40e5-b0b8-288d0a1dee41/.system_generated/logs/transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching for subagent report...");
  for await (const line of rl) {
    if (line.includes('browser_subagent') || line.includes('report') || line.includes('report":')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          console.log("Tool Calls:", JSON.stringify(obj.tool_calls).substring(0, 500));
        }
        if (obj.content && obj.content.includes("I have completed the verification process")) {
          console.log("FOUND REPORT IN CONTENT:");
          console.log(obj.content);
        }
      } catch (e) {
        // ignore
      }
    }
  }
}

processLineByLine();
