/**
 * lovely.io 'nanny' module v1.1.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("nanny-1.1.0",["dom-1.2.0","ui-1.2.0"],function(undefined){var $,Class,Element,Nanny,NodeList,UI,core,ext;return core=this.Lovely.module("core"),$=this.Lovely.module("dom-1.2.0"),UI=this.Lovely.module("ui-1.2.0"),ext=core.ext,Class=core.Class,Element=$.Element,NodeList=$.NodeList,Nanny=new Class(Element,{include:core.Options,extend:{Options:{scope:document.documentElement,timeout:4e3,position:"top",loop:!0,html:"",fxName:"fade",fxDuration:"normal",showNext:!0}},constructor:function Nanny(options){var _this=this;return this.setOptions(options),this.$super("div",{"class":"nanny"}),this.append(this.close=new Element("div",{"class":"nanny-icon-close",title:"Close"}),this.next=new Element("div",{"class":"nanny-icon-next",title:"Show next"}),this.body=new Element("div",{"class":"nanny-body"})),this.options.showNext||this.addClass("nanny-no-next-icon"),this.close.on("click",function(){return _this.stop()}),this.next.on("click",function(){return _this.showNext()}),this},start:function(){return this._stopped=!1,this._block=null,this.emit("start").showNext()},stop:function(){return this._stopped=!0,this.emit("stop").hide()},show:function(fx,options){var _this=this;return this.$super(fx||this.options.fxName,options||{duration:this.options.fxDuration,finish:function(){return _this.emit("show")}}),this.options.fxName?this:this.emit("show")},hide:function(fx,options){var _this=this;return this.$super(fx||this.options.fxName,options||{duration:this.options.fxDuration,finish:function(){return _this.emit("hide")}}),this.options.fxName?this:this.emit("hide")},showNext:function(){var block,options,_this=this;return(block=this.nextBlock())?(options=block.data("nanny")||{},options.html||(options.html=this.options.html),options.position||(options.position=this.options.position),options.timeout||(options.timeout=this.options.timeout),this.removeClass("nanny-top").removeClass("nanny-left").removeClass("nanny-right").removeClass("nanny-bottom"),this.addClass("nanny-"+options.position).body.html(options.html),this.style({visibility:"hidden"}).insertTo(document.body),this.moveNextTo(block).style({display:"none",visibility:"visible"}),this._timer&&window.clearTimeout(this._timer),options.timeout!==!1&&(this._timer=window.setTimeout(function(){if(!_this._stopped)return _this.showNext()},options.timeout)),this.show()):this.hide()},moveNextTo:function(block){var box,offset,position,size,win;return position=block.position(),size=block.size(),box=this.size(),win=$(window).size(),offset=8,position=function(){switch((block.data("nanny")||{}).position||this.options.position){case"top":return{x:position.x+(size.x-box.x)/2,y:position.y-box.y-offset};case"left":return{x:position.x-box.x-offset,y:position.y+(size.y-box.y)/2};case"right":return{x:position.x+size.x+offset,y:position.y+(size.y-box.y)/2};default:return{x:position.x+(size.x-box.x)/2,y:position.y+size.y+offset}}}.call(this),position.x<offset&&(position.x=offset),position.y<offset&&(position.y=offset),win.x<position.x+box.x+offset&&(position.x=win.x-box.x-offset),win.y<position.y+box.y+offset&&(position.y=win.y-box.y-offset),this.position(position)},nextBlock:function(){var blocks;blocks=$(this.options.scope).find("*[data-nanny], *[data-nanny-html]").sort(function(a,b){return(parseInt(a.data("nanny").order)||Infinity)-(parseInt(b.data("nanny").order)||Infinity)});if(this.options.loop||!this._block||this._block!==blocks[blocks.length-1])return this._block=blocks[blocks.indexOf(this._block)+1]||blocks[0]}}),ext(Nanny,{version:"1.1.0"})}),function(){var style=document.createElement("style"),rules=document.createTextNode("div.nanny,div.nanny> *{margin:0;padding:0;float:none;background:none;border:none;text-align:left;display:block;position:static;top:auto;left:auto;right:auto;bottom:auto;width:auto;height:auto;line-height:1.2em;font-size:1em}div.nanny{position:absolute;z-index:999999999;background-color:#ffffc8;border:1px solid rgba(255,220,200,0.8);border-radius:0.5em;box-shadow:1px 1px 10px rgba(0,0,0,0.5)}div.nanny:before{content:' ';display:block;position:absolute;border-color:inherit;background:inherit;width:16px;height:16px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}div.nanny.nanny-top:before{bottom:-8px;left:45%;border-left-width:1px;border-bottom-width:1px;box-shadow:4px 4px 7px rgba(0,0,0,0.2)}div.nanny.nanny-left:before{top:45%;right:-8px;border-top-width:1px;border-left-width:1px;box-shadow:5px -4px 7px rgba(0,0,0,0.2)}div.nanny.nanny-right:before{top:45%;left:-8px;border-right-width:1px;border-bottom-width:1px;box-shadow:-3px 3px 5px rgba(0,0,0,0.15)}div.nanny.nanny-bottom:before{top:-8px;left:45%;border-top-width:1px;border-right-width:1px;box-shadow:-3px -3px 5px rgba(0,0,0,0.15)}div.nanny>div.nanny-icon-close,div.nanny>div.nanny-icon-next{position:absolute;right:0.25em;top:0.1em;color:rgba(200,0,0,0.5);cursor:pointer}div.nanny>div.nanny-icon-close:before,div.nanny>div.nanny-icon-next:before{content:'✖';display:block;width:100%;text-align:center;font-weight:bold}div.nanny>div.nanny-icon-close:hover,div.nanny>div.nanny-icon-next:hover{color:rgba(200,0,0,0.7)}div.nanny>div.nanny-icon-next{right:1.25em}div.nanny>div.nanny-icon-next:before{content:'➽'}div.nanny.nanny-no-next-icon>div.nanny-icon-next{display:none}div.nanny>div.nanny-body{margin:1em}");style.type="text/css",document.getElementsByTagName("head")[0].appendChild(style),style.styleSheet?style.styleSheet.cssText=rules.nodeValue:style.appendChild(rules)}()