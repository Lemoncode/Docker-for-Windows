# Installing on Windows Server

* Before start, we have several options to start a windows server, for example using _Hyper-V_ or using Azure. 

> Reference how ro create and connect to Azure VM: https://aleson-itc.com/en/windows-server-2019-en-azure-creacion-de-maquina-virtual/

## Installing Docker on Windows

* Connect to our remote virtual machine on Azure
* Open PowerShell and run as administrator

```ps1
Install-Module DockerMsftProvider -Force
```

After type _Install-Module DockerMsftProvider -Force_ ask us to install nuget. Now we're ready to install the _Docker_ package.

```ps1
Install-Package Docker -ProviderName DockerMsftProvider -Force -Verbose
```

After this ask us to restart the machine.

```ps1
Restart-Computer
```

To check our installation

```ps1
docker run hello-world:nanoserver-sac2016
```

If we have success 

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (windows-amd64, nanoserver-sac2016)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run a Windows Server container with:
 PS C:\> docker run -it mcr.microsoft.com/windows/servercore powershell

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

To check where are the related _Docker_ files:

```
PS C:\Program Files\Docker> ls


    Directory: C:\Program Files\Docker


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         3/7/2020   6:50 PM                cli-plugins
-a----       11/14/2019   5:42 PM       69289304 docker.exe
-a----       11/14/2019   5:42 PM       76369752 dockerd.exe
-a----       10/22/2019  12:25 PM        2454016 libeay32.dll
-a----        5/11/2017  10:32 PM          56978 libwinpthread-1.d
-a----       11/13/2019   7:47 AM           6124 licenses.txt
-a----         3/7/2020   6:50 PM            142 metadata.json
-a----       10/22/2019  12:25 PM         357888 ssleay32.dll
-a----         6/9/2016  10:53 PM          87888 vcruntime140.dll
```

We can check here that we don't have any proxy, is our simplify model of _Docker_, just _Docker_ for Windows containers. _Docker_ is a service now inside this machine.

```ps1
PS C:\Program Files\Docker> Get-Service *docker*

Status   Name               DisplayName
------   ----               -----------
Running  docker             Docker Engine
```

And of course the _docker_ command is added to our path now.

* A way to see Docke:

> Docker is a front end for running containers

So it provides an API that hooks into the operating system mechanisms both in Linux and in Windows to be able to manage containers, which means to be able to run software, basically.

> Note install this huge package:

```ps1
> docker pull mcr.microsoft.com/windows/servercore:ltsc2016
```

## Running Microsoft .NET Core container

```ps1
> docker run microsoft/dotnet:nanoserver
```

When we start this container a temporal command prompt apears and then vanish, to check out what is going on:

```ps1
docker ps -a --no-trunc
```

And we can check that is running a command prompt, we have to attach to it, to make that the container doesn't die.

```ps1
> docker run -it microsoft/dotnet:nanoserver
```

Now we can run 

```ps1
> dotnet
> exit
```


## Containers have isolated File System

To prove that containers have an isolated file system, let's open: __Computer Management -> Disk Management__

No from a powershell run

```ps1
> docker run -it --rm microsoft/dotnet:nanoserver powershell
```

We can check that a new disk is added.

## Processes Are Isolated

Open one powershell and task manager

```ps1
> docker run -it --rm microsoft/dotnet:nanoserver powershell
```

In Task Manager -> Details -> Right Button -> Select columns -> Job Object Id

If we sort by Object Id we can see a lot of them with the same Id

If we run in container's powershell

