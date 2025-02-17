import { estimateFiles } from './index.js';
estimateFiles('C:', (result) => {
    if (result.success) {
        console.log(`Estimated files on ${result.drive}: ${result.estimated_files}`);
    } else {
        console.error(`Error: ${result.error}`);
    }
});
