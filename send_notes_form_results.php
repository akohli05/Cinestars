<?php 
			include 'db.php';
				
			$db = mysqli_connect('sql202.epizy.com', 'epiz_32942772', 'bVuQVXl9MC1Wx', 'epiz_32942772_actor_notes');
		
			// getting the values from the form
			if (isset($_POST['submit_note'])) {
				$actorID = mysqli_real_escape_string($db, $_POST['actorID']);
				$noteContent = mysqli_real_escape_string($db, $_POST['notesContent']);
			  
				//Build a SQL Query using the values from above
			   
				$query = "INSERT INTO custom_notes (note_content, actor_id)
				VALUES ( '$noteContent', '$actorID' )";
				 
				
				if ($db->query($query) === TRUE) {
					//redirect to home page
					header("Location: index.html"); /* Redirect */
					exit();
				}
				else{
					echo "Error! Please try again! Redirecting to home page.";
					//sleep for 3 seconds
					sleep(3);
					
					//redirect to home page
					header("Location: index.html"); /* Redirect */
					exit();
				}

			}
			
			$db->close();
		
				

?>