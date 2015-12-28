site: index.html main.js
	python -m "SimpleHTTPServer" >> server.log 2>&1 &

index.html:
	file index.html > /dev/null

main.js:
	file main.js > /dev/null

restart:
	kill `pidof python`
