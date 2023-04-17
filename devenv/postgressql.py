import subprocess


def postgressql():
    subprocess.run(
        ["sudo", "docker-compose", "-f", "docker-compose.yml", "exec", "db", "psql", "--username=customer_process_system_dev", "--dbname=customer_process_system_db"])