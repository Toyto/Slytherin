build:
	npm --prefix /Users/andrew/MyProjects/Slitherin/reactapp run build

start:
	npm --prefix /Users/andrew/MyProjects/Slitherin/reactapp run start

test:
	flake8 chamberofs/core --exclude migrations && chamberofs/manage.py test chamberofs/core/tests
