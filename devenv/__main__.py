import click
from .docker_prod import docker_prod
from .docker_dev import docker_dev
from .docker_container import docker_container
from .postgressql import postgressql
from .fastapi import fastapi
from .npm import npm


@click.command()
@click.argument('env')
@click.argument('option', required=False)
@click.argument('action', required=False)
def main(env, option, action):
    if env == "dev":
        docker_dev(option)
    elif env == "prod":
        docker_prod(option)
    elif env == "psql":
        postgressql()
    elif env == "fastapi":
        fastapi(option)
    elif env == "docker":
        docker_container(option, action)
    elif env == "yarn":
        npm(option, action)
    else:
        print("command not found")

if __name__ == '__main__':
    main()
