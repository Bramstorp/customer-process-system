import click
import subprocess


def docker_container(command, action):
    if action == "frontend":
        subprocess.run(["sudo", "docker", command, "frontend_dev"])
    elif action == "backend":
        subprocess.run(["sudo", "docker", command, "backend_django_dev"])
    elif action == "db":
        subprocess.run(["sudo", "docker", command, "frontend_dev"])
    else:
        click.echo("no such container")
