(function(e){function t(t){for(var o,s,c=t[0],i=t[1],l=t[2],d=0,p=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==r[i]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/typing_tool/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2435:function(e,t,n){"use strict";n("fe3d")},4850:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("5530"),r=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("7a23")),a=n("5502"),s=n("342d"),c=n.n(s),i={id:"app"};function l(e,t,n,o,a,s){var c=Object(r["m"])("Menu"),l=Object(r["m"])("TextRenderer");return Object(r["h"])(),Object(r["b"])("div",i,[Object(r["d"])(c),Object(r["d"])(l)])}var u=Object(r["t"])("data-v-384fe8d3");Object(r["j"])("data-v-384fe8d3");var d=Object(r["d"])("td",null,"Capital letters",-1),p=Object(r["d"])("td",null,"Text size",-1),h={class:"fontSizeControler"},b={class:"currentFontSize"},f=Object(r["d"])("td",null,"Font",-1),g=Object(r["d"])("td",null,"Words per sentence",-1);Object(r["i"])();var m=u((function(e,t,n,o,a,s){var c=Object(r["m"])("BurgerMenu"),i=Object(r["m"])("ToggleButton");return Object(r["h"])(),Object(r["b"])("div",{class:["Menu",{hide:!e.disableTyping}]},[Object(r["d"])(c,{onClick:s.onClickBurgerMenu},null,8,["onClick"]),Object(r["d"])("div",{class:["content",s.menuHiddenClass]},[Object(r["d"])("table",null,[Object(r["d"])("tr",null,[d,Object(r["d"])("td",null,[Object(r["d"])(i,{active:e.showCapitalLetters,onOnClickToggleButton:e.toggleCapitalLetters},null,8,["active","onOnClickToggleButton"])])]),Object(r["d"])("tr",null,[p,Object(r["d"])("td",h,[Object(r["d"])("span",b,Object(r["n"])(e.fontSize),1),Object(r["d"])("button",{class:"fontSizeControlerButtons",onClick:t[1]||(t[1]=function(){return e.increaseFontSize&&e.increaseFontSize.apply(e,arguments)})}," + "),Object(r["d"])("button",{class:"fontSizeControlerButtons",onClick:t[2]||(t[2]=function(){return e.decreaseFontSize&&e.decreaseFontSize.apply(e,arguments)})}," - ")])]),Object(r["d"])("tr",null,[f,Object(r["d"])("td",null,[Object(r["s"])(Object(r["d"])("select",{"onUpdate:modelValue":t[3]||(t[3]=function(e){return a.selectedFontValue=e})},[(Object(r["h"])(!0),Object(r["b"])(r["a"],null,Object(r["l"])(e.fonts,(function(t){var n=t.value,o=t.text;return Object(r["h"])(),Object(r["b"])("option",{key:n,value:n,selected:n===e.selectedFont&&"selected"},Object(r["n"])(o),9,["value","selected"])})),128))],512),[[r["p"],a.selectedFontValue]])])]),Object(r["d"])("tr",null,[g,Object(r["d"])("td",null,Object(r["n"])(e.wordsPerSentence),1)])])],2)],2)})),w=Object(r["t"])("data-v-b73b8dd2");Object(r["j"])("data-v-b73b8dd2");var y=Object(r["d"])("div",{class:"knob"},null,-1);Object(r["i"])();var v=w((function(e,t,n,o,a,s){return Object(r["h"])(),Object(r["b"])("div",{class:["ToggleButton",s.activeClass],onClick:t[1]||(t[1]=function(t){return e.$emit("on-click-toggle-button")})},[y],2)})),O={props:{active:{type:Boolean,default:!1}},computed:{activeClass:function(){return this.active?"active":""}}};n("7541");O.render=v,O.__scopeId="data-v-b73b8dd2";var j=O,k=Object(r["t"])("data-v-7c541e8a");Object(r["j"])("data-v-7c541e8a");var C=Object(r["d"])("div",{class:"bar"},null,-1),S=Object(r["d"])("div",{class:"bar"},null,-1),T=Object(r["d"])("div",{class:"bar"},null,-1);Object(r["i"])();var x=k((function(e,t){return Object(r["h"])(),Object(r["b"])("div",Object(r["g"])({class:"BuggerMenu"},Object(r["o"])(e.$listeners)),[C,S,T],16)}));n("646d");const F={};F.render=x,F.__scopeId="data-v-7c541e8a";var M=F,P={components:{BurgerMenu:M,ToggleButton:j},data:function(){return{selectedFontValue:"'Ubuntu Mono', monospace"}},watch:{selectedFontValue:function(e){this.setSelectedFont(e)}},computed:Object(o["a"])(Object(o["a"])({},Object(a["d"])(["fonts","fontSize","menuOpen","selectedFont","wordsPerSentence","disableTyping","showCapitalLetters"])),{},{menuHiddenClass:function(){return this.menuOpen?"":"hide"}}),methods:Object(o["a"])(Object(o["a"])({},Object(a["c"])(["toggleMenuOpen","setSelectedFont","increaseFontSize","decreaseFontSize","setDisableTyping","toggleCapitalLetters"])),{},{onClickBurgerMenu:function(){this.toggleMenuOpen(),this.disableTyping||this.setDisableTyping(!0)}})};n("cb92");P.render=m,P.__scopeId="data-v-384fe8d3";var z=P;function L(e){var t;null===(t=document.querySelector("#selectedFontStyle"))||void 0===t||t.remove();var n=document.createElement("style"),o=document.createTextNode("* { font-family: ".concat(e," }"));n.appendChild(o),n.setAttribute("id","selectedFontStyle"),document.head.appendChild(n)}var B={updateSelectedFont:L},V={class:"TextRenderer"},_={key:0,class:"articleTitle"};function q(e,t,n,o,a,s){var c=Object(r["m"])("InfoPanel");return Object(r["h"])(),Object(r["b"])("div",V,[Object(r["d"])(c),!e.disableTyping&&a.articleTitle.length?(Object(r["h"])(),Object(r["b"])("h1",_,Object(r["n"])(a.articleTitle),1)):Object(r["c"])("",!0),Object(r["d"])("div",{ref:"wrapViewer",class:["wrapViewer",{disabled:e.disableTyping}]},[Object(r["s"])(Object(r["d"])("input",{ref:"userInput",class:"userInput",disabled:"disabled",autofocus:"","onUpdate:modelValue":t[1]||(t[1]=function(e){return a.value=e}),onKeydown:t[2]||(t[2]=function(){return s.onKeydownUserInput&&s.onKeydownUserInput.apply(s,arguments)})},null,544),[[r["q"],a.value]]),Object(r["d"])("div",{ref:"viewer",class:"viewer",style:{fontSize:"".concat(e.fontSize,"px"),fontFamily:"".concat(e.selectedFont)},innerHTML:a.finalText},null,12,["innerHTML"])],2),Object(r["d"])("button",{class:"toogleTyping",onClick:t[3]||(t[3]=function(){return s.onClickToogleTyping&&s.onClickToogleTyping.apply(s,arguments)})},Object(r["n"])(s.toogleTypingBtnText),1),Object(r["s"])(Object(r["d"])("textarea",{ref:"customText","onUpdate:modelValue":t[4]||(t[4]=function(e){return a.sourceText=e}),class:["customText",{disabled:!e.disableTyping}],style:{fontSize:"".concat(e.fontSize,"px"),fontFamily:"".concat(e.selectedFont)},rows:"4",cols:"50"},null,6),[[r["q"],a.sourceText]])])}n("a15b"),n("ac1f"),n("1276"),n("5319"),n("99af"),n("caad"),n("d81d");var I=n("de48"),E=Object(r["t"])("data-v-40335e38");Object(r["j"])("data-v-40335e38");var U={class:"InfoPanel"},A=Object(r["d"])("tr",null,[Object(r["d"])("th",null,"Words"),Object(r["d"])("th",null,"Errors"),Object(r["d"])("th",null,"Sentences")],-1),W={class:"words"},D={class:"errors"},K={class:"errors"};Object(r["i"])();var R=E((function(e,t,n,o,a,s){return Object(r["h"])(),Object(r["b"])("div",U,[Object(r["d"])("table",null,[A,Object(r["d"])("tr",null,[Object(r["d"])("td",null,[Object(r["d"])("span",W,Object(r["n"])(e.wordsCount),1)]),Object(r["d"])("td",null,[Object(r["d"])("span",D,Object(r["n"])(e.errorCount),1)]),Object(r["d"])("td",null,[Object(r["d"])("span",K,Object(r["n"])(e.sentencePos+1)+" of "+Object(r["n"])(e.getSentencesCount),1)])])])])})),H={computed:Object(o["a"])(Object(o["a"])({},Object(a["d"])(["errorCount","fontSize","sentences","wordsCount","sentencePos","showCapitalLetters"])),Object(a["b"])(["getSentencesCount"])),methods:Object(a["c"])(["toggleCapitalLetters"])};n("a6af");H.render=R,H.__scopeId="data-v-40335e38";var N=H,$=["the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","not","word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","space","heard","best","hour","better","true","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave","green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","street","inch","multiply","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible","plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill","east","paint","language","among","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","size","vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","perhaps","pick","sudden","count","square","reason","length","represent","art","subject","region","energy","hunt","probable","bed","brother","egg","ride","cell","believe","fraction","forest","sit","race","window","store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument","kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower","clothe","strange","gone","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held","hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand","soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","ear","else","quite","broke","case","middle","kill","son","lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress","cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease","hole","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean","break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell","fit","flow","fair","bank","collect","save","control","decimal","gentle","woman","captain","practice","separate","difficult","doctor","please","protect","noon","whose","locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","crop","modern","element","hit","student","corner","party","supply","bone","rail","imagine","provide","agree","thus","capital","won't","chair","danger","fruit","rich","thick","soldier","process","operate","guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar","stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print","dead","spot","desert","suit","current","lift","rose","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term","opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop","stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent","oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister","steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening","condition","feed","tool","total","basic","smell","valley","nor","double","seat","arrive","master","track","parent","shore","division","sheet","substance","favor","connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market","degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth","shell","neck"],J=$;console.log("1000EnglishWords");var G=J.sort((function(){return Math.random()-.5})).join(" "),Q=["ArrowLeft","ArrowRight","Tab"],X={components:{InfoPanel:N},data:function(){return{currentPos:0,value:"",currentSentence:null,finalText:'<span class="active">&nbsp;</span>',sourceText:G,article:"",articleTitle:""}},watch:{value:function(e){e.length>=this.currentSentence.length&&(this.updateCurrentSentence(this.sentencePos+1),this.resetTyping()),this.updateViewer(e)}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(a["d"])(["fontSize","sentences","errorCount","sentencePos","selectedFont","disableTyping","wordsPerSentence","showCapitalLetters"])),Object(a["b"])(["getSentencesCount"])),{},{toogleTypingBtnText:function(){return this.disableTyping?"Click here to start typing":"Click here to stop typing"}}),mounted:function(){this.updateCurrentSentence(0),this.updateViewer(this.currentSentence)},methods:Object(o["a"])(Object(o["a"])({},Object(a["c"])(["setMenuOpen","setWordsCount","setErrorCount","setSentencePos","setDisableTyping","setSentences","increaseErrorCount"])),{},{updateErrorCount:function(e,t,n){e[n]!==t[n]&&this.increaseErrorCount()},updateWordsCount:function(e,t){var n=e.substr(0,t).split("␣").length-1;this.setWordsCount(n)},updateViewer:function(e){var t=[],n=0,o=e.replace(/ /g,"␣"),r=this.currentSentence.replace(/ /g,"␣");this.showCapitalLetters||(r=r.toLowerCase());for(var a=0;a<r.length;a++){var s=o[a],c=r[a],i=["letter"],l=c;if(a===this.value.length&&(n=a-1,i.push("active")),"undefined"!==typeof s){var u=s!==c?"error":"success";l=s,i.push(u)}"␣"===c&&i.push("space");var d='<span class="'.concat(i.join(" "),'">').concat(l,"</span>");t.push(d)}this.updateErrorCount(r,o,n),this.updateWordsCount(o,n),this.finalText=t.join("")},onKeydownUserInput:function(e){this.preventNotAllowedKeys(e),"Escape"===e.key&&this.resetTyping()},resetTyping:function(){this.currentPos=0,this.value="",this.setErrorCount(0),this.updateViewer(this.currentSentence)},preventNotAllowedKeys:function(e){Q.includes(e.key)&&e.preventDefault()},updateCurrentSentence:function(e){e>this.getSentencesCount?console.log("DONE"):(this.setSentencePos(e),this.setSentences(I["a"](this.wordsPerSentence,this.sourceText.split(" ")).map((function(e){return e.join(" ")}))),this.currentSentence=this.sentences[this.sentencePos])},onClickToogleTyping:function(){var e=this.$refs,t=e.customText,n=e.userInput;this.resetTyping(),this.setDisableTyping(!this.disableTyping),this.setMenuOpen(!1),this.updateCurrentSentence(0),this.disableTyping?t.focus():(n.removeAttribute("disabled"),n.focus(),this.showCapitalLetters?this.updateViewer(this.currentSentence):this.updateViewer(this.currentSentence.toLowerCase()))}})};n("2435");X.render=q;var Y=X,Z={name:"App",components:{Menu:z,TextRenderer:Y},computed:Object(o["a"])({},Object(a["d"])(["selectedFont","fonts"])),mounted:function(){this.selectedFont||this.setSelectedFont(this.fonts[1]),B.updateSelectedFont(this.selectedFont)},methods:Object(o["a"])({},Object(a["c"])(["setSelectedFont"])),watch:{selectedFont:function(e){B.updateSelectedFont(e)}},head:{link:[{rel:"preconnect",href:"https://fonts.gstatic.com"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap"}]}};n("857f");Z.render=l;var ee=Z,te={state:{errorCount:0,wordsCount:0,showCapitalLetters:!0,disableTyping:!0,value:"",sentences:[],sentencePos:0,wordsPerSentence:20,finalText:'<span class="active">&nbsp;</span>',sourceText:"",article:"",menuOpen:!1,selectedFont:"'Ubuntu Mono', monospace",fonts:[{text:"Ubuntu",value:"'Ubuntu Mono', monospace"},{text:"Roboto",value:"'Roboto Mono', monospace"}],articleTitle:"Amelia KralesA global phishing",fontSize:30},getters:{getSentencesCount:function(e){return e.sentences.length}},mutations:{toggleMenuOpen:function(e){e.menuOpen=!e.menuOpen},setMenuOpen:function(e,t){e.menuOpen=t},setSentencePos:function(e,t){e.sentencePos=t},setSentences:function(e,t){e.sentences=t},setDisableTyping:function(e,t){e.disableTyping=t},increaseErrorCount:function(e){e.errorCount+=1},setErrorCount:function(e,t){e.errorCount=t},increaseFontSize:function(e){e.fontSize+=1},decreaseFontSize:function(e){e.fontSize-=1},setWordsCount:function(e,t){e.wordsCount=t},setSelectedFont:function(e,t){e.selectedFont=t},toggleCapitalLetters:function(e){e.showCapitalLetters=!e.showCapitalLetters}}},ne=te;r["default"].use(c.a),r["default"].use(a["a"]);var oe=new a["a"].Store(Object(o["a"])({},ne));r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(ee)},store:oe}).$mount("#app")},"646d":function(e,t,n){"use strict";n("4850")},7541:function(e,t,n){"use strict";n("dd65")},"857f":function(e,t,n){"use strict";n("c643")},a6af:function(e,t,n){"use strict";n("e322")},adae:function(e,t,n){},c643:function(e,t,n){},cb92:function(e,t,n){"use strict";n("adae")},dd65:function(e,t,n){},e322:function(e,t,n){},fe3d:function(e,t,n){}});
//# sourceMappingURL=app.c34d9e67.js.map