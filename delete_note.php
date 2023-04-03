<?php include 'db.php';  ?>

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
                </script>

                <?php 
              
                    //getting the ID from the Javascript function
                    $ID = $_GET['ID'];

                    //getting the username from the current active session
                    $query = "DELETE FROM custom_notes WHERE note_id = '$ID' ";
                    
                    if ($result = $db->query($query)) {
                        //redirect to home page
						header("Location: index.html"); /* Redirect */
						exit();
                    }
                    else
                    {
                        echo "Error! Please try again! Redirecting to home page.";
						//sleep for 3 seconds
						sleep(3);
					
						//redirect to home page
						header("Location: index.html"); /* Redirect */
						exit();
                    }

                    $db->close();
                    ?>