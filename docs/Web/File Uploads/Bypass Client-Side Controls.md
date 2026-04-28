---
tags:
  - Web
  - Client-Side
  - File_Uploads
---
## How to Identify Client-Side Controls
Before you can bypass a filter, you need to confirm it's happening on the client side. The easiest way to tell is by observing network traffic:

1. Open your browser's **Developer Tools (F12)** and navigate to the **Network** tab.
2. Attempt to trigger the restriction (e.g., upload a `shell.php` file when only images are allowed).
3. If you are instantly met with an error message or popup, **look at the Network tab**.
4. If **no HTTP POST request** was sent to the server, the validation happened entirely in your browser. You are looking at a client-side filter.
### Two Ways to Bypass Client-Side Controls

Once you have identified the control, there are several ways to circumvent it, ranging from simple browser tweaks to professional interception. We will introduce two of them.
#### Disabling JavaScript

If the restriction is enforced purely by a JavaScript function (e.g., an `onsubmit` event listener), you can simply turn the engine off.

- **How:** Open DevTools (F12), open the command palette (Ctrl+Shift+P / Cmd+Shift+P), type "Disable JavaScript", and hit enter.
	- *Or* you can install the `NoScript` FireFox plugin to disable all scripts
- **Result:** The browser will no longer execute the validation script. When you click submit, the form (and your payload) will be sent directly to the server.
#### 2. Using an Intercepting Proxy

Sometimes, modern web apps (like Single Page Applications built on React or Angular) break completely if you disable JavaScript or manually alter the DOM. In these cases, you play by the browser's rules, but intercept the traffic _after_ it leaves the browser but _before_ it hits the server.

1. Upload a valid file, but intercept the request.
2. Replace the file with your malicious code.
3. Forward the request.