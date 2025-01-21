function addToColors(colors, data) {
    if (colors.length < data.length)
                colors.push('#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substr(1));
}