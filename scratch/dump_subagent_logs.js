import fs from 'fs';
import readline from 'readline';

const logFilePath = 'C:/Users/Innovation Factory/.gemini/antigravity-ide/brain/b088e2fa-80e2-40e5-b0b8-288d0a1dee41/.system_generated/logs/transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching for console logs...");
  for await (const line of rl) {
    if (line.includes('console_logs') || line.includes('CAPTURE_CONSOLE_LOGS') || line.includes('logs')) {
      const obj = JSON.parse(line);
      // Look for the output of browser console logs command
      if (obj.type === 'CODE_ACTION' || obj.type === 'SYSTEM_LOG' || obj.type === 'SUBAGENT_LOG') {
        const content = obj.content || "";
        if (content.includes("console.log") || content.includes("Console Log") || content.includes("Error") || content.includes("error")) {
          console.log(`Type: ${obj.type}`);
          console.log(content.substring(0, 1000));
        }
      }
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'capture_browser_console_logs') {
            console.log("Found tool call capture_browser_console_logs");
          }
        }
      }
    }
  }
}

processLineByLine();
