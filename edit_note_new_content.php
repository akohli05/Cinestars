<script>
	//Will get the parameter value passed in through the url
	function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	var ID = getParameterByName('ID');
	
var url_string = window.location.href; 
var url = new URL(url_string);
var Note = url.searchParams.get("Note");

  var NoteEdit = window.prompt("Enter in the note content. Please remember that the field cannot be empty.", Note);
   if (NoteEdit!=null && NoteEdit!="")
    {
          location.replace("form_edit.php?ID="+ID+"&Note="+Note+"&NoteEdit="+NoteEdit);

	}
	else{
		alert("Update Cancelled! Redirecting to Home.");
		location.replace("index.html");
	}
  
</script>


<?php
 
?>