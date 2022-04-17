#!/bin/bash

# google bbr
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh

# ss
wget --no-check-certificate -O shadowsocks.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log

# config
echo { \
    \"server\": \"0.0.0.0\", \
    \"local_address\": \"127.0.0.1\", \
    \"local_port\": 1080, \
    \"timeout\": 300, \
    \"method\": \"aes-256-gcm\", \
    \"fast_open\": false, \
    \"port_password\": \
    { \
        \"port1\": \"pswd1\", \
        \"port2\": \"pswd2\" \
    } \
} > /etc/shadowsocks.json

# apply config 
/etc/init.d/shadowsocks restart
