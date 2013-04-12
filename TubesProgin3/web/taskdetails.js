function fileallowed(){
//	alert("masuk");
	var file = document.getElementById('avatar');
   var ext = file.value.match(/\.([^\.]+)$/)[1];
	
    switch(ext)
    {
        case 'jpg':
        case 'jpeg':
		case 'png':
		case 'ogg':
            break;
        default:
		 file.value='';
            alert('Tipe file tidak diizinkan.\nSilahkan ulangi masukan');
           
    }
    
}

function ambildata(ID,cnt){

var xmlhttp;
if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
else    
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState == 4){
           var ss = document.getElementById('Komentar');
            var str =xmlhttp.responseText;
            ss.innerHTML += str;
        }
    }
          
xmlhttp.open("GET", 'Task?ID=' + ID+ '&continue=' + cnt, true);
xmlhttp.send();
}

function removeComment(idcomment,jumcom){

	var xmlhttp;
        var jum;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
	xmlhttp.onreadystatechange=function()
	  {
	  if(xmlhttp.readyState == 4){
	  if(xmlhttp.responseText=="berhasil")
              {
                  jum=document.getElementById("jumkom").innerHTML;
                  jum--;
                  document.getElementById("jumkom").innerHTML=jum;
                  document.getElementById(idcomment).innerHTML="";
                  
                  document.getElementById("a").innerHTML="Komentar("+jum+")";     
              }
          
            }
	  }

var queryString = "idcomment="+idcomment;
xmlhttp.open("POST", 'removeComment', true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(queryString);
}

function addcomment(username){
var xmlhttp;
var komen=document.getElementById("commentfield").value;
document.getElementById("commentfield").value="";
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
	xmlhttp.onreadystatechange=function()
	  {
	  if(xmlhttp.readyState == 4){
              data=xmlhttp.responseText;
              maxid(data);
              
            }
	  }
	  
var queryString = "comment="+komen+"&usernamecur="+username;
xmlhttp.open("POST", 'addComment', true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(queryString);

}
function maxid(total){
var xmlhttp;
var max;
var jum=document.getElementById("jumkom").innerHTML;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
	xmlhttp.onreadystatechange=function()
	  {
	  if(xmlhttp.readyState == 4){
                max=xmlhttp.responseText;
              jum++;
              document.getElementById("jumkom").innerHTML=jum;
              document.getElementById("a").innerHTML="Komentar("+jum+")";
              total=total.split(",");
              waktuid=max.split(",");
                 var com=document.getElementById("comment").innerHTML;
		document.getElementById("comment").innerHTML="<div id=\""
                    +waktuid[0]+"\"><div class=\"headerComment\"><div class=avatar style=\"float:left;\"><img src="
                    +total[2]+" height=\"42\" width=\"42\"></div><div class=username style=\"float:left;\"><b>"
                    +total[1]+"</b></div><div class=waktu><b>"+waktuid[1]+"</b></div><div><a class=\"remove\" href=\"\" onClick=\"removeComment("
                        +waktuid[0]+","+jum+");return false;\" >remove</a></div></div><li>"
                    +total[0]+"</li></div>"+com;
            }
	  }
	  
xmlhttp.open("POST", 'maxid', true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send();  

}
function time(){}
function editTask(jumlahAssignee)
{
	document.getElementById("edit").innerHTML="<b>Save</b>";
	document.getElementById("edit").setAttribute('onclick','save('+jumlahAssignee+')');
	document.getElementById("tanggal").setAttribute('onclick', '');
	var i=0;
        
	for(i;i<jumlahAssignee;i++) {
            if(document.getElementById("r"+i)!=null)
                {
                    document.getElementById("r"+i).setAttribute("style","visibility:visible; position:relative; left:3px;");
                }
	}
        document.getElementById("inputtag").setAttribute("style","visibility:visible;position:absolute; top:15px; left:154px;");	
	document.getElementById("assignee").innerHTML+="<br><input id=\"asignee\" type=\"text\" placeholder=\"assignee\" onkeyup='searchSuggest(this.id)'></input>";
}
function save(jumlahA){
    
	document.getElementById("edit").innerHTML="<b>Edit</b>";	
	document.getElementById("tanggal").setAttribute('onclick', 'return false');
        document.getElementById("edit").setAttribute('onclick','editTask('+jumlahA+')');
	document.getElementById("inputtag").setAttribute("style","visibility:hidden;position:absolute; top:15px; left:154px;");
        document.getElementById("asignee").setAttribute("style","visibility:hidden;");
	var assignee=document.getElementById("asignee").value;
        if(assignee!="")
            {
                
                var jumlah=document.getElementById("jumlahA").innerHTML;
                jumlah++;
                document.getElementById("jumlahA").innerHTML=jumlah;
                document.getElementById("edit").setAttribute('onclick','editTask('+jumlah+')');
            }
	var i=0;
	document.getElementById("asignee").value="";
        document.getElementById("assignee").innerHTML="";
	//document.getElementById("anggota").innerHTML+="<div id=\""+assignee+"\"><a  href=\"profile.php?username="+assignee+"\">"+assignee+"</a><a id=\"r"+(jumlahA++)+"\" href=\"#\" style=\"visibility:hidden\" onclick=\"removeA('"+assignee+"')\">(remove)</a><br></div>";
	for(i;i<jumlahA;i++) {
            if(document.getElementById("r"+i)!=null)
                {
                    document.getElementById("r"+i).setAttribute("style","visibility:hidden; position:relative; left:3px;");
                }
            
	}
	var tag=document.getElementById("inputtag").value;
	var deadline=document.getElementById("deadline").value;
        var n=deadline.split("-"); 
        deadline=n[2]+"-"+n[1]+"-"+n[0];
	document.getElementById("inputtag").value="";
	if(tag=="" && deadline=="" && assignee=="")
	{}
	else
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  
		  if(xmlhttp.readyState == 4){
                      if(deadline!="" && tag!="" && assignee!="")
                          {
                              var total=xmlhttp.responseText.split(",");
                              var cal=total[0].split("-");
                              cal=cal[2]+"-"+cal[1]+"-"+cal[0];
                              
                              document.getElementById("deadline").setAttribute('value', cal);
                              document.getElementById("data").innerHTML = total[1];
                              document.getElementById("anggota").innerHTML+="<div id=\""+total[2] +"\"><a  href=\"profile.jsp?username="+total[2]+"\">"+total[2]+"</a><a id=\"r"+jumlahA+"\" href=\"#\" style=\"visibility:hidden\" onclick=\"removeA('"+total[2]+"')\">(remove)</a><br></div>";                              
                          }
			  else if(deadline!="" && tag!="")
			  {
                              var total=xmlhttp.responseText.split(",");
                              var cal=total[0].split("-");
                              cal=cal[2]+"-"+cal[1]+"-"+cal[0];
                              document.getElementById("deadline").setAttribute('value', cal);
                              document.getElementById("data").innerHTML = total[1];
                          }
			  else if(deadline!="" && assignee!="")
			  {
                              var total=xmlhttp.responseText.split(",");
                              var cal=total[0].split("-");
                              cal=cal[2]+"-"+cal[1]+"-"+cal[0];
                              document.getElementById("deadline").setAttribute('value', cal);
                              document.getElementById("anggota").innerHTML+="<div id=\""+total[1] +"\"><a  href=\"profile.jsp?username="+total[1]+"\">"+total[1]+"</a><a id=\"r"+jumlahA+"\" href=\"#\" style=\"visibility:hidden\" onclick=\"removeA('"+total[1]+"')\">(remove)</a><br></div>";			  
                          }
                          else if(deadline!="")
                              {
                                  var total=xmlhttp.responseText;
                                  var cal=total.split("-");
                                  cal=cal[2]+"-"+cal[1]+"-"+cal[0];
                                  document.getElementById("deadline").setAttribute('value', cal);
                                  
                              }
                          
                              //window.location.reload();
			}

		  }
		var queryString = "tag="+tag+"&deadline="+deadline+"&assignee="+assignee;
		xmlhttp.open("POST", 'edittask', true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(queryString);
	}
}
function removeA(username)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  
  if(xmlhttp.readyState == 4){
      if(xmlhttp.responseText=="sukses")
          {
              document.getElementById(username).innerHTML="";
              //parseInt(document.getElementById("jumkom").innerHTML, radix);
          }
	
	}

  }
var queryString = "username="+username;
xmlhttp.open("POST", 'removeAssignee', true)
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
xmlhttp.send(queryString);
}

