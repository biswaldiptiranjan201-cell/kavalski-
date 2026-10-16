<?php
// Contact form handler: upload to the same folder as the HTML files on a PHP-enabled server.
if($_SERVER['REQUEST_METHOD']!=='POST'||!empty($_POST['website'])){http_response_code(400);exit;}
$c=fn($k)=>trim(str_replace(["\r","\n"],' ',strip_tags($_POST[$k]??'')));
$email=filter_var($c('email'),FILTER_VALIDATE_EMAIL);
if(!$email||!$c('name')){http_response_code(422);exit;}
$body="Name: ".$c('name')."\nCompany: ".$c('company')."\nPhone: ".$c('phone')."\nTopic: ".$c('topic')."\nEmail: $email\n\n".strip_tags($_POST['message']??'');
$ok=mail('admin@kavalskicompanyusa.group','Website inquiry: '.$c('topic'),$body,"From: admin@kavalskicompanyusa.group\r\nReply-To: $email");
http_response_code($ok?200:500);
