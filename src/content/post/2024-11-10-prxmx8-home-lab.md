---
title: My notes on setting up a Proxmox 8.2 home lab server
description: Setting up a home lab is an excellent way to learn enterprise-grade virtualization technologies. Proxmox Virtual Environment (VE) 8.2 offers a robust platform that brings data centre features to your home lab setup.
publishDate: 2024-10-21
updatedDate: 2024-11-11
heroImage: '@/content/post/_images/2024-11-10-prxmx8-home-lab/home-lab.jpg'
heroAlt: 'A photo of there desktop computers in a data center rack shelf.'
noHero: false
tags:
  - infrastructure
  - devops
  - automation
  - virtualization
  - local environment
category: Tutorials
toc: true
---


## TLDR
* Proxmox VE 8.2 is a free, enterprise-grade virtualization platform combining KVM hypervisor and LXC containers with an intuitive web GUI
* Setup requires minimal hardware (64-bit CPU, 4GB RAM minimum) and offers enterprise features like live migration, high availability, and backup tools
* Security best practices include proper network segregation, SSH hardening, and following the principle of least privilege

## Overview
Setting up a home lab is an excellent way to learn enterprise-grade virtualization technologies. Proxmox Virtual Environment (VE) 8.2 offers a robust platform that brings data centre features to your home lab setup. **This guide walks through the setup process, from initial installation to essential hardening**, suitable for beginners and experienced system administrators.

## Why Proxmox?
Proxmox VE has become a popular choice for home labs and small to medium-sized businesses for several compelling reasons:

### Free and Open Source
* Based on Debian Linux with a fully open-source license
* Enterprise features available without licensing costs
* Optional paid support available for production environments
* Regular security updates and community support

### Intuitive Web-Based Management
* HTML5-based interface accessible from any modern browser
* No additional management tools required
* Built-in console access to VMs and containers
* Comprehensive dashboard with resource monitoring
* REST API for automation and custom integrations

### Streamlined Installation
* Single ISO installation process
* Automated partitioning and basic configuration
* Typically completed in under 30 minutes

### Simplified Management
* Unified interface for both VMs and containers
* Integrated backup and restore functionality
* Template-based deployment
* Snapshot management
* Storage migration between nodes

### Scalability Features
* Cluster support out of the box
* Live migration capabilities* 
* Software-defined storage integration
* Support for multiple storage types (local, NFS, Ceph)

## Installation
The installation process for Proxmox VE 8.2 is straightforward but requires attention to detail:

### Prerequisites
* 64-bit CPU with virtualization support (Intel VT-x/AMD-V)
* Minimum 4GB RAM (8GB+ recommended)
* Fast storage device (SSD recommended)
* Network interface card
* Internet connection for updates

### Installation Steps
1. Download the latest Proxmox VE 8.2 ISO from the official website
2. Create a bootable USB using tools like Rufus or dd
3. Boot from the installation media
4. Follow the guided installation process:
 ```bash
   # Select the installation target disk
   # Configure network settings
   # Set root password
   # Configure email notifications
 ```

### Post-Installation
* Update repository sources
* Apply system updates:
 ```bash
  apt update
  apt dist-upgrade
 ```
