import os

from setup import basedir


class BaseConfig(object):
    SECRET_KEY = "SO_SECURE"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///chativism.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    CIVIC_API_KEY = 'AIzaSyBl6O_1GRJN6V9KzBNEmRWF25f6KgCcRTg'


class TestingConfig(object):
    """Development configuration."""
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
