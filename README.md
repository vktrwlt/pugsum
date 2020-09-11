# Pugsum: A 11ty starter kit using Pug Templates and TailwindCSS
[Demo](https://pugsum.netlify.app/)

Features:

- [11ty](https://www.11ty.io/) for templates and site generation
- [TailwindCSS](https://tailwindcss.com/) for a utility first CSS workflow
- [PurgeCSS](https://purgecss.com/) for optimizing CSS output
- [PostCSS](https://postcss.org/) for processing Tailwind
- [Sass/SCSS](https://github.com/sass/node-sass) for leveraging other vendor stylesheets with Tailwind
- [Webpack](https://webpack.js.org/) for optimizing our JS and CSS files
- [Webpack-dev-server](https://webpack.js.org/configuration/dev-server/) for HMR and live-reload
- [Babel](https://babeljs.io/) for ES6 support
- [HTML minifier](https://www.npmjs.com/package/html-minifier) to minify production HTML

## Disclaimers

This is a starter project to demostrate how you can use Pug templates with 11ty. Not all 11ty features are supported on Pug templates, please read the
[11ty](https://www.11ty.io/) docs to see what features are included.

## Prerequisites

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash

# install the project dependencies
npm install

# run the build and server locally
npm start

View the site at http://localhost:3000/
```

## Previewing the production build

When building for production, an extra build step will strip out all CSS classes not used in the site. This step is not performed during the automatic rebuilds which take place during dev.

```bash

# run the production build
npm run build
npm run serve
```

## Other Scripts

```bash

# check to see latest packages
npm run update-check

# update all to latest
npm run update

# run npm audit and add risky dependencies in resolutions
npm run preinstall
```