* Verify web interface accessibility (https://your-ip:8006)

## Initial Configuration
After installation, several key configurations enhance your Proxmox environment:

### Network Configuration
* Configure network bridges for VM connectivity
* Set up VLAN tagging if required
* Example bridge configuration:
 ```bash
  # /etc/network/interfaces
  auto vmbr0
  iface vmbr0 inet static
     address 192.168.1.100/24
     gateway 192.168.1.1
     bridge-ports eth0
     bridge-stp off
     bridge-fd 0
 ```

### Storage Configuration
* Configure local storage for VM images
* Set up shared storage if using clustering
* Enable thin provisioning for efficient space usage

### Repository Management
* Add non-subscription repository:
 ```bash
  # /etc/apt/sources.list.d/pve-enterprise.list
  deb http://download.proxmox.com/debian/pve bullseye pve-no-subscription
 ```

## Hardening and SSH Configuration
Security is crucial for any virtualization environment:

### Create Administrative User
```bash
# Create a user and add it to the sudo group
adduser admin
usermod -aG sudo admin

# Create .ssh directory
mkdir -p /home/admin/.ssh
chmod 700 /home/admin/.ssh
```

### SSH Hardening
1. Edit SSH configuration:
```bash
# /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Protocol 2
AllowUsers admin
```

2. Configure key-based authentication:
```bash
# Generate key pair on the client
ssh-keygen -t ed25519 -C "admin@proxmox"

# Copy the public key to the server
ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@proxmox-ip
```

### Additional Security Measures
* Enable and configure the firewall
* Regular security updates
* Monitor system logs
* Implement network segmentation
* Use strong passwords and key-based authentication

## Summary
Proxmox VE 8.2 provides an enterprise-grade virtualization platform suitable for home labs and production environments. **Proper installation procedures and security best practices can create a robust virtualization environment for testing, development, and learning.** The platform's scalability ensures your lab can grow with your needs, while its web-based management interface keeps administration straightforward.


## Additional Resources

### Official Documentation
* [Official Proxmox Documentation](https://pve.proxmox.com/wiki/Main_Page)
* [Proxmox Installation Guide](https://pve.proxmox.com/wiki/Installation)
* [Proxmox Security Guide](https://pve.proxmox.com/wiki/Security_Recommendations)
* [Proxmox Container Templates](https://pve.proxmox.com/wiki/Linux_Container#pct_templates)

### Community Resources
* [Proxmox Forum](https://forum.proxmox.com/)
* [Proxmox Blog](https://www.proxmox.com/en/news)
* [Proxmox User Discord](https://discord.gg/proxmox)

### Video Tutorials
* [Why Choose Proxmox?](https://www.youtube.com/watch?v=s_1Le4a-Wrk)
* [Proxmox Installation Guide](https://www.youtube.com/watch?v=7OVaWaqO2aU)
* [Initial Proxmox Configuration](https://www.youtube.com/watch?v=GoZaMgEgrHw)

### Security and Hardening
* [SSH Server Hardening on Debian 12](https://reintech.io/blog/hardening-ssh-server-configuration-debian-12)
* [Disabling SSH Password Login on Linux](https://www.cyberciti.biz/faq/how-to-disable-ssh-password-login-on-linux/)
* [OpenSSH Security Best Practices](https://www.ssh.com/academy/ssh/security)
* [Linux Server Security Guide](https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers)

### Advanced Topics
* [Proxmox Clustering Guide](https://pve.proxmox.com/wiki/Cluster_Manager)
* [High Availability Guide](https://pve.proxmox.com/wiki/High_Availability)
* [Storage Replication](https://pve.proxmox.com/wiki/Storage_Replication)
* [Backup and Restore](https://pve.proxmox.com/wiki/Backup_and_Restore)

### Networking
* [Network Configuration Guide](https://pve.proxmox.com/wiki/Network_Configuration)
* [Network Models in Proxmox VE](https://pve.proxmox.com/wiki/Network_Models)
* [VLAN Configuration](https://pve.proxmox.com/wiki/VLAN)

### Storage
* [Storage Configuration](https://pve.proxmox.com/wiki/Storage)
* [ZFS on Linux](https://pve.proxmox.com/wiki/ZFS_on_Linux)
* [Ceph Storage](https://pve.proxmox.com/wiki/Ceph_Server)

### API and Automation
* [Proxmox VE API Documentation](https://pve.proxmox.com/pve-docs/api-viewer/)
* [REST API Examples](https://pve.proxmox.com/wiki/Proxmox_VE_API)
* [Ansible Integration](https://docs.ansible.com/ansible/latest/collections/community/general/proxmox_module.html)

### Performance Tuning
* [Performance Tuning Guide](https://pve.proxmox.com/wiki/Performance_Tuning)
* [CPU Pinning](https://pve.proxmox.com/wiki/CPU_Pinning)
* [Memory Management](https://pve.proxmox.com/wiki/Memory_Management)

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
