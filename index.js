import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function estimateFiles(drive, callback) {
    const executablePath = path.join(__dirname, 'estimate_files.exe');
    
    // Corrected PowerShell command (without extra quotes around the path and drive argument)
    const command = `powershell -Command "& ${executablePath} ${drive}"`;  // No quotes for arguments

    console.log(`Executing command: ${command}`); // Debugging: Log the command

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback({
                success: false,
                error: `Failed to execute executable: ${error.message}`,
                drive: drive,
                estimated_files: 0,
                stderr: stderr.toString() // Include stderr for debugging
            });
        }

        try {
            const result = JSON.parse(stdout);
            callback(result);
        } catch (parseError) {
            callback({
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

export { estimateFiles };