```ps1
PS C:\> Get-Process

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
      0       5      936       4400       0.02    404   4 CExecSvc
      0       6      704       1900       0.00   4716   4 csrss
      0       0        0          4                 0   0 Idle
      0      18     3164      10600       0.13   5980   4 lsass
      0      36    38092      61932       1.77   5200   4 powershell
      0       8     1516       5152       0.06   3384   4 services
      0       2      296       1124       0.02   4244   0 smss
      0      14     4260      13168       0.14    696   4 svchost
      0      11     5352       9604       0.03   1324   4 svchost
      0       8     1580       5840       0.05   4708   4 svchost
      0       9     2160       6624       0.02   4732   4 svchost
      0      15    13452      21888       3.38   5196   4 svchost
      0      29     5840      16132       0.47   5272   4 svchost
      0      12     1520       6088       0.06   5928   4 svchost
      0       0      128        144      47.61      4   0 System
      0       8     1752       7184       0.06   3388   4 TiWorker
      0       6     1436       5528       0.02   6800   4 TrustedInstaller
      0       7      848       4088       0.00   4296   4 wininit
      0       6     1444       6076       0.02   6956   4 WMIADAP
      0       8     6668      11632       0.98   7008   4 WmiPrvSE
```

We can find a lot of process that are not in _Task Manager_

## Network Stacks Are Isolated

Open two powershell, on one of them run:

```ps1
> docker run -it --rm microsoft/dotnet:nanoserver powershell
```

Now from __HOST__ computer check out the adapters

```ps1
PS C:\Users\azureadmin> ipconfig

Windows IP Configuration


Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . : xee4se5cubburcrezoszgexadh.parx.internal.cloudapp.net
   Link-local IPv6 Address . . . . . : fe80::883a:568f:7912:6236%6
   IPv4 Address. . . . . . . . . . . : 10.0.0.4
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.0.0.1

Ethernet adapter vEthernet (HNS Internal NIC):

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::adac:43ec:1447:6027%12
   IPv4 Address. . . . . . . . . . . : 172.29.192.1
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :

Tunnel adapter Reusable ISATAP Interface {22FB1B5D-5C30-4F40-9211-CFD6145B99DB}:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . : xee4se5cubburcrezoszgexadh.parx.internal.cloudapp.net

Tunnel adapter Teredo Tunneling Pseudo-Interface:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :

Tunnel adapter isatap.{0E9A9228-91BC-4263-9121-1D8BB8596D66}:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :
```


Here we can see in __Ethernet adapter Ethernet__ block that our ip address to talk with the world will be _10.0.0.4_ 

If we run the same command on container powershell we obtain:

```ps1
PS C:\> ipconfig

Windows IP Configuration


Ethernet adapter vEthernet (Container NIC 84124aa5):

   Connection-specific DNS Suffix  . : xee4se5cubburcrezoszgexadh.parx.internal.cloudapp.net
   Link-local IPv6 Address . . . . . : fe80::7cc9:7b7a:5ab3:2352%17
   IPv4 Address. . . . . . . . . . . : 172.29.206.97
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . : 172.29.192.1
```

We can check that's a completely different network. We can find out that there's another __HOST__ adapter _Ethernet adapter vEthernet (HNS Internal NIC):_, that shares the same IP address _172.29.192.1_ with container's _Default Gateway_ 

This is the way that our containers talk to the host machine.

## Environment Variables and Computer Name are Different

Let's have a look into the hostname because is different that in Linux, let's check the name from _powershell_.

From our previous running container, we can check the env variables as follows:

