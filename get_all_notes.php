<?php  
	
	include 'db.php';            
	
	$actorID = $_POST['actorID'];
	$query = "SELECT * FROM custom_notes WHERE actor_id = '$actorID'";

	$result = $db->query($query);

	//A var that will count and display the submission number
	$counter = 1;

	if(mysqli_num_rows($result)==0){
		echo "<p>" . "No custom notes" . "</p>";
	}

	else {
		while ($result_ar = $result->fetch_assoc()) {

		//store the values in variables
		$note_content = $result_ar['note_content'];
		$ID = $result_ar['note_id'];

		//Display a divider with the submission number
		echo "<p id='editableNote'>" .$counter. ". " .$note_content ."</p>";

		//Display edit and delete links
		echo "<p class = 'del_link'>" . "<a style='font-size:28px;color:white' href='delete_note.php?ID=$ID' onClick=\"javascript: return confirm('Please confirm deletion!');\"><img src='deleteIcon.png' alt='delete' id = 'deleteIconImg'></a>" . "</p>";
		echo "<p class = 'edit_link'>" . "<a style='font-size:28px;color:white' href='edit_note_new_content.php?ID=$ID&Note=$note_content'><img src='editIcon.png' alt='edit' id = 'editIconImg'></a>" . "</p>";

		//Increment the counter every time this loop runs
		$counter++;
		}

	}

	$db->close();
?>
