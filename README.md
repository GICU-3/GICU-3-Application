# GICU-3-Application
GICU-3 Kiosk application.

## Quick info
- Language: ENG
- Start Electron: 'npm start'

## Branching strategy
https://miro.medium.com/max/700/1*KB4sZe3J6Um27w1tbgfE5g.png

| branch                        | description                                                               |
|-------------------------------|---------------------------------------------------------------------------|
| release                       | A working version of the software ready for use. Master releases to here. |
| master                        | The master branch which holds release ready code. Uat pushes to here.     |
| uat (user acceptance testing) | Branch for testing purposes. Dev pushes to here.                          |
| dev                           | Development branch. Features pushes to here.                              |
| feature                       | Features named clearly. Development happends here.                        |

Always work in a feature (project) branch which has been created from dev. A feature branch may be merged to dev when the feature is ready. Dev may be merged to uat for testing at any time.

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
CURRENTLY N/A
```

### Create production ready build Linux
```
CURRENTLY N/A
```

## Commenting guidelines
### Inline comments
When commenting code use the 'Better Comments' extention.
#### Default comment
```
//  [comment] or <!-- [comment] --> 
```
#### Alert
```
//! [comment] or <!--! [comment] -->
```
#### Querie
```
//? [Comment] or <!--? [comment] --> 
```
#### TODO
```
//TODO [comment] or <!--TODO [comment] -->
```
#### Highlight
```
//* [Comment] or <!--* [comment] -->
```
#### Mark for deletion
```
//// [Comment] or <!--// [comment] -->
```
### Docstrings
Docstrings are used for describing large chunks of code such as functions.
#### Trelent
Trelent is a tool for generating AI docstrings. It is found under VS Code extentions. Generated docstrings should always be modified to look as following:
```
/**
 * The startup function is called when the page loads.
 * It is used to hide elements on the page that are not needed until later, and to display elements that need to be shown immediately.
 *
 * @param [Parameters, if any]
 *
 * @return Nothing
 * @docauthor Trelent
 */
```
_In other words, remove empty lines taking up space. Always modify trelent generated docstrings if their description is not perfect. Always add your own name under "@docauthor Trelent" as following:_
```
@docauthor Trelent
@docmodifier [your name]
```

#### Manual
Manual docstrings fall under the same rules and styleguide as autogenerated ones, however, use:
```
@docauthor [your name]
```
