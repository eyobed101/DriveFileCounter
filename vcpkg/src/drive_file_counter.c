#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "../include/drive_file_counter.h"

void estimate_files(const char *drive, FileCountResult *result) {
    char command[256];
    char buffer[512];
    FILE *fp;
    long estimated_files = 0;

    snprintf(command, sizeof(command), "fsutil fsinfo ntfsinfo %s", drive);
    
    fp = _popen(command, "r");
    if (fp == NULL) {
        result->success = 0;
        strcpy(result->error, "Failed to run command.");
        return;
    }

    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        if (strstr(buffer, "Total Clusters")) {
            char *token = strtok(buffer, ":");
            token = strtok(NULL, ":");
            estimated_files = atol(token);
        }
    }

    _pclose(fp);

    if (estimated_files > 0) {
        result->success = 1;
        result->estimated_files = estimated_files;
        strcpy(result->drive, drive);
    } else {
        result->success = 0;
        strcpy(result->error, "Failed to estimate file count.");
    }
}
