
test:
	@./support/expresso/bin/expresso 

docs.html: index.js
	dox --title "Connect Form" \
		--ribbon "http://github.com/visionmedia/connect-form" \
		$< > $@

.PHONY: test