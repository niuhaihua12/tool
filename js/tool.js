// JavaScript Document
var textAttr=[{
	fontFamily:'黑体',
	fontSize:12,
	color:"#000",
	bgColor:"#fff",
	fontbold:false,
	italic:false,
	underline:false,
	justify:"left",
	}];
var tools={
	tab:function(ele){
		ele.bind("click",function(e){//切换ui焦点
			var index=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).find(".comp-text").css("fontSize")!==undefined){
				textAttr.fontSize=$(this).find(".comp-text").css("fontSize");
			    textAttr.fontSize=textAttr.fontSize.substring(0,textAttr.fontSize.length-2);
				textAttr.fontFamily=$(this).find(".comp-text").css("fontFamily");
				textAttr.color=$(this).find(".comp-text").css("color");
				textAttr.bgColor=$(this).find(".comp-text").css("backgroundColor");
				textAttr.fontbold=$(this).find(".comp-text").css("fontWeight");
				textAttr.italic=$(this).find(".comp-text").css("fontStyle");
				textAttr.underline=$(this).find(".comp-text").css("textDecoration");
				textAttr.justify=$(this).find(".comp-text").css("textAlign");
				if(textAttr.justify=="left"){
					textAttr.justify="left";
					}else if(textAttr.justify=="center"){
					    textAttr.justify="center";
						}else{
					        textAttr.justify="right";
							}
				console.log(textAttr.color+'  '+textAttr.bgColor+'  '+textAttr.fontbold+'  '+textAttr.italic+'  '+textAttr.underline+'  '+textAttr.justify);
				}
			
			$(this).siblings().find(".comp-text").attr("contenteditable",false);
			$(this).find(".element").resizable({disabled:false});
			$(this).siblings().find(".element").resizable({disabled:true});
			e.stopPropagation();
			})
		},
	textEdit:function(ele){//编辑文字
		ele.bind("dblclick",function(){
			$(this).attr("contenteditable",true);
			$(this).parents("li").draggable({disabled:true});
			$(this).focus();
			tools.selectAllTxt(this);
			$(".widget-textcontrol").show();
			fontEdit.fontFamily($(".widget-textcontrol-fontfamily"));
	        fontEdit.fontsizeSelect($(".textcontrol-fontsize"));
	        fontEdit.fontsizeBig($(".widget-textcontrol-big"));
	        fontEdit.fontsizeSmall($(".widget-textcontrol-small"));
	        fontEdit.color($(".widget-textcontrol-color"));
	        fontEdit.bgColor($(".widget-textcontrol-backgroundcolor"));
	        fontEdit.fontBold($(".widget-textcontrol-bold"));
	        fontEdit.italic($(".widget-textcontrol-italic"));
	        fontEdit.underline($(".widget-textcontrol-underline"));
	        fontEdit.justify($(".widget-textcontrol-justify"));
			});
		},
	removeAll:function(){//回到初始状态
		$(".edit-area").click(function(e){
			$(".edit-area li").removeClass("on");
			$(".comp-text").attr("contenteditable",false);
			$(".edit-area li").draggable({disabled:false});
			$(".element").resizable({disabled:true});
			$(".widget-textcontrol").hide();
		    });
		},
	selectAllTxt:function(text){
			if(window.getSelection().toString().length>0){
				return false;
			}else{  
				if (document.body.createTextRange) {
						var range = document.body.createTextRange();
						range.moveToElementText(text);
						range.select();
					} else if (window.getSelection) {
						var selection = window.getSelection();
						var range = document.createRange();
						range.selectNodeContents(text);
						selection.removeAllRanges();
						selection.addRange(range);   
					} else {
						console.log("notext");;
					}
			}
		},
	contextMenu:function(ele){//右键菜单
		
		}
	}
var fontEdit={//文字编辑条
    fontFamily:function(ele){
		ele.click(function(e){
			$(this).toggleClass("up");
			$(this).find("div").click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				textAttr.fontFamily=$(this).text();
				$(".edit-area li.on").find(".comp-text").css({fontFamily:textAttr.fontFamily});
				});
			//
			console.log(textAttr.fontFamily);
			})
		},
	fontsizeSelect:function(ele){
		ele.click(function(e){
			$(this).toggleClass("up");
			$(this).find("div").click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				textAttr.fontSize=$(this).text().substring(0,$(this).text().length-2);
				$(".edit-area li.on").find(".comp-text").css({fontSize:textAttr.fontSize+"px"});
				});
			//
			console.log(textAttr.fontSize);
			})
		},
	fontsizeBig:function(ele){
		ele.click(function(e){
			textAttr.fontSize=Number(textAttr.fontSize)+2;
			$(".edit-area li.on").find(".comp-text").css({fontSize:textAttr.fontSize+"px"});
			console.log("big:"+textAttr.fontSize);
			})
		},
	fontsizeSmall:function(ele){
		ele.click(function(e){
			textAttr.fontSize=Number(textAttr.fontSize)-2;
			$(".edit-area li.on").find(".comp-text").css({fontSize:textAttr.fontSize+"px"});
			console.log("small:"+textAttr.fontSize);
			})
		},
	color:function(ele){
		ele.click(function(e){
			textAttr.color="rgb(255,0,0)";
			$(".edit-area li.on").find(".comp-text").css({color:textAttr.color});
			console.log("color:"+textAttr.color);
			})
		},
	bgColor:function(ele){
		ele.click(function(e){
			textAttr.bgColor="rgba(255,255,255,1)";
			$(".edit-area li.on").find(".comp-text").css({backgroundColor:textAttr.bgColor});
			console.log("bgcolor:"+textAttr.bgColor);
			})
		},
	fontBold:function(ele){
		ele.click(function(e){
			if(textAttr.fontBold!=="bold"){
				textAttr.fontBold="bold";
				}else{
					textAttr.fontBold="normal";
					}
			$(".edit-area li.on").find(".comp-text").css({fontWeight:textAttr.fontBold});
			console.log("fontBold:"+textAttr.fontBold);
			})
		},
	italic:function(ele){
		ele.click(function(e){
			if(textAttr.italic!=="italic"){
				textAttr.italic="italic";
				}else{
					textAttr.italic="normal";
					}
			$(".edit-area li.on").find(".comp-text").css({fontStyle:textAttr.italic});
			console.log("italic:"+textAttr.italic);
			})
		},
	underline:function(ele){
		ele.click(function(e){
			if(textAttr.underline!=="underline"){
				textAttr.underline="underline";
				}else{
					textAttr.underline="none";
					}
			$(".edit-area li.on").find(".comp-text").css({textDecoration:textAttr.underline});
			console.log("underline:"+textAttr.underline);
			})
		},
	justify:function(ele){
		ele.click(function(e){
			$(this).addClass("on").siblings().removeClass("on");
			var txt=$(this).text();
			if(txt=="居左"){
				textAttr.justify="left";
				}else if(txt=="居中"){
					textAttr.justify="center";
					}else{
						textAttr.justify="right";
						}
			$(".edit-area li.on").find(".comp-text").css({textAlign:textAttr.justify});
			})
		},
	}