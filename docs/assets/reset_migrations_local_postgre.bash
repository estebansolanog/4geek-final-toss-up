rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c 'DROP DATABASE exampletu;' || true &&
psql -U postgres -c 'CREATE DATABASE exampletu;' &&
psql -U postgres -c 'CREATE EXTENSION unaccent;' -d exampletu &&
pipenv run migrate &&
pipenv run upgrade