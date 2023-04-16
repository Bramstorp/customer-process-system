import subprocess


def npm(self, action):
    if self == "logs":
        subprocess.run(["sudo", "docker", "logs", "frontend_dev", "--follow"])
    else:
        subprocess.run(
            ["sudo", "docker-compose", "-f", "docker-compose.yml", "exec", "frontend", "npm", self, action])
