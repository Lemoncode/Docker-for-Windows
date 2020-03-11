## Prerequisites

- Windows 10 PRO
- Hyper V. 
- Virtualization enable. Maybe we have to enable from BIOS
- In first releases only available `docker for linux`.

## Installation

> https://docs.docker.com/docker-for-windows/install/

If _Hyper-V_ is not enable, _Docker Desktop_ ask as to enable it.


Docker for Windows start up as a service. One of the things that is going to do is set up a Hyper-V VM that contains a version of Linux on it so that we can run Linux containers.

Access _Hyper-V Manager_, we will find out _Docker Desktop VM_.

> TIP: If we're running Docker Windows containers it's off.

To find out where is docker in our machines from a command prompt we can run:

```
C:\Users\Jaime>where docker
C:\Program Files\Docker\Docker\Resources\bin\docker.exe
```

```ps1
docker info
```

This give us information about the Docker server.

```
C:\Users\Jaime>docker version
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea
 Built:             Wed Nov 13 07:22:37 2019
 OS/Arch:           windows/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.12
  Git commit:       633a0ea
  Built:            Wed Nov 13 07:29:19 2019
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          v1.2.10
  GitCommit:        b34a5c8af56e510852c35414db4c1f4fa6172339
 runc:
  Version:          1.0.0-rc8+dev
  GitCommit:        3e425f80a8c931f88e6d94a8c831b9d5aa481657
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```

```ps1
docker run hello-world
```

* `hello-world` is the image that we're going to run

```ps1
docker run -p 80:80 nginx
```

We map the port 80 on the host and 80 on the container

## Some Docker operators kind reminder

You can use either 'ID' or 'name' to interact with a container.

To stop a container

```ps1
docker stop da2
```

To start a container

```ps1
docker start da2
```

To watch the running containers

```ps1
docker ps
```

To watch everything, stopped and running containers

```ps1
docker ps -a
```

To remove a container

```ps1
docker rm da2
```

How to remove images

```ps1
docker rmi nginx c54
```

We can use the repository and part of the `image id`.

```ps1
docker search docs
```

Will show us, repos that are related to documentation

```ps1
docker run -p 4000:4000 docs/docker.github.io
```

This will bring to local teh docker documentation

```ps1
docker run -p 4000:4000 -it --name docs docs/docker.github.io
```

* We open an interactive terminal `-it`
* We run the container with a specific name _docs_ using `--name`

## Windows container

We have to change the container type in _Docker desktop_ settings.

The `windows containers feature` has to be enable, otherwise we're not be able to _run windows containers_

Now when we run _docker version_, we can see that both, client and server are _windows machines_

If we open _Hyper-V manager_ we will notice that _DockerDesktopVM_ is already stoped.
 
```
C:\Users\Jaime>docker version
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea
 Built:             Wed Nov 13 07:22:37 2019
 OS/Arch:           windows/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.24)
  Go version:       go1.12.12
  Git commit:       633a0ea
  Built:            Wed Nov 13 07:36:50 2019
  OS/Arch:          windows/amd64
  Experimental:     false
```

```ps1
docker run -p 80:80 -d --name iis microsoft/iis:nanoserver
```

> Up iis on interactive terminal: https://stackoverflow.com/questions/40391896/cannot-launch-interactive-session-in-windows-iis-docker-container

We're going to be working with another image

```
docker pull mcr.microsoft.com/windows/servercore:ltsc2019
```

## A Word About Network

* Containers have their own isolated network adapter.

The container has its own isolated network adapter, as if it were a separate computer, and if we ping that network adapter on that IP address associated with it, then we can get into the container that way as well.

```ps1
docker inspect iis
```

We can find out the IPAddress, an alternative way to check out this IP address:

```ps1
docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" my-running-site
```

We can ping to that IP address

```
C:\Users\Jaime>ping 172.24.1.74

Pinging 172.24.1.74 with 32 bytes of data:
Reply from 172.24.1.74: bytes=32 time<1ms TTL=128
Reply from 172.24.1.74: bytes=32 time<1ms TTL=128
Reply from 172.24.1.74: bytes=32 time<1ms TTL=128
Reply from 172.24.1.74: bytes=32 time<1ms TTL=128

Ping statistics for 172.24.1.74:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

We can visit the application running on that IPAddress __http://172.24.1.74:80/__
