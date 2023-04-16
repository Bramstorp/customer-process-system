from setuptools import setup

"""setup.py: setuptools control."""


setup(
    name='devenv-cli',
    version='0.0.1',
    packages=['devenv'],
    install_requires=[
        'click',
    ],
    entry_points = {
        "console_scripts": ['devenv=devenv.__main__:main']
    },
)