# Hendricss Boilerplate
☠️ Hendricss is my personal boilerplate for simple webpages.
This boileplate contain's:

* [Sass (scss)](http://sass-lang.com/);
* [Jade](http://jade-lang.com/);
* [Gulp](http://gulpjs.com/);
* [Browser-sync](https://www.browsersync.io/);
* [Normalize.css](https://necolas.github.io/normalize.css/) with border-sizing: border-box;
* [Jeet (Grid System)](http://jeet.gs/);
* Image optimization

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
        /images
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

## Checklist
- [ ] Change Jade to Pug
- [ ] Turn gulpfile in ES 6

## License

MIT. See /LICENSE