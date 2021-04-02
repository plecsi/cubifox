<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,content-type");

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$psw = $data->password;
 
$key = "example_key";
$iss = "http://example.org";
$aud = "http://example.com";
$iat = 1356999524;
$nbf = 1357000000;
// include_once '../libs/php-jwt-master/src/BeforeValidException.php';
// include_once '../libs/php-jwt-master/src/ExpiredException.php';
// include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
// include_once '../libs/php-jwt-master/src/JWT.php';
// use \Firebase\JWT\JWT;

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");
 
if($email == 'admin' && $psw == 'admin'){
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           //"id" => $user->id,
           "id" => 1,
           "user_id" => 1,
           "firstname" => "admin",
           "lastname" => "admin",
           "nickname" => "admin_nick",
           "email" => $data->email
       )
    );
    http_response_code(200);
    //$jwt = JWT::encode($token, $key);
    $jwt = bin2hex(random_bytes(16));
	
    echo json_encode(
            array(
                "user" => array(
                    "id" => 1,
                    "username"=> "admin"
                ),
                "message" => array(
                    "Successful login.",
                    "msg_type" => "alert-success"
                ),
                "token" => $jwt
            )
        );
 
}
else{
    http_response_code(203);
    echo json_encode(array(
        "message" => "Login failed.",
        "msg_type" => "alert-danger"
    ));
}
