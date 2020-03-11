## Copying files into a Running Container

```ps1
# copy example
docker cp index.html datatest1:c:\inetpub\wwwroot
```

```ps1
docker run -d -p 8080:80 --name iis-nanoserver-clean iis-nanoserver-clean
```

```ps1
docker exec -it iis-nanoserver-clean powershell
```

We can check that the folder __C:\inetpub\wwwroot__ is completely empty.

We want to execute

```ps1
docker cp .\dist\game-catalog\. iis-nanoserver-clean:C:\inetpub\wwwroot\ 
```

but id we do it with a running container, we will get an error, so before we have to stop the container

```ps1
docker stop iis-nanoserver-clean
```

Copy the files in the stopped container, and now run again

```ps1
docker start iis-nanoserver-clean
```

Visit _localhost:8000_ and our application must appear.