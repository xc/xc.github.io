<?php



$host = "http://ezp5";

$clientID = "602bea9ca00bb571b92ea8be724b8fb1";

$clientSecret = "aff384eafc037f138958ce59ca7c2b62";

$oauthUrl = "$host/oauth/authorize";

$oauthToken = "$host/oauth/token";

$redirectURI = "http://localhost/rest.php";

// get Token
$oauth = new OAuth( $clientID, $clientSecret );

$requestToken = $oauth->getRequestToken( $oauthToken );

// authentication passed

    $parameter = array( 'client_id' => $clientID,
                   'response_type' => 'token',
                   'redirect_uri' => $redirectURI );

    $parameterString = '';
    foreach( $parameter as $key=>$value )
    {
        $parameterString .= "$key=$value&";
    }

    $uri = $oauthUrl . '?' . $parameterString;
    header( 'Location:' . $uri );

?>
