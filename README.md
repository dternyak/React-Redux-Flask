# React-Redux-Flask #

Boilerplate application for a Flask JWT Backend and a React/Redux Front-End with Material UI. 

<img src="https://imgur.com/ZIS4qkw"/>

* Python 2.7
* Heroku
* Flask
* React
* Redux


### Create DB
```sh
$ export DATABASE_URL="postgresql://localhost/yourdb"
$ python manage.py create_db
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```

### Run Back-End

```sh
$ python manage.py runserver
```

### Test Back-End

```sh
$ python test.py
```

### Run Front-End

```sh
$ cd static
$ npm install
$ npm start
```