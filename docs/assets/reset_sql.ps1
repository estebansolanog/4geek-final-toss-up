rmdir "./migrations" -Force -Recurse
echo rm -R -f ./migrations
pipenv run init
mysql -u root -p -e "DROP DATABASE tossup;"
mysql -u root -p -e "CREATE DATABASE tossup;"
pipenv run migrate
pipenv run upgrade