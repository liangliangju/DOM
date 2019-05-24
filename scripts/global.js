
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload!='function') {
		window.onload = func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}

}


/*insertAfter函数，在一个现有元素后插入一个新元素*/
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}

}

/*为元素添加class属性名*/
function addClass(element,value){
	if (!element.className) {
		element.className = value;
	}
	else{
		newClassName = element.className;
		newClassName+= " ";
		newClassName+=value;
		element.className = newClassName;
	}
}

/*定义一个函数，完成当前页面的突出显示*/
function highlightPage(){


	if (!document.getElementsByTagName) return false;
	
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	

	/*取得导航的链接，并遍历*/
	var links=navs[0].getElementsByTagName('a');
	
	for (var i = 0;i<links.length;i++) {
		var linkurl;
		for (var i=0;i<links.length;i++){
		linkurl = links[i].getAttribute("href"); /*.getAttribute()获取属性值*/
        /*window.location.href 获取当前当前页面的URL*/
        /*string.indexOf(substring)方法返回子字符串第一次出现的位置，若不包含该字符串返回-1*/
        
        if (window.location.href.indexOf(linkurl)!=-1){
        	links[i].className = "here";
        	/*将当前页面的a的class设置为here，设其应用here类的样式*/

        	/*为不同的页面设置body的id属性，以便在每个页面应用不同的样式*/
        	var linktext = links[i].lastChild.nodeValue.toLowerCase();
        	/*获取链接的文本节点的值，并全部转为小写toLowerCase()*/
        	document.body.setAttribute("id",linktext);
        	/*设置页面body的id属性值为相应的页面链接的文本*/
        }
        }
		
	}

}
addLoadEvent(highlightPage);/*在页面加载时调用该函数*/


/*实现幻灯片功能,使图片可以对应切换*/
/*动画函数*/
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	/*parseInt(x)将x转为整数类型*/
	var xpos = parseInt(elem.style.left); 
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y){
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x  -xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y  -ypos)/10);
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);

}

/*创建幻灯片元素,放在文档中的intro的后面*/
function prepareSlideshow(){

	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");/*创建一个div元素*/
	slideshow.setAttribute("id","slideshow"); /*设置新div的id属性*/
	var preview = document.createElement("img");/*创建一个img图片元素*/
	preview.setAttribute("src","images/slideshow.png");
	preview.setAttribute("alt","a glimpse of what await you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);/*把图片即preview元素添加为新建div的子元素*/
	insertAfter(slideshow,intro);/*调用insertAfter函数*/

	/*将动画放在一个小窗口中*/
	var frame = document.createElement("img");


	/*遍历链接，根据鼠标所在的链接来移动preview元素*/
	var links = document.getElementsByTagName("a");
	
	for (var i=0; i<links.length; i++){
		/*定义一个当鼠标位于链接上时，触发的函数（事件）*/
		 links[i].onmouseover = function(){
		 	/*destination为当前链接的href*/
		 	var destination = this.getAttribute("href");
		 	if (destination.indexOf("index.html") != -1){
		 		moveElement("preview",0,0,5);
		 	}
		 	if (destination.indexOf("about.html") != -1){
		 		moveElement("preview",-270,0,5);
		 	}
		 	if (destination.indexOf("photos.html") != -1){
		 		moveElement("preview",-530,0,5);
		 	}
		 	if (destination.indexOf("live.html") != -1) {
		 		moveElement("preview",-790,0,5);
		 	}
		 	if (destination.indexOf("contact.html") != -1) {
		 		moveElement("preview",-1040,0,5);
		 	}

		 }
	}
}
addLoadEvent(prepareSlideshow);

/*对about.html的页面导航进行部分显示*/

/*根据指定的id来显示相应的section,同时隐藏其他部分*/
function showSection(id){
	var sections = document.getElementsByTagName("section");
	for (var i=0; i<sections.length; i++){
		if (sections[i].getAttribute("id")!=id) {
			sections[i].style.display = "none";
			/*display:none--不为被隐藏的对象保留其物理空间，即该对象在页面上彻底消失*/
			/*isible:hidden--使对象在网页上不可见，但该对象在网页上所占的空间没有改变*/
		}
		else{
			sections[i].style.display = "block";
		}
	} 
}

/*设计触发showSection()函数,点击相应的链接*/
function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	/*遍历导航链接,此时的links有#前缀，需要抽取#links后面的字符*/
	for (var i=0; i<links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		/*array=string.split(character),根据字符character为分隔符分割string字符串，返回划分后的数组*/
        if(!document.getElementById(sectionId)) continue;
        /*continue进行下一次循环*/
        document.getElementById(sectionId).style.display = "none";
        /*页面加载后默认全部隐藏*/
        links[i].destination = sectionId;
        /*此时局部变量sectionId的作用域只在prepareInternalnav()内有效，当执行事件函数时不存在*/
        /*为链接自定义一个新属性destination=sectionId,其作用域是持久的*/
       links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}
addLoadEvent(prepareInternalnav);

/*显示whichpic大图的函数*/
function showPic(whichpic){

	if (!document.getElementById) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");

	placeholder.setAttribute("src",source);
	if (!document.getElementById("decription")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");

	} else {
		var text = " ";
	}

	var decription = document.getElementById("decription");
	/*nodeType表示文本节点,nodeValue = text设置节点的值*/
	if (decription.firstChild.nodeType == 3) {
		decription.firstChild.nodeValue = text;
		
	}
	return false;

}

/*创建图片占位符*/
function preparePlaceholder(){
	if (!document.getElementById) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	/* createTextNode,创建文本节点*/
	if (!document.getElementById("imagessmall")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/photos/placeholder.png");
	var decription = document.createElement("p");
	decription.setAttribute("id","decription");
	var desctext = document.createTextNode("选择一张照片");
	decription.appendChild(desctext);
	/*y.appendChild(x),将x添加为y的子节点*/
	var gallery = document.getElementById("imagessmall");
	insertAfter(decription,gallery);
	insertAfter(placeholder,decription);
	/*把文字说明放在列表之后，把占位符放在文字说明之后*/
}

function prepareGalley(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if (!document.getElementById("imagessmall")) return false;
	var gallery = document.getElementById("imagessmall");
	var links =  gallery.getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		links[i].onclick=function() {
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGalley);

/*修饰表格*/
function stripeTable(){
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i=0; i<tables.length; i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j=0; j<rows.length; j++){
			if(odd == true){
				addClass(rows[j],"odd");
				odd = false;
 			}
 			else{
 				odd = true;

 			}
		}
	}
}

function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0; i<rows.length; i++){
		rows[i].oldClassName = rows[i].className;
		/*先用rows.oldClassName保存原来的类名,用于鼠标移走后恢复状态*/

		rows[i].onmouseover = function(){
			/*鼠标置于其上时，通过添加类名应用加亮样式*/
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
			/*鼠标移走后恢复原来的状态*/
		}
	}
}
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);

