#include <stdio.h>
#include "../include/drive_file_counter.h"

int main() {
    const char* drive = "C:"; 
    long estimated_files;
    int result = estimate_files(drive, &estimated_files);

    if (result == 0) {
        printf("Test Passed: Estimated files on %s: %ld\n", drive, estimated_files);
    } else {
        printf("Test Failed: Error code %d\n", result);
    }

    return 0;
}
