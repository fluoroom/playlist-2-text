sentenceCase = (str) => str[0].toUpperCase() + str.slice(1);
convertSentence = (sentence) => sentence.split(' ').map(sentenceCase).join(' ');
var dest = document.getElementById('dest');
var warning = document.getElementById('warning');
async function convert(){
warning.style.display='none';
var file = document.getElementById("file").files[0];
var ext =file.name.split('.').pop().toLowerCase();
if (file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (evt) {
        var numbers = document.getElementById('numbers');
        var zeros = document.getElementById('zeros');
        var artist = document.getElementById('artist');
        var showsep = document.getElementById('showsep');
        var capit = document.getElementById('capit');
        var separator = document.getElementById('separator').value;
        var order = document.getElementById('order').value;
        var result ='';
        var track = 1;
        var src = evt.target.result;
        if(ext=='m3u'||ext=='m3u8'){
        var parsed = M3U.parse(src);}else
        if(ext=='pls'){
        var parsed = PLS.parse(src);}else
        if(ext=='asx'){
        var parsed = ASX.parse(src);}else{
            alert('File is not M3U, M3U8, PLS or ASX');
            return false;
        }
        for (let i=0;i<parsed.length;i++){
            song=parsed[i];
            var digits=parsed.length.toString().length;
            if (numbers.checked==true) {
                if (zeros.checked==true) {
                    result=result+track.toString().padStart(digits,'0');
                }else{
                    result=result+track;
                }
                }
            track++;
            if(showsep.checked==true){result+=separator;}
            if(numbers.checked==true && showsep.checked==false){result+=' ';}
            if(!song.title==0){
                let songTitle = song.title.trim();
            if(artist.checked==true&&!song.artist==0){
                let songArtist = song.artist.trim();
                if(order==2){
                result+=songTitle+' - '+songArtist;
            }else{
                result+=songArtist+' - '+songTitle;
            }}else{
            result+=song.title;}}else{
                // if no title
                warning.style.display='inline-block';
                var filename =song.file.split('.');
                filename.pop()
                filename = filename.toString().split('\\').pop().split('/').pop().replace('_',' ');
                filename = filename.trim();
                result+=filename;

            }
            result +='\n';
                /* end for */ }
if (capit.checked) {result = convertSentence(result);}
dest.value=result;
return true;
    }
    reader.onerror = function (evt) {
        alert('Error reading file!');
        return false;
    }
}else{alert('No file selected!');return false;}
}

function copyResult(button)
{
    document.getElementById('dest').select();
    document.execCommand('copy');
    button.innerHTML = 'Copied!';
    setTimeout(function(){button.innerHTML='Copy result';},1000);
}

var sepinput =document.getElementById('separator');
document.getElementById('sepexample').innerHTML=sepinput.value.replace(/ /g,'&nbsp');
function sepexample(input){
    document.getElementById('sepexample').innerHTML=input.value.replace(/ /g,'&nbsp');
}