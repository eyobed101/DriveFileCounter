import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function estimateFiles(drive, callback) {
    const executablePath = path.resolve(__dirname, 'bin', 'estimate_files.exe');

    const command = 'powershell';
    const args = ['-Command', `& ${executablePath} ${drive}`];
    

    const child = spawn(command, args);
    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
        output += data.toString();
    });

    child.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    child.on('close', (code) => {
        if (code !== 0) {
            return callback({
                success: false,
                error: `Executable exited with code ${code}.`,
                drive: drive,
                estimated_files: 0,
                stderr: errorOutput
            });
        }

        try {
            const jsonStart = output.lastIndexOf('{');
            const jsonString = output.substring(jsonStart);

            const result = JSON.parse(jsonString);
            callback(result);
        } catch (parseError) {
            callback({
                success: false,
                error: `Failed to parse executable output: ${parseError.message}`,
                drive: drive,
                estimated_files: 0,
                stdout: output,
                stderr: errorOutput
            });
        }
    });
}

export { estimateFiles };
