import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function estimateFiles() {
    const drive = 'C:';  // Hardcoded drive as 'C:'
    const executablePath = path.join(__dirname, 'estimate_files.exe');
    
    // Use spawn to pass arguments more cleanly
    const child = spawn(executablePath, [drive], {
        shell: true,
        windowsHide: false
    });

    // Capture standard output
    child.stdout.on('data', (data) => {
        console.log(`Output: ${data}`);
    });

    // Capture standard error
    child.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Capture exit code
    child.on('close', (code) => {
        console.log(`Process exited with code: ${code}`);
    });
}

estimateFiles();
