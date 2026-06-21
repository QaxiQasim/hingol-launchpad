import fs from 'fs';
import readline from 'readline';

const logFilePath = 'C:/Users/Innovation Factory/.gemini/antigravity-ide/brain/b088e2fa-80e2-40e5-b0b8-288d0a1dee41/.system_generated/logs/transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Reading transcript.jsonl...");
  for await (const line of rl) {
    if (line.includes('B52E8063F11401825BDB592625A9BFDB')) {
      try {
        const obj = JSON.parse(line);
        console.log(`Type: ${obj.type}, Status: ${obj.status}`);
        if (obj.content) console.log("Content:", obj.content.substring(0, 300));
        if (obj.tool_calls) console.log("Tool Calls:", JSON.stringify(obj.tool_calls).substring(0, 300));
        // If it's a response containing logs, print the logs
        const str = JSON.stringify(obj);
        if (str.includes("console") || str.includes("error") || str.includes("log")) {
          console.log("Found log details:", str.substring(str.indexOf("console") - 100, str.indexOf("console") + 500));
        }
      } catch (e) {
        console.log("Error parsing line:", e.message);
      }
    }
  }
}

processLineByLine();
