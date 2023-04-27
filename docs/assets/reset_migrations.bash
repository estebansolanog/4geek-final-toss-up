rm -R -f ./migrations &&
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE exampletu;' || true &&
psql -U gitpod -c 'CREATE DATABASE exampletu;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d exampletu &&
pipenv run migrate &&
pipenv run upgrade