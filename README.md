1-Install yarn:
  
...a) if you have a yarn.lock file copy it to the root of frontend folder
  
...b) run "yarn install"
  
...c) everytime you pull the repo and webpack.config.js is changed, run "yarn insatall" again to add the dependencies 
  
2-Copy theme to bootstrap package:

...a) yarn add bootstrap if you haven't already

...b) find "bootstrap_to_replace.css" file under src/styles/
  
...c) copy it to the node_modules/bootstrap/dist/css/ twice
  
...d) delete bootstrap.css and bootstrap.min.css
  
...e) rename the two copies to bootstrap.css and bootstrap.min.css

3-Add Configuration to your **editor**:

...a) Add npm configuration
  
...b) Add package.json
  
...c) Use "run" as Command
  
...d) Use "dev-server" as Scripts
  
...e) Install node.js and use it as Node interpreter
  
...f) Use "Project" as Package manager
  
4-Run the configuration

5-Access http://localhost:8080/


Note: do not push yarn.lock and .idea folder to the git repository
