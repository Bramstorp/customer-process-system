import click
import subprocess


def docker_prod(self):
    if self == "start":
        subprocess.run(
            ["sudo", "docker-compose", "-f", "docker-compose-prod.yml", "up", "-d", "--build"])
    elif self == "down":
        subprocess.run(
            ["sudo", "docker-compose", "-f", "docker-compose-prod.yml", "down", "-v"])
    elif self == "build":
        subprocess.run(
            ["sudo", "docker-compose", "-f", "docker-compose-prod.yml", "build"])
    elif self == "up":
        subprocess.run(
            ["sudo", "docker-compose", "-f", "docker-compose-prod.yml", "up"])
    else:
        click.echo("DET FADME IKKE EN DOCKER COMMAND")
