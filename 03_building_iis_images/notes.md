## Mapping Static Web Site Files into a Web Server Container

We have a static site created with Angular. You can take the files from: https://github.com/Lemoncode/angular-8-sample-app/tree/master/demos/10%20Filtering%20Sorting/game-catalog

Once that you have the files, and with angular-cli install in your machine, run from root folder:

```bash
ng build --prod
```

* Web Site Static Files

1. __Volume mount__ Use a volume mount to map files for our static website from the host into that container that we created. 

2. __Copy into the Container File System__ We can actually copy files into the container file system. So instead of a volume mount, we will copy the files from the host file system into the container file system, much like you might do with ssh. With this copying approach, you could think of this somewhat as like using a cp to securely copy files onto another computer.

3. __Bake into an Image__ We can bake files into an image, and then we can pull down our own image that has our files already baked inside of it, so we don't have to worry about getting them into the container, we just start a container from that image, and everything's up and running.