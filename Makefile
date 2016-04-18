setup:
	npm install -g webpack webpack-dev-server
	npm install
run:
	npm start

build:
	webpack -optimize-minimize
