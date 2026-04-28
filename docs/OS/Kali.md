---
tags:
  - OS
  - Kali
  - Setup
---
## Setup Kali
### Update & Upgrade

```bash
# --- Initial Update & Upgrade --- #
# Might need to allow "Emergency Access"
sudo apt update -y && sudo apt upgrade -y
```
### First Install
> [PimpMyKali Github](https://github.com/Dewalt-arch/pimpmykali)  

```bash
# --- Pimp My Kali --- #
# change dir
cd /opt

# Switch user
sudo su

# Clone pimpmykali repository & enter the folder
git clone https://github.com/Dewalt-arch/pimpmykali

cd pimpmykali

# Execute the script - For a new Kali VM, run menu option 'N'
# (The script must be run with root privileges)
./pimpmykali.sh
# Use --auto command line arg to bypass the menu and prompts
# Use --help for full list of available command line args
```

**Time to to snapshot!** 
### RustScan
> [RustScan Github](https://github.com/bee-san/RustScan)

```bash
# --- RustScan --- # 
# Make Directory
mkdir /opt/rustscan

# Change into Directory
cd /opt/rustscan

# Install Pacakage
dpkg -i <Package_from_Github>
```