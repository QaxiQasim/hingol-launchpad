import fs from 'fs';
import readline from 'readline';

const logFilePath = 'C:/Users/Innovation Factory/.gemini/antigravity-ide/brain/b088e2fa-80e2-40e5-b0b8-288d0a1dee41/.system_generated/logs/transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching for console logs outputs...");
  for await (const line of rl) {
    if (line.includes('browser_console_logs') || line.includes('CAPTURE_BROWSER_CONSOLE_LOGS')) {
      try {
        const obj = JSON.parse(line);
        if (obj.content) {
          console.log("LOG CONTENT:", obj.content.substring(0, 1000));
        }
      } catch (e) {}
    }
  }
}

processLineByLine();
