```yaml
id: keyword-checker

info:
  name: VPN Keyword Checker
  author: Your Name
  severity: info
  description: Checks for the presence of VPN-related keywords and URLs in the response body.
  tags: tech,cisco,vpn,forticlient,forti

requests:
  - method: GET
    path:
      - "{{BaseURL}}/"
      - "{{BaseURL}}/vpn"
      - "{{BaseURL}}/remote"
      - "{{BaseURL}}/owa"

    redirects: true
    max-redirects: 4
    matchers:
      - type: word
        words:
          - "Cisco"
          - "forticlient"
          - "Citrix"
          - "VPN"
          - "Forti"
          - "Outlook"
          - "CSCOE"
          - "GlobalProtect"
          - "+webvpn+"
          - "AzureAttend"

        condition: or
        part: response

    extractors:
      - type: regex
        part: response
        regex:
          - '(?i)Cisco'
          - '(?i)forticlient'
          - '(?i)Citrix'
          - '(?i)VPN'
          - '(?i)Forti'
          - '(?i)Outlook'
          - '(?i)CSCOE'
          - '(?i)GlobalProtect'
          - '(?i)webvpn'
          - '(?i)AzureAttend'

  - method: GET
    path:
      - "{{BaseURL}}/"
    matchers:
      - type: word
        words:
          - "top.location=window.location;top.location="
          - "window.location.href="
          - "document.location="
          
        condition: or
        part: response

    extractors:
      - type: regex
        part: response
        regex:
          - '(?i)top.location=window.location;top.location='
          - '(?i)window.location.href='
          - '(?i)document.location='
```