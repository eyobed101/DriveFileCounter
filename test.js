import { estimateFiles } from './index.js';

estimateFiles('C:', (result) => {
    if (result.success) {
        console.log(`Estimated number of files on ${result.drive}: ${result.estimated_files}`);
    } else {
        console.error(`Error: ${result.error}`);
        if (result.stderr) {
            console.error(`Executable stderr: ${result.stderr}`);
        }
        if (result.stdout) {
            console.error(`Executable stdout: ${result.stdout}`);
        }
    }
});
