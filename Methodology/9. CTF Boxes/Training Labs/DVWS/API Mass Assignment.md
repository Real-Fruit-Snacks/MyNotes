When we login we can see admin=false value. We now have an idea of which paramaters the API allows. We can attempt a mass assignment attack with the admin=true in potentially either a login request or a user creation request.  
![unnamed_509f57c1ee1e4212ab68d9962e4d1a4a](docs/Attachments/Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20Mass%20Assignment/{{notename}}-202605011506.png)

Let's add the admin value
![unnamed_32da445597294be992a60163b4add3f5](docs/Attachments/Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20Mass%20Assignment/{{notename}}-202605011506-1.png)

As as we intercept the response to our request, our new user is now set up as a admin!
![unnamed_669e76837db24780bfc184955cf5f537](docs/Attachments/Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20Mass%20Assignment/{{notename}}-202605011506-2.png)
