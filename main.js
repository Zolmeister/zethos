d()
b.innerHTML += '<style>body{text-align:center}#o{font-size:40px;font-family:sans;border:1px solid; width:21rem;display:inline-block}</style><button id=p onclick=play()>Play</button><br><br><span id=o style="text-align:left;font-family:\'Ubuntu Mono\', mono">_</span><br><br><br><textarea rows=20 cols=100 id=i>12345678901234 speed read anything, while reading for speed. comprehension is key as anything can be read in a speedy way but still have great results. while text can be complex, reading may be greater for anything speed read is comprehended. feel free to read anything here to better grasp results comprehended</textarea><br>Speed (wpm): <input id=s value=500>';


playing = false

function hyphenate(str) {
  if (str.lenth <= 7) {
    return str
  }
  if (str.length <= 10) {
    return str.slice(0,str.length - 3)+'-'+str.slice(str.length-3)
  }
  if (str.length <= 14) {
    return str.slice(0,7)+'-'+str.slice(7)
  }
  return str.slice(0,7)+'-'+hyphenate(str.slice(7))
}
function getFocus(str) {
  var focus = ~~(str.length/2)
  for(var i=focus;i>=0;i--){
    if ('aeiou'.indexOf(str[i]) !== -1){
      focus = i
      break
    }
  }
  return focus
}
function parse(string) {
  // Logic
  // strings will be broken out into words
  // find the focus point of the word
  // if, when the word is shifted to its focus point
  //   one end prodtrudes from either end more than 7 chars
  //   re-run parser after hyphenating the words
  
  // focus point
  // start in middle of word (default focus point)
  // move left until you hit a vowel, then stop
  
  // hyphenating
  //    if <= 7 chars
  //      return self
  //    if <= 10
  //    return x, {3}
  //    if <= 14 chars
  //    return {7},{7}
  //    else
  //    return {7},hyphenated{x}
  
  // return 2d array with word and focus point
  return string.split(' ').reduce(function(words, word) {
    // focus point
    var focus = getFocus(word);
    if ( word.length >= 15 || word.length - focus > 7) {
      words = words.concat(parse(hyphenate(word).replace(/-/g,'- ')))
    } else {
      words.push([word, focus])
    }
    return words
  }, [])
}

function repeat(s, n) {
  var o = '';
  for(var i=0;i<n;i++){
    o+=s
  }
  return o
}

function play() {
  index = 0
  input = parse(i.value);
  if(playing) {
     playing = false
     p.innerHTML = 'Play'
     return
  }
  playing = true;
  
  (function loop() {
    if(playing) {
      if(!input[index]) return p.innerHTML = 'Play'
      var w = input[index]
      o.innerHTML = repeat('&nbsp;', 7 - w[1])+w[0].slice(0,w[1])+'<span style="color:red;">'+w[0][w[1]]+'</span>'+w[0].slice(w[1]+1)
      p.innerHTML = 'Stop'
      index++
      var t = 60000/s.value
      /*
      $next_shot += ($timeout / 4 ) * ($word_length - 6) if ($word_length > 6);
	$next_shot += $timeout / 2 if ($word =~ /.*,$/);
	$next_shot += $timeout * 1.5 if ($word =~ /.*[\.!\?;]«?$/);
    */
      
      if (w[0].length > 6) {
        t+=t/4
      }
      if(w[0].indexOf(',')!==-1) {
        t+=t/2
      }
      if(/[\.!\?;]$/.test(w[0])) {
        t+= t*1.5
      }
      setTimeout(loop, t)
    }
  })()  
}