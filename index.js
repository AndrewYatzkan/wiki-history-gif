const fetch = require("node-fetch");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');

module.exports.GIF = async (URL, width, height, outputFile="out.gif", delay=500, repeat=false) => {
	try {
		const encoder = new GIFEncoder(width, height);
		var req = await fetch(URL);
		var res = await req.text();
		var { document } = (new JSDOM(res)).window;
		var urls = Array.from(document.querySelectorAll(".filehistory a[href^=http]")).filter((val, i) => i % 2).map(i => i.href);
		for (var i = 0; i < urls.length; i++) {
			var fileName = `img${i}.png`;
			var dest = fs.createWriteStream(`${__dirname}/${fileName}`);
			req = await fetch(urls[i]);
			req.body.pipe(dest);
		}
		var stream = pngFileStream("img?.png")
			.pipe(encoder.createWriteStream({ repeat: -!repeat, delay }))
			.pipe(fs.createWriteStream(outputFile));
		stream.on("finish", () => {
			for (var i = 0; i < urls.length; i++) {
				var fileName = `img${i}.png`;
				fs.unlinkSync(fileName);
			}
		});
	} catch (e) {
		throw e;
	}
};