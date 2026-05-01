<https://www.youtube.com/watch?v=FzQcu9LYd_k>

One technique you can do (depending on how webapp is setup) is to alternate between valid credentials and incorrect credentials in a bruteforce attack, sometimes allowing you to bruteforce fast without getting rate limited. Sometimes the webapp allows f.ex 3-5 incorrect passwords then you'll have to wait X amount of time. By going back and forth between valid and invalid credentials, it's sometimes possible to get around this. 

Script that makes your wordlist match this pattern:
<https://github.com/skickar/BashScripting/blob/master/burplist.sh>
