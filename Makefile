release.zip: manifest.json redirect.js
	zip $@ $^

clean:
	rm release.zip