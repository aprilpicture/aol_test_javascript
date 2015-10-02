//
// build movie item UI
//
var buildResultItem = function(result){
		 var resultDiv = document.createElement("div");
		 resultDiv.setAttribute('id', result.id);
		// resultDiv.innerHTML = result.title;
		 document.getElementById("listDiv").appendChild(resultDiv);

		 var resultImg = document.createElement("img");
		 resultImg.setAttribute('src', result.image);
		// resultDiv.insertBefore(resultImg, resultDiv.childNodes[0]);
		 resultDiv.appendChild(resultImg);

		 var titleDiv = document.createElement("div");
		 titleDiv.innerHTML = result.title;
		 titleDiv.className = "title_ui title_content_ui";
		 resultDiv.appendChild(titleDiv);
			
	    (function(result){
	    	resultImg.onmousedown = function (e) {
	    		buildDetail(result);
	    		var al = document.getElementById("overlay");
	    		al.style.left = e.pageX+'px';
	    		al.style.top = e.pageY+'px';

	    	};
	      }(result));
};

//
// build detail overlay UI
//
var buildDetail = function(result) {
	var al = document.getElementById("overlay");
//	clearEle(al);
	document.getElementById("title").innerHTML = result.title;
	document.getElementById("title").className = "title_ui";
	
	var desc = document.getElementById("desc");
	desc.innerHTML = '<p>' + result.views  + ' views </p>' +
		'<p><b>Published on ' + result.pubDate + '</b></p>' +
		'<p title="' + result.description + '" class="shortP">' + result.description + '</p>';
	document.getElementById("videoFrame").setAttribute('src', result.player.url);
	displayDetail(true);
}

//
//build category UI nav
//
var buildCategoryNav= function (){
	if(category == null || category.length == 0){
		return;
	}
	
	clearEle(document.getElementById("categoryDiv"));

	for(var i in category){
		buildTopCat(i);

	}
};

//
// build top category UI 
// 
var  buildTopCat = function(i){	
	 
	 var catP = document.createElement("p");
	 document.getElementById("categoryDiv").appendChild(catP);

	 var catLabel = document.createElement("label");
	 catLabel.innerHTML = i;
	 catP.appendChild(catLabel);

	 var catB = document.createElement('input');
	 catB.type = 'checkbox';
	 catB.setAttribute('value', i);
	 catB.setAttribute('checked', true);

	 catLabel.insertBefore(catB, catLabel.childNodes[0]);
	// catLabel.appendChild(catB);
	
	
	 (function(i){
		 catB.onclick=function(){ 
			 // filter category 
			 var checked = catB.checked;
			 for(var j in category[i]){
				 var id = category[i][j];
				 var div = document.getElementById(id);
				 if(checked){
				 	div.style.display = "block";
				 }else{
				 	div.style.display = "none";
				 }
			 }
		 };

	 }(i));	
 
};

var buildCategoryList = function(result){
	 var found = false;
	 for (var k in category) {
	    if (k == result.category) {
	    	category[k].push(result.id);
	    	found = true;
	    	break;
	    }
	 }
	 if(!found){
		 category[result.category] = [result.id];
	 }  
	 
};

var displayDetail = function(flag){
	var ol = document.getElementById("overlay");
 	ol.style.visibility = (flag == true) ? "visible" : "hidden";
}
	 
var clearEle = function(ele){
	ele.innerHTML = "";
}