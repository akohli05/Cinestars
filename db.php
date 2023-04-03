 <?php
$db = new mysqli('sql202.epizy.com', 'epiz_32942772', 'bVuQVXl9MC1Wx', 'epiz_32942772_actor_notes');
// FORMAT $mysqli = new mysqli("localhost","my_user","my_password","my_db");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

//select a database to work with
$db->select_db("epiz_32942772_actor_notes");
 
?>