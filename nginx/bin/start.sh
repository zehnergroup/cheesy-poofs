#!/bin/bash

FILES=/etc/nginx/conf.d/*.tmpl

for f in $FILES; do
  cat $f | perl -p -e 's/\$\{([^}]+)\}/defined $ENV{$1} ? $ENV{$1} : $&/eg' > ${f%.tmpl}.conf
done

nginx -g "daemon off;"