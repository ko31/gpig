var canvas = document.getElementById('canvas');
var saveButton = document.getElementById('save');

/*
 * Generate image
 */
function generateImage() {
	var ctx = canvas.getContext('2d');
	var img = new Image();

	var string = $('#string').val();
	var pattern = GeoPattern.generate(string);

	img.onload = function() {
		canvas.width = $('#width').val();
		canvas.height = $('#height').val();

        // Set image to canvas background
        ctx.beginPath();
        var ptn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptn;
        ctx.rect(0, 0, $('#width').val(), $('#height').val());
        ctx.fill();

        // Draw text to canvas
        var title = $('#title').val();
        var lines = title.split("\n");
        var start_y = ($('#height').val() / 2) - ((lines.length - 1) * $('#font-size').val() / 2);
        drawString(
            ctx,
            $('#title').val(),
            $('#width').val()/2,
            start_y,
            $('#font-color').val(),
            $('#font-family').val(),
            $('#font-size').val(),
            $('#font-weight:checked').val()
        );

        // Set image to download button
		saveButton.download = string + '.png';
		try {
			saveButton.href = canvas.toDataURL('image/png');
		} catch (err) {
			saveButton.style.display = 'none';
		}
	};

	img.src = pattern.toDataUri();
}

/*
 * Draw multiline text to canvas
 */
function drawString(ctx, text, posX, posY, textColor, font, fontSize, fontWeight) {
    var lines = text.split("\n");
    if (!font) {
        font = "'serif'";
    }
    if (!fontSize) {
        fontSize = 16;
    }
    if (!textColor) {
        textColor = '#000000';
    }
    ctx.save();
    if (fontWeight) {
        ctx.font = "bold " + fontSize + "px '" + font + "'";
    } else {
        ctx.font = fontSize + "px '" + font + "'";
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;
    ctx.translate(posX, posY);
    for (i = 0; i < lines.length; i++) {
         ctx.fillText(lines[i], 0, (fontSize * i * 1.1));
    }
    ctx.restore();
}

/*
 * Get random words
 */
function randomWords() {
    var words = [
        'Better late than never.',
        'Easy come, easy go.',
        'Every dog has its day.',
        'Honesty is the best policy.',
        'No man is an island.',
        'Practice makes perfect.',
        'Silence is gold.',
        'Stay hungry. Stay foolish.',
        'The sky is the limit.',
        'Time is money.'
    ];
    return words[Math.floor(Math.random() * words.length)];
}

/*
 * Initialize
 */
$(function () {
    $('#title').val(randomWords());
    $('#title, #font-family, #font-weight, #font-size, #width, #height, #string').on('input', function(e) {
        generateImage();
    });
    $('#font-color').colorpicker().on('colorpickerChange', function(e) {
        generateImage();
    });
    $('#string').trigger('input');
	$('#title').focus();
	$('#title').select();
});
