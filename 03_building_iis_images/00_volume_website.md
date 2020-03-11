## Volume Mount Web Site Files

Copy _dist/game-catalog_ into C:\\Users\\Jaime, the absolute path where our files are placed _C:\Users\Jaime\dist\game-catalog_

From a powershell command prompt

```ps1
docker run --rm -it -p 8080:80 microsoft/iis:nanoserver
```

In this case isn't going to show nothing but we can visit the default IIS portal. Now let's create a volume that maps the static files to C:\inetpub\wwwroot\

Create a new Dockerfile

```Dockerfile
FROM microsoft/iis:nanoserver

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*
```

Now build a new image 

```ps1
docker build -t iis-nanoserver-clean .
```

From an open powershell

```ps1
docker run --rm -it -p 8080:80 -v C:\Users\Jaime\dist\game-catalog:C:\inetpub\wwwroot\ iis-nanoserver-clean
```