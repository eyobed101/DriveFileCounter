import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function estimateFiles() {
    const drive = ' '; // Hardcoded drive as 'C:'
    const executablePath = path.join(__dirname, 'estimate_files.exe');
    
    // Run via cmd instead of powershell
    const command = `cmd /c "${executablePath} ${drive}"`; // Run through cmd

    console.log(`Executing command: ${command}`); // Debugging: Log the command

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error({
                success: false,
                error: `Failed to execute executable: ${error.message}`,
                drive: drive,
                estimated_files: 0,
                stderr: stderr.toString() // Include stderr for debugging
            });
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        try {
            const result = JSON.parse(stdout);
            console.log(result);
        } catch (parseError) {
            console.error({
                success: false,
                error: `Failed to parse executable output: ${parseError.message}`,
                drive: drive,
                estimated_files: 0,
                stdout: stdout.toString(), // Include stdout for debugging
                stderr: stderr.toString() // Include stderr for debugging
            });
        }
    });
}

estimateFiles(); // Directly calling the function to execute
