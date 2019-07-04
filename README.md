# wiki-history-gif
Use wikimedia file history to create animated GIFs.

# Usage
```javascript
const { GIF } = require("wiki-history-gif");
(async () => {
    await GIF("https://commons.wikimedia.org/wiki/File:Example.png", 172, 178, "out.gif", 500, false);
})();
```

# Parameters:
- URL - link to image page (commons.wikimedia.org domain)
- Width - GIF width
- Height - GIF height
- Output File - Output file name (Default: "./out.gif")
- Delay - GIF delay (ms) between switching frames (Default: 500)
- Repeat - Should the GIF be an infinite loop? (Default: false)

# Future additions
- Currently this package only supports converting PNG files to GIFs. In the future I would like to support more file formats.