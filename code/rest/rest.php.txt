<?php

if( $_GET['access_token'] )
{
    $_SESSION['token'] = $_GET['access_token'];
}

if( !$_SESSION['token'] )
{
    exit;
}

$token = $_SESSION['token'];

$url = 'http://ezp5/api/ezp/v1/content/object/72';

$opts = array(
    'http'=>array(
        'method'=>"GET",
        'header'=>"Authorization: OAuth $token"
    )
);

$context = stream_context_create($opts);
$content = file_get_contents( $url, false, $context );

echo $content;

?>