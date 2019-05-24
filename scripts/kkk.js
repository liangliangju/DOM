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

	if (!document.getElementsByTaName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTaName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTaName('nav');
	if (navs.length == 0) return false;
	/*取得导航的链接，并遍历*/
	var links=navs[0].getElementsByTaName('a');
	
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

	if (!document.getElementsByTaName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");/*创建一个div元素*/
	slideshow.setAttribute("id","slideshow"); /*设置新div的id属性*/
	var preview = document.createElement("img");/*创建一个img图片元素*/
	preview.setAttribute("src","../images/slideshow.png");
	preview.setAttribute("alt","a glimpse of what await you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);/*把图片即preview元素添加为新建div的子元素*/
	insertAfter(slideshow,intro);/*调用insertAfter函数*/

	/*遍历链接，根据鼠标所在的链接来移动preview元素*/
	var links = intro.getElementsByTaName("a");
	var destination;
	for (var i=0; i<links.length; i++){
		/*定义一个当鼠标位于链接上时，触发的函数（事件）*/
		 links[i].onmouseover = function{
		 	/*destination为当前链接的href*/
		 	destination = this.getAttribute("href");
		 	if (destination.indexOf("index.html") != -1){
		 		moveElement("preview",0,0,5);
		 	}
		 	if (destination.indexOf("about.html") != -1){
		 		moveElement("preview",-250,0,5);
		 	}
		 	if (destination.indexOf("photos.html") != -1){
		 		moveElement("preview",-500,0,5);
		 	}
		 	if (destination.indexOf("live.html") != -1) {
		 		moveElement("preview",-750,0,5);
		 	}
		 	if (destination.indexOf("contact.html") != -1) {
		 		moveElement("preview",-1000,0,5);
		 	}

		 }
	}
}

addLoadEvent(prepareSlideshow);
