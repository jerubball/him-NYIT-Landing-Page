#!/bin/bash

list="anacron apache2 cron default-jdk default-mysql-client default-mysql-server docker emacs exfat-fuse exfat-utils fdisk fuseiso gcc gimp git htop hwinfo mysql-client mysql-server mysql-workbench nano net-tools nodejs openjdk-11-jdk openjdk-8-jdk openssh-client openssh-server openssl openvpn php php-all-dev python python-pip python3 rsync screen ssh telnet texlive texworks vim vsftpd wine-stable"

if [[ $(id -u) -ne 0 ]]
then
    sudo ./install.sh
else
    apt update
    apt upgrade -y
    
    apt install -y $list
    
    apt update
    apt upgrade -y
fi

