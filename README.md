# React-Redux-Flask #

Boilerplate application for a Flask JWT Backend and a React/Redux Front-End with Material UI.

* Python 2.7+ or 3.x
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

or

$ export DATABASE_URL="mysql+mysqlconnector://localhost/yourdb"

or

$ export DATABASE_URL="sqlite:///your.db"

$ python manage.py create_db
$ python manage.py db upgrade
$ python manage.py db migrate
```

To update database after creating new migrations, use:

```sh
$ python manage.py db upgrade
```

### Install Front-End Requirements
```sh
$ cd static
$ npm install
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
###### SHIIIIIT for db:

`rm -rf chativism.db` // drops db
`rm -rf migrations`
`python manage.py db init`
`python manage.py create_db`
`python manage.py db upgrade`

`python seed_issues.py`

start the server and hit this:
`http://localhost:3000/api/issues?address=1864+fell+st+san+francisco`

now you can hit `/api/issues` and you'll get the full list of issues w/ reps populated. if you want any other issues / reps from other areas, go back to the query.

But THEN if you go back to `/api/issues`, itll load ALL issues for ALL addresses that you've used.
