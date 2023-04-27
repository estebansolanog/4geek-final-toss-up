rm -R -f ./migrations &&
pipenv run init &&
mysql -u root -p -e "DROP DATABASE exampletu;" &&
mysql -u root -p -e "CREATE DATABASE exampletu;" &&
pipenv run migrate &&
pipenv run upgrade