# Jake

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
LGU+ 홈IoT 청약툴을 웹으로 개발(Angular + SpringBoot 공부용)

1. node.js 설치
2. angular CLI 설치

### Windows
1. 프로젝트 clone후 npm update
2. ng serve --open
 
### Linux
* node.js설치
1. 패키지 매니저로 설치하는 방법
> https://nodejs.org/ko/download/package-manager/#enterprise-linux-fedora
2. curl 이용 방법
> curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
> sudo yum -y install nodejs
> node -v
3. 릴리즈 파일로 설치하는 방법
> tar.xz 받아서 tar -xvf node-v...x64.tar.xz

* angluar CLI 설치
> npm install -g @angular/cli
 
3. 실행
> tar -xvf jake.tar (for Linux)
> ng serve --host 0.0.0.0
> enter browser ip:4200

* how to config nginx to run angular5 Application?
1. install nginx.
2. angular updload to linux.
3. run command.
<pre>
> ng build --prod
> cp [project_path]/dist/* /var/www/html/
> vi /etc/nginx/conf.d/default.conf
</pre>
<pre>
server {
    listen       5554 default_server;
    listen       [::]:5554 default_server;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        #root 기본설정은 주석처리
        #root  /usr/share/nginx/html;
        root   /var/www/html;
        index  index.html index.htm;
    }
 ...
</pre>
4. service nginx restart
