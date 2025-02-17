
# Drive File Counter

A C library to estimate the number of files on an NTFS drive using native Windows commands.

## Features:
- Estimates file count on NTFS drives.
- Simple API with structured results.
- Windows-specific implementation.

## Requirements:
- Windows OS
- NTFS file system
- Administrator privileges

## Installation:
Using vcpkg:
```sh
vcpkg install drive-file-counter
```

## Usage:
```c
#include <stdio.h>
#include "drive_file_counter.h"

int main() {
    FileCountResult result;
    estimate_files("C:", &result);

    if (result.success) {
        printf("Estimated files on drive %s: %ld\n", result.drive, result.estimated_files);
    } else {
        printf("Error: %s\n", result.error);
    }
    return 0;
}
```

## License:
MIT License
