# GICU-3-Application
GICU-3 Kiosk application.

## Quick info
- Language: ENG

## Branching strategy
https://miro.medium.com/max/700/1*KB4sZe3J6Um27w1tbgfE5g.png

| branch                        | description                                                               |
|-------------------------------|---------------------------------------------------------------------------|
| release                       | A working version of the software ready for use. Master releases to here. |
| master                        | The master branch which holds release ready code. Uat pushes to here.     |
| uat (user acceptance testing) | Branch for testing purposes. Dev pushes to here.                          |
| dev                           | Development branch. Features pushes to here.                              |
| feature/[descriptive name]    | Features named clearly. Development happends here.                        |

Always work in a feature (project) branch which has been created from dev. A feature branch may be merged to dev when the feature is ready. Dev may be merged 
to uat for testing at any time.

_Please note that it's mandatory for features to have corresponding issues. The naming convention is as follows: **feature/[name]**\
Always use kebab-case!_

## File structure
https://miro.medium.com/max/1400/1*tjoajjTY-bV5KdS3dPDAqw.png

| directory         | description                                                 |
|-------------------|-------------------------------------------------------------|
| css               | css & scss files                                            |
| dat               | datafiles including databases for component and statistics  |
| doc               | documentation                                               |
| img               | images                                                      |
| js                | javascript files                                            |
| node_modules      |                                                             | 
| test              | testing space                                               |
| index.html        | self explanatory                                            |
| package.json      |                                                             |
| package-lock.json |                                                             |

## Project setup
```
npm install
```
_other dependencies may be needed such as bootstrap, fuse.js and electron_

### Lints and fixes files
```
npm run lint
```

### Compiles and hot-reloads for development
```
npm start
```

### Create production ready build
```
npm run electron:build
```

### Create production ready build Linux
```
npm run electron:build -- --linux
```
