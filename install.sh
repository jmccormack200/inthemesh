
#!/bin/bash

# Swiped from: http://michal.karzynski.pl/blog/2013/06/09/django-nginx-gunicorn-virtualenv-supervisor/

apt-get update
apt-get upgrade
apt-get install postgresql postgresql-contrib python-virtualenv
groupadd --system webapps
useradd --system --gid webapps --shell /bin/bash --home /webapps/inthemesh inthemesh
mkdir /webapps
cd /webapps
git clone git@github.com:sli/inthemesh.git
chown inthemesh /webapps/inthemesh
su - inthemesh
cd /webapps/itm
virtualenv .
source bin/activate
pip install -r requirements.txt