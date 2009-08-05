/*
* Flext - A Mootools Based Flexible TextArea Class
* version 1.1 - for mootools 1.2
* by Graham McNicoll
* 
* Copyright 2008-2009 - Education.com
* License:	MIT-style license. 
*/
var Flext=new Class({Implements:Options,options:{aniTime:300,maxHeight:0,defaultMaxHeight:1000,parentDepth:6,growClass:"growme",enterStoppedClass:"stopenter",enterSubmitsClass:"entersubmits",replaceGhostTextClass:"replaceghosttext",growParentsClass:"growparents",ghostTextAttr:"ghosttext",ghostClassAttr:"ghostclass"},initialize:function(B,A){this.setOptions(A);this.el=document.id(B);this.autoGrow=B.hasClass(this.options.growClass);this.stopEnter=B.hasClass(this.options.enterStoppedClass);this.enterSubmits=B.hasClass(this.options.enterSubmitsClass);this.useGhostText=B.hasClass(this.options.replaceGhostTextClass);this.growParents=B.hasClass(this.options.growParentsClass);if(this.autoGrow){this.resizer=new Fx.Tween(this.el,{duration:this.options.aniTime});this.getMaxSize();this.reachedMax=false;this.startSize=this.origSize=this.el.getSize().y;this.vertPadding=this.el.getStyle("padding-top").toInt()+this.el.getStyle("padding-bottom").toInt()+this.el.getStyle("border-top").toInt()+this.el.getStyle("border-bottom").toInt();this.el.setStyle("overflow","hidden");this.el.addEvents({keyup:function(C){this.checkSize(C)}.bind(this),change:function(C){this.checkSize(C)}.bind(this),click:function(C){this.checkSize(C)}.bind(this)});this.checkSize()}if(this.stopEnter){this.el.addEvent("keydown",function(C){if(C.key=="enter"){C.stop();if(this.enterSubmits){this.submitForm()}}}.bind(this))}if(this.useGhostText){this.ghostText=this.el.get(this.options.ghostTextAttr);this.ghostClass=this.el.get(this.options.ghostClassAttr);if(this.ghostText){if(this.el.value!=this.ghostText){this.el.removeClass(this.ghostClass)}this.el.addEvents({focus:function(C){if(this.el.value==this.ghostText){this.el.set("value","");if(this.ghostClass){this.el.removeClass(this.ghostClass)}}}.bind(this),blur:function(C){if(this.el.value==""){this.el.set("value",this.ghostText);if(this.ghostClass){this.el.addClass(this.ghostClass)}}}.bind(this)})}}},getMaxSize:function(){this.maxSize=this.options.maxHeight;if(this.maxSize==0){var A=this.el.className.match(/maxheight-(\d*)/);if(A){this.maxSize=A[1]}else{this.maxSize=this.options.defaultMaxHeight}}},checkSize:function(C){var B=this.el.getSize();var A=this.el.getScrollSize();if((A.y+this.vertPadding)>B.y){this.resizeIt(B,A)}},resizeIt:function(D,C){var A=C.y;if((C.y+this.vertPadding)>this.maxSize&&!this.reachedMax){A=this.maxSize;this.el.setStyle("overflow","");this.resizer.start("height",A);if(this.growParents){var B=A-this.startSize;this.resizeParents(this.el,0,B)}this.reachedMax=true}if(!this.reachedMax){var B=A-this.startSize;if(B<0){B=0}this.startSize=A;this.resizer.start("height",A);if(this.growParents){this.resizeParents(this.el,0,B)}}},resizeParents:function(D,C,B){if(C<this.options.parentDepth){var E=D.getParent();if(E){if(E.style.height&&E.style.height!=""){if(E.retrieve("flextAdjusted")){var A=(E.getStyle("height").toInt()+B)}else{E.store("flextAdjusted",true);var A=(E.getStyle("height").toInt()+B+this.vertPadding)}E.setStyle("height",A)}return this.resizeParents(E,(C+1),B)}return true}else{return true}},submitForm:function(){var B=this.el.getParent("form");if(B){var A=B.get("name");document[A].submit()}}});window.addEvent("domready",function(){$$("textarea.flext").each(function(B,A){new Flext(B)})});
