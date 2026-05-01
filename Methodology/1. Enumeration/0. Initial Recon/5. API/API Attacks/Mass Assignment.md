When we login we can see admin=false value. We now have an idea of which paramaters the API allows. We can attempt a mass assignment attack with the admin=true in potentially either a login request or a user creation request.  
![unnamed_751f5288f2e1443fa05e3d2e344b749d](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Mass%20Assignment/{{notename}}-202605011506.png)

Let's add the admin value
![unnamed_3abdfd81438b4ba5ac847159228bba79](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Mass%20Assignment/{{notename}}-202605011506-1.png)

As as we intercept the response to our request, our new user is now set up as a admin!
![unnamed_9f826bc21bfc43cd93549a5acd7e7af3](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Mass%20Assignment/{{notename}}-202605011506-2.png)