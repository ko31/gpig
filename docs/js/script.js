var canvas=document.getElementById("canvas"),saveButton=document.getElementById("save");function prepareDownload(){var a=canvas.getContext("2d"),i=new Image,l=$("#string").val(),t=GeoPattern.generate(l);i.onload=function(){canvas.width=$("#width").val(),canvas.height=$("#height").val(),a.beginPath();var t=a.createPattern(i,"repeat");a.fillStyle=t,a.rect(0,0,$("#width").val(),$("#height").val()),a.fill();var e=$("#title").val().split("\n"),n=$("#height").val()/2-(e.length-1)*$("#font-size").val()/2;drawString(a,$("#title").val(),$("#width").val()/2,n,$("#font-color").val(),$("#font-family").val(),$("#font-size").val(),$("#font-weight:checked").val()),saveButton.download=l+".png";try{saveButton.href=canvas.toDataURL("image/png")}catch(t){saveButton.style.display="none"}},i.src=t.toDataUri()}function drawString(t,e,n,a,l,o,r,v){var c=e.split("\n");for(o||(o="'serif'"),r||(r=16),l||(l="#000000"),t.save(),t.font=v?"bold "+r+"px '"+o+"'":r+"px '"+o+"'",t.textAlign="center",t.textBaseline="middle",t.fillStyle=l,t.translate(n,a),i=0;i<c.length;i++)t.fillText(c[i],0,r*i*1.1);t.restore()}$(function(){$("#title, #font-family, #font-weight, #font-size, #width, #height, #string").on("input",function(t){prepareDownload()}),$("#font-color").colorpicker().on("colorpickerChange",function(t){prepareDownload()}),$("#string").trigger("input"),$("#title").focus()});