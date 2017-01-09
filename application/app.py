import string

from flask import request, render_template, jsonify, url_for, redirect, g
from sqlalchemy.exc import IntegrityError

from .models import User, Rep, Issue
from index import app, db
from .utils.auth import generate_token, requires_auth, verify_token
from .utils import civic_api


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


@app.route("/api/user/<id>", methods=["POST"])
def update_user(id):
    incoming = request.json
    user = User.query.get(id)
    for k, v in incoming.items():
        setattr(user, k, v)
    db.session.add(user)
    db.session.commit()
    return jsonify(result=user.to_dict())


@app.route("/api/user/new", methods=["POST"])
def create_user():
    incoming = request.json
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    if incoming.get('zipcode'):
        zipcode = [x for x in incoming['zipcode'] if x in string.digits]
        if len(zipcode) != 5:
            return jsonify(message="That's not a valid zipcode")
        user.zipcode = zipcode
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    user = User.query.filter_by(email=incoming["email"]).first()
    res = {
        'id': user.id,
        'token': generate_token(user),
    }

    if user.zipcode:
        reps, city, state, zipcode = civic_api.get_reps(user.zipcode)
        res['city'] = city
        res['state'] = state
        res['zipcode'] = zipcode

    return jsonify(res)


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
    reps = []
    zipcode = None
    address = request.values.get('address')
    if address:
        reps, city, state, zipcode = civic_api.get_reps(address)

    if zipcode:
        reps = Rep.get_by_zipcode(zipcode)

    issues = [i.to_dict() for i in Issue.query.order_by(Issue.due_date.desc()).all()]
    if reps:
        for issue in issues:
            issue['representatives'] = []
            for rep in reps:
                if rep.level == issue['level'] and rep.role == issue['role']:
                    issue['representatives'].append(rep.to_dict())
            if not issue['representatives']:
                print 'Couldn\'t find a rep for Issue {} {}/{}{}'.format(issue['id'], issue['level'], issue['role'], ' in {}'.format(zipcode) if zipcode else '')

    return jsonify(result=issues)
