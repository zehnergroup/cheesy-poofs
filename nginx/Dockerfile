FROM nginx:1.9.0

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
COPY bin/start.sh /start.sh

CMD ["/start.sh"]