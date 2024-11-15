---
title: Mullvad OpenVPN Gateway
description: I am building a cybersecurity home lab. However, I do not like my ISP having all logs of my home lab activity. I do not know why but this feels threatening even if I am not planning to be a black hat.
publishDate: 2021-07-02
updatedDate: 2024-11-03
heroImage: '../../content/post/_images/2021-07-02-vpn_gateway/vpn-connection.jpg'
heroAlt: 'A person using a laptop and connecting to a vpn service.'
noHero: false
tags:
  - information security
  - proxmox
  - vpn
  - efficiency
category: AppSec
toc: true
---


## Overview

Let's say that you have a virtualised server similar to [Proxmox VE](https://www.proxmox.com/en/proxmox-ve). There are few Virtual Machines within this server, and you want them to use a safe VPN connection out to the Internet.

## My Home lab
I am building a cybersecurity home lab. However, I do not like my ISP having all logs of my home lab activity. I do not know why but this feels threatening even if I am not planning to be a black hat. 

Also, just if I misuse a tool and my home IP gets blocked, I do not want to affect my family Internet connection. In that case, I can just reconnect the VPN gateway to another location and move on.

The main reason why I need a VPN gateway is that I can connect to the internet from any other location than my physical one. This capability gives me much more freedom and power to do effective OSINT and reconnaissance activities. For example, depending on the target under test, it might be more efficient to be in Europe, Asia or Australia.

After setting up my Proxmox machine, I prepared my VPN project by watching some good tutorials from [Craft Computing. VPN Everything!](https://www.youtube.com/watch?v=xFficDCEv3c) and [Lo-Res DIY. Use Private Intern Access](https://www.youtube.com/watch?v=vBCrWs5bFsA)

This project has three parts. The first part, I have summarised in the repository [vpn-gateway](https://gitlab.com/marcandreuf/vpn-gateway). The readme file has all the steps to do the basic installation and manual configuration of the VPN Gateway. Interestingly enough, I just had to slightly personalise the other tutorials because, in my case, I am using Mullvad OpenVPN. Still, the rest of the tutorial is almost the same as the video tutorials linked above.

At this point, I had a working VPN Gateway at the internal IP 192.68.0.xx. I could point any VM to use this gateway, and everything was working fine. However, to switch the VPN connection to use another location was a manual task. Considerably time-consuming was the configuration of the Iptables rules for the kill-switch. To change the location required editing the Iptables rules to list all the server IPs used for a given country. So, this Iptables configuration had to be automated, and I prepared the second part of this project into the repository [openvpn-iptables](https://gitlab.com/marcandreuf/openvpn-iptables). 

The last part of this project wraps up all the automation to make it very easy to switch the OpenVPN connection to any location allowed by Mullvad VPN. The [Switch Country Connection section](https://gitlab.com/marcandreuf/vpn-gateway#switch-country-connection) has all the details to set up and use this helping tool. Once everything is in place, I just need to ssh to the VPN gateway and run the command:

 ‘sudo /etc/openvpn/switch-country.sh {country-code}’

Where ‘country-code’ is the two-character country identifier of any Mullvad OpenVPN config file. 

And that is all. I have now a save Virtualisation Server with many Virtual Machines using the same VPN Gateway to go out to the internet from any location that I need to. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!

