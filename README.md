A lightweight Node.js package for estimating the number of files on a specified drive. This package leverages an executable (estimate_files.exe) to calculate the estimated number of files on any given drive by querying system metadata. The tool is designed for easy integration into any Node.js project, offering a simple API to run file count estimates on local drives (e.g., C:, D:, etc.).

Key Features:
Cross-Platform Compatibility: Works on Windows systems where NTFS file system metadata is available.
Accurate File Estimates: Uses system-level utilities (fsutil) to gather metadata about the file system and estimates the number of files based on available data.
Easy Integration: Simple API for Node.js applications to call, with results returned as JSON.
Admin Rights Check: Ensures the script runs with Administrator privileges for system access.

Installation:
Install the package via npm:

npm install drive-file-counter


Usage:

import { estimateFiles } from 'drive-file-counter';

estimateFiles('C:', (result) => {
    if (result.success) {
        console.log(`Estimated number of files on drive ${result.drive}: ${result.estimated_files}`);
    } else {
        console.error(`Error: ${result.error}`);
    }
});


Input:
drive (String): The drive letter to estimate file count for (e.g., 'C:').


Output:
success (Boolean): Whether the operation was successful.
drive (String): The drive letter passed as input.
estimated_files (Number): The estimated number of files on the drive.
error (String, optional): Error message if the operation fails.


Important Notes:
Admin Rights: The script requires administrator privileges to execute correctly. Ensure you run your Node.js process with elevated permissions.
Supported Platforms: This tool is designed for Windows systems using NTFS. It may not be applicable to other file systems.