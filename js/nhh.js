// JavaScript Document

//事件对象兼容处理
var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
			}
		},
	getEvent:function(event){
		return event ? event : window.event;
		},
	getTarget:function(event){
		return event.target || event.srcElement;
		},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false; 
		     }
		},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
			}
		},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
			}
		},
	getRelatedTarget:function(event){//取得相关元素
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
			}
		},
	getButton:function(event){//取得鼠标按钮
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
				return 0;
				case 2:
				case 6:
				return 2;
				case 4:
				return 1;
				}
			}
		},
	getWheelDelta:function(event){//取得鼠标滚轮增量值'120'
		if(event.wheelDelta){//mousewheel事件
			return event.wheelDelta;
		}else{//DOMMouseScroll事件(火狐)
			return -event.detail*40;	
			 }
			
		},
	getCharCode:function(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
			}
		}
	}

//页面加载完毕执行函数
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
		}else{
			window.onload=function(){
				oldonload();
				func();
				}
			}
	}

//把一个节点插入到另一个节点后面
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild=targetElement){
		parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibling);
			}
	}
	
//比较函数:比较两个数值大小,结合sort()方法给数组排序,arr.sort(compare);
function compare(value1,value2){
	return value1-value2;		
	}
	
//比较数组中两个对象的属性值，给数组排序。
//var data=[{name:"Zachary",age:10},{name:"Nicholas",age:18}]
//data.sort(createComparisonFunction("name"));按照name属性给数组排序
function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1=object1[propertyName];
		var value2=object2[propertyName];
		if(value1<value2){
			return -1;
			}else if(value1>value2){
				return 1;
				}else{
					return 0;
					}
		};
	}

//用递归求阶乘函数，不用return num*factorial(num-1)是为了消除紧密耦合
// var f=factorial;
// factorial=function(){return 0;}
// console.log(f(5));结果120
// console.log(factorial(5));结果0
//这样可以给函数换指针
function factorial(num){
	if(num<=1){
		return 1;
		}else{
			return num*arguments.callee(num-1);
			}
	}

//闭包
function createFunctions(){
	var result=new Array();
	for(var i=0;i<10;i++){
		result[i]=function(num){
			return function(){
				return num;
				};
			}(i)
		}
	return result;
	}

//将NodeList对象转为数组
function convertToArray(nodes){
	var array=null;
	try{
		array=Array.prototype.slice.call(nodes,0);//针对非IE
		}catch(ex){
			array=new Array();
			for(var i=0,len=nodes.length;i<len;i++){
				array.push(nodes[i]);
				}
			}
	return array;
	}
function fn(n){//输入一串数字，转化为大写，如输入123，输出一百二十三
        if(!/^([1-9]\d*)/.test(n)){
            return '非法数据';
        }
        var unit = '千百十亿千百十万千百十个';
        if(n.length > unit.length){
            return '数据过长';
        }
        var newStr = '';
        var nlength = n.length;
        unit = unit.substr(unit.length - nlength);
        for(var i = 0; i < nlength; i++){
            newStr += '零一二三四五六七八九'.charAt(n[i]) + unit.charAt(i);
        }
        newStr = newStr.substr(0,newStr.length-1);
        newStr = newStr.replace(/零(千|百|十)/g,'零').replace(/(零)+/g,'零').replace(/零(亿|万)/g,'$1');
        return newStr;
    }

function message() //js错误
{ 
    try { 
        adddlert("Welcome guest!"); 
    } catch(err) { 
        txt="本页有一个错误。\n\n"; 
        txt+="错误描述：" + err.message + "\n\n"; 
        txt+="点击确定继续。\n\n"; 
        alert(txt); 
    } 
}

function validateForm(){
  var x=document.forms["myForm"]["email"].value;
  var atpos=x.indexOf("@");
  var dotpos=x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
    alert("不是一个有效的 e-mail 地址");
    return false;
  }
}




/*jquery为基础*/	
//点击切换图片效果，ele是id，针对单个
function clickSlideSingle(ele,lArrow,rArrow,l){//参数依次为，ul对象、左箭头、右箭头、一次切换li个数
    var $sw=ele.parent().width();//外层slideWrap
	var $w=parseInt(ele.children("li").find("img").width());
	var $gap=parseInt(ele.children("li").css("padding-left"))*2;
	var x=$w+$gap;//li宽度
	//一屏个数
	var $s=$sw/x;
	var len=ele.children("li").length;
	ele.width(x*len);
	var index=0;
	lArrow.on('click',function(e){
		index=index+l;
		ele.css("left",(x*index)+"px");
		if(index>=0){
			index=0;
			ele.css("left","0px");
			}
		//console.log(index);
		})
	rArrow.on('click',function(e){
		index=index-l;
		ele.css("left",(x*index)+"px");
		if(index<=-(len-$s)){
			index=-(len-$s);
			ele.css("left",-x*(len-$s)+"px");
			}
		//console.log(index);
		})
	//console.log(ele.css("left"));
	}
	
//点击切换图片效果，ele是class，针对多个
function clickSlideMul(ele,lArrow,rArrow,l){//参数依次为，ul对象、左箭头、右箭头、一次切换li个数
    var $sw=ele.parent().width();//外层slideWrap
	var $w=parseInt(ele.children("li").find("img").width());
	var $gap=parseInt(ele.children("li").css("padding-left"))*2;
	var x=$w+$gap;//li宽度
	//一屏个数
	var $s=$sw/x;
	var len=ele.children("li").length;
	ele.width(x*len);
	var index=0;
	lArrow.on('click',function(e){
		index=index+l;
		ele.css("left",(x*index)+"px");
		if(index>=0){
			index=0;
			ele.css("left","0px");
			}
		//console.log(index);
		})
	rArrow.on('click',function(e){
		index=index-l;
		ele.css("left",(x*index)+"px");
		if(index<=-(len-$s)){
			index=-(len-$s);
			ele.css("left",-x*(len-$s)+"px");
			}
		//console.log(index);
		})
	//console.log(x);
	}

//tab切换
function tab(event,ele,container,liName,divName){//事件、ul对象、内容框class名称、li上加的class名称、内容框子元素显示隐藏的class名称
    var evt=event;
	ele.children("li").on(evt,function(e){
		$(this).addClass(liName).siblings().removeClass(liName);
		var i=$(this).index();
		ele.parent().children("."+container).children().eq(i).addClass(divName).siblings().removeClass(divName);
		//console.log(1);
		})
	}