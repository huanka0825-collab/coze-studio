FROM cozedev/coze-studio-web:latest

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ /usr/share/nginx/html/
COPY qitan-nginx-default.conf /etc/nginx/conf.d/default.conf

RUN find /usr/share/nginx/html/static/js -type f -name '*.js' -print0 \
      | xargs -0 sed -i 's#/\^\[a-zA-Z\]\[a-zA-Z0-9_\]{0,63}\$/#/^[\\p{L}_][\\p{L}\\p{N}_]{0,63}$/u#g'
