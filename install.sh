#!/bin/bash

########################
#                      #
# Don't run this junk. #
#                      #
########################

PIP = pip-3.2

apt-get install python3 python3-pip
$PIP install virtualenv uwsgi django
#virtualenv inthemesh
#cd inthemesh
#source bin/activate
#$PIP install uwsgi django
wget https://raw.githubusercontent.com/nginx/nginx/master/conf/uwsgi_params