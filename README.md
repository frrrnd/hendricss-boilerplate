# Hendricss
Hendricss is my personal boilerplate for simple webpages.
This boileplate contain's:

* [Sass (scss)](http://sass-lang.com/);
* [Jade](http://jade-lang.com/);
* [Gulp](http://gulpjs.com/);
* [Browser-sync](https://www.browsersync.io/);
* [Normalize.css](https://necolas.github.io/normalize.css/) with border-sizing: border-box;
* [Jeet (Grid System)](http://jeet.gs/);

## Install Dependencies
```$ npm install```

## Run tasks
```$ gulp```

## Files and Folders
```
project -
    /build -
        /assets
            /images
            /javascripts
                app.js
            /stylesheets
                style.css
        index.html
    /src -
        /jade
            index.jade
        /javascripts
            app.js
        /stylesheets
            atoms
                _base.scss
            jeet
            molecules
            organisms
            pages
            style.scss
    gulpfile.js
    package.json
```