d()
b.innerHTML += "<style>body{width:600px;margin:0 auto;font-family:Courier}#o{font-size:40px;border:2px solid;width:21rem;display:inline-block}#i{overflow:auto;padding:20px;width:600px;height:350px;border:1px solid}v{color:red}</style><br><br><button onclick=p()>Play</button><br><br><c id=o>.</c><br><br><p contenteditable id=i>Welcome to <a contenteditable=false href=//zethos.Zolmeister.com>Zethos!</a> <br><br>This is a speed reading tool inspired by Spritz ($3.5mil). <br>It's free and open source on <a contenteditable=false href=//github.com/Zolmeister/Zethos>GitHub.</a><br>-<a contenteditable=false href=//Zolmeister.com>Zolmeister";

var playing,index,loop,parse,focus,hyphenate,str,words;
parse = function(words, str) {
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
  
  hyphenate = function(words, str) {
    with(words)
    return length < 8 ? words : length < 11 ? slice(0,length - 3)+'- '+slice(length-3) : slice(0,7)+'- '+hyphenate(slice(7))
  }
  
  // return 2d array with word and focus point
  return words.trim().replace(/([.?!])([A-Z-])/g, '$1 $2').split(/\s+/).reduce(function(words, str) {
    with(str) {
      // focus point
      for(j=focus=(length-1)/2|0;j>=0;j--)
        if (/[aeiou]/.test(str[j])) {
          focus = j
          break
        }
      
      t = 60000/500 // 500 wpm
        
      if (length > 6)
        t += t/4
        
      if (~indexOf(','))
        t += t/2
        
      if(/[.?!]/.test(str))
        t+= t*1.5
      
      return length > 14 || length - focus > 7 ? words.concat(parse(hyphenate(str))) : words.concat([[str, focus, t]])
    }
  }, [])
}

p = function(words,str) {
  index = 0
  playing = !playing
  playing && loop()
}

loop = function(words,str) {
  w = parse(i.textContent)[index++] || p()
  o.innerHTML = Array(8 - w[1]).join('&nbsp;')+w[0].slice(0,w[1])+'<v>'+w[0][w[1]]+'</v>'+w[0].slice(w[1]+1)
  playing && setTimeout(loop, w[2])
}

p()