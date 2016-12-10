from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403

@app.route("/api/issues", methods=["GET"])
def get_issues():
    nancy = {
        'first_name': 'Nancy',
        'last_name': 'Pelosi',
        'image_url': 'http://lorempixel.com/400/200/',
        'phones': ['415-900-7272', '(415) 723-9444'],
        'party': 'Democrat',
        'level': 'Maybe senate?',
        'role': 'Very important person',
    }
    scott = {
        'first_name': 'Scott',
        'last_name': 'Weiner',
        'image_url': 'http://lorempixel.com/400/200/',
        'phones': ['415-866-7711', '415.123.1234'],
        'party': 'Democrat',
        'level': 'Another political level',
        'role': 'A political role',
    }
    issues = [
        {
            'description': 'This is an issue for real',
            'position_for': 'For position:\nOne bullet point\nVery persuasive',
            'position_against': 'I\'m against this, here\'s why. Nonsense...',
            'due_date': '2017-01-03 00:00:00',
            'representatives': [nancy,],
        }, {
            'description': 'Stop climate change believers',
            'position_for': 'Climate change is a hoax from China, everyone knows that',
            'position_against': 'It\'s science, this issue is a hoax.\nFacts, etc.',
            'due_date': '2017-12-28 00:00:00',
            'representatives': [scott,],
        }
    ]
    return jsonify(result=issues)
