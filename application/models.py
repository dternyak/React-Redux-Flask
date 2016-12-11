from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import relationship

from index import db, bcrypt


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    zipcode = db.Column(db.String(5))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Issue(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255))
    summary = db.Column(db.String(255))
    level = db.Column(db.String(32))
    role = db.Column(db.String(32))
    code = db.Column(db.String(32))
    due_date = db.Column(db.Date)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Rep(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    full_name = db.Column(db.String(255), unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    party = db.Column(db.String(255))
    level = db.Column(db.String(255))
    role = db.Column(db.String(255))
    office = db.Column(db.String(255))
    phones = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    zipcodes = relationship("Zipcode", back_populates="rep")

    def __repr__(self):
        return self.full_name

    @classmethod
    def get_or_create(cls, defaults=None, **kwargs):
        rep = cls.query.filter_by(**kwargs).first()
        if rep:
            return rep, False
        kwargs.update(defaults or {})
        rep = cls(**kwargs)
        db.session.add(rep)
        db.session.commit()
        return rep, True


    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Zipcode(db.Model):
    __tablename__ = 'zipcode'
    zipcode = db.Column(db.String(5), primary_key=True)
    rep_id = db.Column(db.Integer, db.ForeignKey('rep.id'), primary_key=True)
    rep = relationship("Rep", back_populates="zipcodes")

    def __repr__(self):
        return self.zipcode, rep.full_name
