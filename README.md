
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">Estimate Files Counter</h3>
  <p align="center">
    A Node.js package for counting estimated files in a drive using a standalone executable.
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/eyobed101/DriveFileCounter/issues">Report Bug</a>
    ·
    <a href="https://github.com/eyobed101/DriveFileCounter/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#estimatefiles">`estimateFiles(drive, callback)`</a></li>
  </ol>
</details>

## About The Project

The **Estimate Files Counter** Node.js package allows you to estimate the number of files within a specific drive or directory using a standalone executable. This tool is useful for quickly gathering file statistics and integrating into Node.js applications.

### Key Features:
- **Cross-Platform Compatibility**: Works on Windows systems where NTFS file system metadata is available.
- **Accurate File Estimates**: Uses system-level utilities (fsutil) to gather metadata about the file system and estimates the number of files based on available data.
- **Easy Integration**: Simple API for Node.js applications to call, with results returned as JSON.
- **Admin Rights Check**: Ensures the script runs with Administrator privileges for system access.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install the NPM package:

   ```sh
   npm install drive-file-counter
   ```

### Usage

Once the package is installed, you can use it in your project by importing and calling the `estimateFiles` function. Here's an example of how to use it:

```js
import { estimateFiles } from 'estimate-files-counter';

estimateFiles('C:', (result) => {
    if (result.success) {
        console.log(`Estimated number of files on drive ${result.drive}: ${result.estimated_files}`);
    } else {
        console.error(`Error: ${result.error}`);
    }
});
```

#### Input:
- **drive** (String): The drive letter to estimate file count for (e.g., 'C:').

#### Output:
- **success** (Boolean): Whether the operation was successful.
- **drive** (String): The drive letter passed as input.
- **estimated_files** (Number): The estimated number of files on the drive.
- **error** (String, optional): Error message if the operation fails.

#### Important Notes:
- **Admin Rights**: The script requires administrator privileges to execute correctly. Ensure you run your Node.js process with elevated permissions.
- **Supported Platforms**: This tool is designed for Windows systems using NTFS. It may not be applicable to other file systems.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
