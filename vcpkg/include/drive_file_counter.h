#ifndef DRIVE_FILE_COUNTER_H
#define DRIVE_FILE_COUNTER_H

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    int success;
    char drive[4];
    long estimated_files;
    char error[256];
} FileCountResult;

void estimate_files(const char *drive, FileCountResult *result);

#ifdef __cplusplus
}
#endif

#endif
