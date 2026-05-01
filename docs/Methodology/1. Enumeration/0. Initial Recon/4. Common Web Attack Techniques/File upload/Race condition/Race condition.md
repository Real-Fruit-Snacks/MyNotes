In this lab the php script saves stores the file  before it checks extension and then deletes it. If we send a request just milliseconds before it gets check and delted, we can retrieve and execute the file in its php extension. This technique is exploiting a race condition weakness in the code. 

We will be using turbo intruder to achieve this. Few tools can be fast enough. 
![unnamed_a55ebf8050494d8fbcc9227f54762355](unnamed_a55ebf8050494d8fbcc9227f54762355.png)
Here we are reading the /home/carlos/secret through php file_get_contents 
