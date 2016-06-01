# React-Redux-Flask #

Boilerplate application for a Flask JWT Backend and a React/Redux Front-End with Material UI.

* Python 2.7
* Pytest
* Heroku
* Flask
* React
* Redux
* React-Router 2.0
* React-Router-Redux
* Babel 6
* SCSS processing
* Webpack

![screenshot](http://i.imgur.com/ZIS4qkw.png)

### Create DB
```sh
$ export DATABASE_URL="postgresql://localhost/yourdb"
$ python manage.py create_db
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```

### Install Front-End Requirements
```sh
$ cd static
$ npm intall
```

### Run Back-End

```sh
$ python manage.py runserver
```

### Test Back-End

```sh
$ python test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

### Run Front-End

```sh
$ cd static
$ npm start
```

### Build Front-End

```sh
$ npm run build:production
```
