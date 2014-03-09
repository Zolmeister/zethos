d()
b.innerHTML += "<style>body{width:600px;margin:0 auto;font-family:Courier,monospace}#o{font-size:40px;border:2px solid;width:21rem;display:inline-block}#i{resize:both;overflow:auto;padding:20px;width:600px;height:250px;margin:0 auto;border:1px solid}v{color:red}</style><br><button id=x onclick=p()>Play</button><br><br><div id=o>.</div><br><br><br><div contenteditable id=i>Welcome to <a contenteditable=false href=//zethos.zolmeister.com>Zethos!</a> <br><br>This is a speed reading tool, inspired by others such as Gritz, Sprtiz, and Spreeder. <br>It's free and open source on <a contenteditable=false href=//github.com/Zolmeister/Zethos>GitHub.";

var playing,index,input,loop,parse,focus,hyphenate;
parse = function(str) {
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
  
  hyphenate = function(str) {
    return str.length <= 7 ? str : str.length <= 10 ? str.slice(0,str.length - 3)+'- '+str.slice(str.length-3) : str.slice(0,7)+'- '+hyphenate(str.slice(7))
  }
  
  // return 2d array with word and focus point
  return str.trim().split(/[\s\n]+/).reduce(function(words, str) {
    // focus point
    focus = (str.length-1)/2|0
    
    for(j=focus;j>=0;j--)
      if (/[aeiou]/.test(str[j])) {
        focus = j
        break
      }
    
    t = 60000/500 // 500 wpm
      
    if (str.length > 6)
      t+=t/4
      
    if (~str.indexOf(','))
      t+=t/2
      
    if(/[\.!\?;]$/.test(str))
      t+= t*1.5
    
    return str.length >= 15 || str.length - focus > 7 ? words.concat(parse(hyphenate(str))) : words.concat([[str, focus, t]])
  }, [])
}

p = function() {
  index = 0
  input = parse(i.textContent);
  if(playing) {
     playing = 0
     return x.innerHTML = 'Play'
  }
  playing = 1;
  loop()
}

loop = function() {
  if(playing) {
      w = input[index++]
      if(!t) return p()
      
      o.innerHTML = Array(8 - w[1]).join('&nbsp;')+w[0].slice(0,w[1])+'<v>'+w[0][w[1]]+'</v>'+w[0].slice(w[1]+1)
      x.innerHTML = 'Stop'
      setTimeout(loop, w[2])
    }
}

p()