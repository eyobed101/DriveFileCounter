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
    
    # Decode outputs
    stdout = stdout.decode('utf-8', errors='ignore').strip()
    stderr = stderr.decode('utf-8', errors='ignore').strip()
    
    # Log outputs for debugging
    print(f"stdout: {stdout}")
    print(f"stderr: {stderr}")

    # Check if the command failed
    if pipe.returncode != 0:
        return {
            "success": False,
            "error": f"Failed to execute fsutil command: {stderr or 'Unknown error'}",
            "drive": drive,
            "estimated_files": 0,
            "stdout": stdout,
            "stderr": stderr
        }

    # Parse stdout
    estimated_files = 0
    mft_found = False
    for line in stdout.splitlines():
        if "Mft Valid Data Length" in line:
            mft_found = True
            parts = line.split()
            if len(parts) >= 7:
                try:
                    x = float(parts[5].replace(',', ''))
                    unit = parts[6]
                    if 'MB' in unit:
                        estimated_files = int(x * 1000000 / 1024)
                    elif 'GB' in unit:
                        estimated_files = int(x * 1000000000 / 1024)
                    elif 'TB' in unit:
                        estimated_files = int(x * 1000000000000 / 1024)
                    else:
                        estimated_files = 0
                except ValueError as ve:
                    return {
                        "success": False,
                        "error": f"Parsing error: {str(ve)}",
                        "drive": drive,
                        "estimated_files": 0,
                        "stdout": stdout,
                        "stderr": stderr
                    }
    
    if not mft_found:
        return {
            "success": False,
            "error": "'Mft Valid Data Length' not found in output.",
            "drive": drive,
            "estimated_files": 0,
            "stdout": stdout,
            "stderr": stderr
        }

    return {
        "success": True,
        "drive": drive,
        "estimated_files": estimated_files,
        "error": None
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
    print(json.dumps(result, indent=4))
