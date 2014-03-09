d()
b.innerHTML += '<style>body{text-align:center}#o{font-size:40px;font-family:sans;border:1px solid; width:21rem;display:inline-block} #i{padding:20px;text-align:left;width:600px;height:300px;margin:0 auto;border:1px solid}</style><button id=p onclick=play()>Play</button><br><br><span id=o style="text-align:left;font-family:\'Ubuntu Mono\', mono">_</span><br><br><br><div id=i>Welcome to <a href="//zethos.zolmeister.com">Zethos!</a> <br><br>\
Zethos is a speed reading tool, inspired by those such as Gritz, Sprtiz, and Spreeder. <br>\
It\'s free and open source on <a href="//github.com/Zolmeister/Zethos">GitHub</a>. <br><br>\
With Zethos, anyone can easily read at 500wpm instead of the average 250wpm. <br>\
It works by keeping your eyes focused on one single point, the zethos-letter in red, to minimize the work your eye has do do while reading. Most reading time is spent on small eyemovements scanning across a \
page, but by keeping everything in one place the reader can read more quickly and may even increase comprehention. <br><br>\
Want to embed Zethos on your website? It\'s easy, just embed the code below, and set a global javascript variable named \'Z\'\ with the value of your text. Zethos will handle the rest. </div><br>Speed (wpm): <input id=s value=500>';

i.contentEditable = true
playing = false
function hyphenate(str) {
  if (str.length <= 7) {
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
function parse(str) {
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
  return str.trim().split(/[\s\n]+/).reduce(function(words, word) {
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
  input = parse(i.textContent);
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
      
      if (w[0].length > 6)
        t+=t/4
        
      if (~w[0].indexOf(','))
        t+=t/2
        
      if(/[\.!\?;]$/.test(w[0])) {
        t+= t*1.5
      }
      
      setTimeout(loop, t)
    }
  })()  
}