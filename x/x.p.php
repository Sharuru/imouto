<?php
if (!isset($_GET['id']) || !preg_match('/^[0-9]{0,10}$/', $_GET['id']))
    err('恶意请求');


$r = $sql->getLine('SELECT * FROM blog_article WHERE pid=' . $_GET['id']);

$sql->runSql('UPDATE blog_article SET look=look+1 WHERE pid=' . $_GET['id']);

unset($r['modified']);
