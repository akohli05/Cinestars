
<script src="https://code.jquery.com/jquery-3.6.1.js"></script>

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
var NoteEdit = url.searchParams.get("NoteEdit");
  
</script>


<?php 
	include 'db.php'; 
	
	//getting the ID from the Javascript function
	$ID = $_GET['ID'];
	
	$notesContent = $_GET['NoteEdit'];
	
	echo $ID . " content = " . $notesContent;
	
	$edit = "UPDATE custom_notes SET note_content = '$notesContent' WHERE note_id = '$ID'";
	
	//If the form is updated correctly
	if ($db->query($edit) === TRUE) {
	   //redirect to home page				
		header("Location: index.html"); /* Redirect */
		exit();
	}

	//if the form is not updated
	else {
		echo "Error! Please try again! Redirecting to home page.". $db->error;
		echo $edit;
		//sleep for 3 seconds
		sleep(3);
	
		//redirect to home page
		header("Location: index.html"); /* Redirect */
		exit();
	}
			
		
	$db->close();
?>


