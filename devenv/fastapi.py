import subprocess


def fastapi(self):
    if self == "logs":
        subprocess.run(["sudo", "docker", "logs", "backend_fastapi_dev", "--follow"])