#ifndef DRIVE_FILE_COUNTER_H
#define DRIVE_FILE_COUNTER_H

#include <windows.h>
#include <stdio.h>

int estimate_files(const char* drive, long* estimated_files);

#endif
