import os


from setup import basedir


class BaseConfig(object):
    SECRET_KEY = "SO_SECURE"
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    CIVIC_API_KEY = 'AIzaSyBl6O_1GRJN6V9KzBNEmRWF25f6KgCcRTg'
    PLACES_API_KEY = 'AIzaSyDFlnW_uEpkJ5v-J5C339_8oO7fo_ut39s'
    if os.environ.get("NODE_ENV") == "production":
        import psycopg2
        import urlparse

        urlparse.uses_netloc.append("postgres")
        url = urlparse.urlparse(os.environ["DATABASE_URL"])
        SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}".format(**{
            'user': url.username,
            'password': url.password,
            'host': url.hostname,
            'port': url.port,
            'dbname': url.path[1:],
        })
    else:
        SQLALCHEMY_DATABASE_URI = "sqlite:///chativism.db"


class TestingConfig(object):
    """Development configuration."""
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
