var canvas = document.getElementById('canvas');
var saveButton = document.getElementById('save');

function prepareDownload() {
	var ctx = canvas.getContext('2d');
	var img = new Image();

	var string = $('#string').val();
	var pattern = GeoPattern.generate(string);

	img.onload = function() {
		canvas.width = $('#width').val();
		canvas.height = $('#height').val();

        // canvas背景にimg繰り返しパターンをセット
        ctx.beginPath();
        var ptn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptn;
        ctx.rect(0, 0, $('#width').val(), $('#height').val());
        ctx.fill();

        // テキストをセット
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

		saveButton.download = string + '.png';
		try {
			saveButton.href = canvas.toDataURL('image/png');
		} catch (err) {
			saveButton.style.display = 'none';
		}
	};

	img.src = pattern.toDataUri();
}

$(function () {
    $('#title, #font-family, #font-weight, #font-size, #width, #height, #string').on('input', function(e) {
        prepareDownload();
    });
    $('#font-color').colorpicker().on('colorpickerChange', function(e) {
    	prepareDownload();
    });
    $('#string').trigger('input');
	$('#title').focus();
});


/*
 * draw a multiline string rotated in a canvas
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
