sentenceCase = (str) => str[0].toUpperCase() + str.slice(1)
convertSentence = (sentence) => sentence.split(' ').map(sentenceCase).join(' ')
var dest = document.getElementById('dest')
var warning = document.getElementById('warning')

function processSong(song, track, digits){
  var numbers = document.getElementById('numbers')
        var pad = document.getElementById('pad')
        var artist = document.getElementById('artist')
        var numSeparator = document.getElementById('numSeparator').value
        var artSeparator = document.getElementById('artSeparator').value
        var order = document.getElementById('order').value
        var result = ''
        if (numbers.checked == true) {
          if (pad.checked == true) {
            result = result + track.toString().padStart(digits, '0')
          } else {
            result = result + track
          }
          result += numSeparator
        }
        if (!song.title == 0) {
          const songTitle = song.title.trim()
          if (artist.checked == true && !song.artist == 0) {
            const songArtist = song.artist.trim()
            if (order == 2) {
              result += songTitle + artSeparator + songArtist
            } else {
              result += songArtist + artSeparator + songTitle
            }
          } else {
            result += song.title
          }
        } else {
          // if no title
          warning.style.display = 'inline-block'
          var filename = song.file.split('.')
          filename.pop()
          filename = filename.toString().split('\\').pop().split('/').pop().replace('_', ' ')
          filename = filename.trim()
          result += filename
        }
        return result
}

async function convert() {
  warning.style.display = 'none'
  var file = document.getElementById('file').files[0]
  var ext = file.name.split('.').pop().toLowerCase()
  if (file) {
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (evt) {
      var src = evt.target.result
      if (ext == 'm3u' || ext == 'm3u8') {
        var parsed = M3U.parse(src)
      } else
      if (ext == 'pls') {
        var parsed = PLS.parse(src)
      } else
      if (ext == 'asx') {
        var parsed = ASX.parse(src)
      } else {
        alert('File is not M3U, M3U8, PLS or ASX')
        return false
      }
      var track=1
      var result=''
      for (let i = 0; i < parsed.length; i++) {
        song = parsed[i]
        result += processSong(song, track, parsed.length.toString().length)
        track++        
        result += '\n'
        /* end for */ }
      if (document.getElementById('capit').checked) { result = convertSentence(result) }
      dest.value = result
      return true
    }
    reader.onerror = function (evt) {
      alert('Error reading file!')
      return false
    }
  } else { alert('No file selected!'); return false }
}

function copyResult (button) {
  document.getElementById('dest').select()
  document.execCommand('copy')
  button.innerHTML = 'Copied!'
  setTimeout(function () { button.innerHTML = 'Copy result' }, 1000)
}

function sepexample() {
  song = {title:"Let it be",artist:"The beatles"}
  var result = processSong(song, 1,2)
  if (document.getElementById('capit').checked) { result = convertSentence(result) }
  document.getElementById('sepexample').innerHTML = result
  return true
}
sepexample();
