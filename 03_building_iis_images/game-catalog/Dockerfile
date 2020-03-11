FROM mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2016

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

WORKDIR /inetpub/wwwroot

COPY dist/game-catalog/ .

# Give Full Access To Folder
# RUN icacls 'c:/inetpub/wwwroot' /grant 'Everyone:(OI)(CI)F'
# Check that the files have been successfully copied
RUN dir
