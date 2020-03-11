# In this demo we're going to create an image that will host a static web app.

We start from _game-catalog_ web app. This is an angular application do previous _ng build --prod_

Create a new _Dockerfile_ inside _~/game-catlog_

```Dockerfile
FROM mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2016

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

WORKDIR /inetpub/wwwroot

COPY dist/game-catalog/ .

RUN dir
```

We're using __-NoProfile__ to avoid unespected bahaviors of current profile session.

With the last _RUN_ we check that contents are copied as we spec.

Now we can build the image as follows (from _~/game-catlog_)

```bash
docker build -t iis-site .
docker run -d -p 8000:80 --name my-running-site iis-site
```

Now we want to deploy this code into our _Windows Azure 2016 Server VM_. To achieve this we will do the process manually.

First let's publish our image into _Docker Hub_:

First we have log into _Docker Hub_

```ps1
docker login --username=<your_hub_username>
```

With succesful login, now we have to tag our image

```ps1
docker tag <image_id> your_hub_username/repository:version
```

Now we can push the image

```ps1
docker push your_hub_username/repository
```

Wait a bit, and check out that everything goes fine in _Docker Hub portal_

Now we can connect to our _Azure VM_, open a new powershell and type:

```ps1
docker run -d -p 80:80 --name my-running-site your_hub_username/repository:version
```

In my case

```ps1
docker run -d -p 80:80 --name my-running-site jaimesalas/iis-site:0.0.1
```

Or just:

```ps1
docker run -d -p 80:80 --name my-running-site jaimesalas/iis-site
```

because in this case matches with latest version. 

Now visit your site, copy Azure public ip address, open a browser and paste the url. Because we're fordwarding the default http endpoint we don't have to specify a port.