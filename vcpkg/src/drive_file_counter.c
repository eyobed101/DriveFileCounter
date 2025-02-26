#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>
#include "../include/drive_file_counter.h"

int is_admin() {
    PSID pSID = NULL;
    BOOL isAdmin = FALSE;

    SID_IDENTIFIER_AUTHORITY NtAuthority = SECURITY_NT_AUTHORITY;
    if (AllocateAndInitializeSid(&NtAuthority, 2, SECURITY_BUILTIN_DOMAIN_RID, DOMAIN_ALIAS_RID_ADMINS, 0, 0, 0, 0, 0, 0, &pSID)) {
        if (!CheckTokenMembership(NULL, pSID, &isAdmin)) {
            isAdmin = FALSE;
        }
        FreeSid(pSID);
    }
    return isAdmin;
}

int main() {
    if (!is_admin()) {
        printf("{\n\"success\": false,\n\"error\": \"Please run the program as Administrator and try again.\",\n\"drive\": null,\n\"estimated_files\": 0\n}\n");
        return 1;
    }

    const char* drive = "C:";

    if (drive[strlen(drive) - 1] != ':') {
        printf("{\n\"success\": false,\n\"error\": \"Drive letter must end with ':' (e.g., C:)\",\n\"drive\": \"%s\",\n\"estimated_files\": 0\n}\n", drive);
        return 1;
    }

    long estimated_files;
    int result = estimate_files(drive, &estimated_files);

    if (result == 0) {
        printf("{\n\"success\": true,\n\"error\": null,\n\"drive\": \"%s\",\n\"estimated_files\": %ld\n}\n", drive, estimated_files);
    } else {
        printf("{\n\"success\": false,\n\"error\": \"Failed to estimate files.\",\n\"drive\": \"%s\",\n\"estimated_files\": 0\n}\n", drive);
    }

    return 0;
}
