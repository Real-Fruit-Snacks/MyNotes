# Penetration Testing Notes

## Overview

This is a test note to showcase the features of our MkDocs setup with the Catppuccin Mocha theme.

---

## Checklist Example

- [x] Set up MkDocs
- [x] Configure Catppuccin Mocha theme
- [x] Deploy to GitHub Pages
- [ ] Add all pentest notes
- [ ] Configure custom domain

---

## Admonition Examples

!!! tip "Pro Tip"
    Always run `whoami /priv` after initial access to check for juicy privileges.

!!! warning "OPSEC Warning"
    Avoid running `mimikatz.exe` directly on disk — use reflective loading instead.

!!! danger "Danger Zone"
    Never run `potato` exploits on a production box without explicit written permission.

!!! info "Note"
    BloodHound CE now uses Docker by default. Make sure ports 7474 and 7687 are available.

---

## Code Block Examples

### Nmap Scan

```bash
nmap -sC -sV -oA initial 10.10.10.1
rustscan -a 10.10.10.1 -- -sC -sV
```

### Evil-WinRM

```bash
evil-winrm -i 10.10.10.1 -u administrator -p 'Password123!'
```

### PowerShell Enumeration

```powershell
whoami /priv
whoami /groups
net user administrator
Get-LocalGroupMember -Group "Administrators"
```

### Python Example

```python
import requests

target = "http://10.10.10.1"
payload = {"username": "admin", "password": "admin"}
r = requests.post(f"{target}/login", data=payload)
print(r.status_code)
```

### Rust Example

```rust
fn main() {
    let target = "10.10.10.1";
    println!("Connecting to {}", target);
}
```

---

## Table Example

| Tool        | Purpose                  | Language |
|-------------|--------------------------|----------|
| Maelstrom   | AD Enumeration           | Go       |
| Rapids      | Port Scan / Spray        | Go       |
| Kraken      | C2 Framework             | Rust     |
| Undertow    | Reverse SSH              | Go       |
| Riptide     | Collaborative Terminal   | Go       |
| Hackles     | BloodHound Helper        | Go       |

---

## Links Example

- [HackTricks](https://book.hacktricks.xyz)
- [GTFOBins](https://gtfobins.github.io)
- [LOLBAS](https://lolbas-project.github.io)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)

---

## Inline Code

Use `secretsdump.py` to dump hashes remotely:

```bash
impacket-secretsdump domain/user:password@10.10.10.1
```

Crack them with `hashcat`:

```bash
hashcat -m 1000 hashes.txt /usr/share/wordlists/rockyou.txt
```
