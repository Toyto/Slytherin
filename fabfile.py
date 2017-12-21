from fabric.api import local


def is_work():
    print('It works!')

def get_version():
    version = local("git describe --tag", capture=True)
    return version

def build():
    local('echo %s > version.py' % (get_version()))
    local('tar -zcvf slitherin.tar.gz ../Slitherin')
    print('Success!')