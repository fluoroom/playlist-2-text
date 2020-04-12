function convert(){
var src = document.getElementById('source').value.replace(/^\s*[\r\n]/gm,'').trim();
var lines = src.split('\n').filter(Boolean);
length=lines.length;
digits=((length-1)/2).toString().length;
var dest = document.getElementById('dest');
var numbers = document.getElementById('numbers');
var zeros = document.getElementById('zeros');
var separator = document.getElementById('separator').value;
var result ='';
var track = 1;
for(let i = 1;i < length-1;i+=2){
	line=lines[i];
	if (numbers.checked==true) {
		if (zeros.checked==true) {
			result=result+track.toString().padStart(digits,'0');
		}else{
			result=result+track;
		}
		}
	track++;
    result = result + separator + line.substring(line.indexOf(",") + 1) +'\n';
}
dest.value=result;
}
function copyResult(button)
{
    document.getElementById('dest').select();
    document.execCommand('copy');
    button.innerHTML = 'Copied!';
    setTimeout(function(){button.innerHTML='Copy result';},1000);
}