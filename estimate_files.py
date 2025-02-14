from subprocess import Popen, PIPE
import sys
import json

def is_admin():
    """Check if the script is running as Administrator."""
    check_admin = Popen(['net', 'session'], stdout=PIPE, stderr=PIPE)
    check_admin.communicate()
    return check_admin.returncode == 0

def build(drive):
    """Estimate the number of files on a drive."""
    command = ['fsutil', 'fsinfo', 'ntfsinfo', drive]
    pipe = Popen(command, stdout=PIPE, stderr=PIPE)
    stdout, stderr = pipe.communicate()
    
    if pipe.returncode != 0:
        error_message = stderr.decode('utf-8').strip()
        return {
            "success": False,
            "error": f"Failed to execute fsutil command: {error_message}",
            "drive": drive,
            "estimated_files": 0
        }

    for line in stdout.decode('utf-8').splitlines():
        if "Mft Valid Data Length" in line:
            parts = line.split()
            if len(parts) >= 7:
                x = float(parts[5])
                unit = parts[6]
                if 'MB' in unit:
                    estimated_files = int(x * 1000000 / 1024)
                elif 'GB' in unit:
                    estimated_files = int(x * 1000000000 / 1024)
                elif 'TB' in unit:
                    estimated_files = int(x * 1000000000000 / 1024)
                else:
                    estimated_files = 0
                
                return {
                    "success": True,
                    "drive": drive,
                    "estimated_files": estimated_files,
                    "error": None
                }
    
    return {
        "success": False,
        "error": "Could not find 'Mft Valid Data Length' in fsutil output.",
        "drive": drive,
        "estimated_files": 0
    }

if __name__ == "__main__":
    if not is_admin():
        print(json.dumps({
            "success": False,
            "error": "Please run the script as Administrator and try again.",
            "drive": None,
            "estimated_files": 0
        }))
        sys.exit(1)

    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "Usage: python script_name.py <drive_letter>",
            "drive": None,
            "estimated_files": 0
        }))
        sys.exit(1)
    
    drive = sys.argv[1]
    if not drive.endswith(':'):
        print(json.dumps({
            "success": False,
            "error": "Drive letter must end with ':' (e.g., C:)",
            "drive": drive,
            "estimated_files": 0
        }))
        sys.exit(1)
    
    result = build(drive)
    print(json.dumps(result))