```ps1
PS C:\> ls env:

Name                           Value
----                           -----
ALLUSERSPROFILE                C:\ProgramData
APPDATA                        C:\Users\ContainerAdministrator\AppData\Roaming
CommonProgramFiles             C:\Program Files\Common Files
CommonProgramFiles(x86)        C:\Program Files (x86)\Common Files
CommonProgramW6432             C:\Program Files\Common Files
COMPUTERNAME                   8C0146C9A9B9
ComSpec                        C:\windows\system32\cmd.exe
DOTNET_SDK_DOWNLOAD_URL        https://dotnetcli.blob.core.windows.net/dotnet/Sdk/1.1.12/dotnet-dev-..
DOTNET_SDK_VERSION             1.1.12
LOCALAPPDATA                   C:\Users\ContainerAdministrator\AppData\Local
NUGET_XMLDOC_MODE              skip
NUMBER_OF_PROCESSORS           2
OS                             Windows_NT
Path                           C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\Sy..
PATHEXT                        .COM;.EXE;.BAT;.CMD
PROCESSOR_ARCHITECTURE         AMD64
PROCESSOR_IDENTIFIER           Intel64 Family 6 Model 85 Stepping 4, GenuineIntel
PROCESSOR_LEVEL                6
PROCESSOR_REVISION             5504
ProgramData                    C:\ProgramData
ProgramFiles                   C:\Program Files
ProgramFiles(x86)              C:\Program Files (x86)
ProgramW6432                   C:\Program Files
PSMODULEPATH                   C:\Users\ContainerAdministrator\Documents\WindowsPowerShell\Modules;C..
PUBLIC                         C:\Users\Public
SystemDrive                    C:
SystemRoot                     C:\windows
TEMP                           C:\Users\ContainerAdministrator\AppData\Local\Temp
TMP                            C:\Users\ContainerAdministrator\AppData\Local\Temp
USERDOMAIN                     User Manager
USERNAME                       ContainerAdministrator
USERPROFILE                    C:\Users\ContainerAdministrator
windir                         C:\windows


```

Then we can do exact same thing from __HOST__ machine:

```ps1
PS C:\Users\azureadmin> ls env:

Name                           Value
----                           -----
ALLUSERSPROFILE                C:\ProgramData
APPDATA                        C:\Users\azureadmin\AppData\Roaming
CLIENTNAME                     DESKTOP-N3DFRG6
CommonProgramFiles             C:\Program Files\Common Files
CommonProgramFiles(x86)        C:\Program Files (x86)\Common Files
CommonProgramW6432             C:\Program Files\Common Files
COMPUTERNAME                   docker-clc-test
ComSpec                        C:\windows\system32\cmd.exe
HOMEDRIVE                      C:
HOMEPATH                       \Users\azureadmin
LOCALAPPDATA                   C:\Users\azureadmin\AppData\Local
LOGONSERVER                    \\docker-clc-test
NUMBER_OF_PROCESSORS           2
OS                             Windows_NT
Path                           C:\windows\system32;C:\windows;C:\windows\System32\Wbem;C:\windows\System32\W
PATHEXT                        .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL
PROCESSOR_ARCHITECTURE         AMD64
PROCESSOR_IDENTIFIER           Intel64 Family 6 Model 85 Stepping 4, GenuineIntel
PROCESSOR_LEVEL                6
PROCESSOR_REVISION             5504
ProgramData                    C:\ProgramData
ProgramFiles                   C:\Program Files
ProgramFiles(x86)              C:\Program Files (x86)
ProgramW6432                   C:\Program Files
PSModulePath                   C:\Users\azureadmin\Documents\WindowsPowerShell\Modules;C:\Program Files\Wind
PUBLIC                         C:\Users\Public
SESSIONNAME                    RDP-Tcp#1
SystemDrive                    C:
SystemRoot                     C:\windows
TEMP                           C:\Users\azureadmin\AppData\Local\Temp\2
TMP                            C:\Users\azureadmin\AppData\Local\Temp\2
USERDOMAIN                     docker-clc-test
USERDOMAIN_ROAMINGPROFILE      docker-clc-test
USERNAME                       azureadmin
USERPROFILE                    C:\Users\azureadmin
windir                         C:\windows

```

There are a couple of differences for example the computer name. We have env variables different for dotnet core in running container.

## References

* Docs for getting started with Docker containers lab: https://github.com/docker/labs/blob/master/windows/windows-containers/README.md
* Docker hub guide to insatll Docker on Windows server: https://hub.docker.com/editions/enterprise/docker-ee-server-windows 
* Reference Docker docs __Install Docker Engine - Enterprise on Windows Servers__: https://docs.docker.com/ee/docker-ee/windows/docker-ee/