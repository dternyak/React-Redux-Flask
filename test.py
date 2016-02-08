import unittest
import coverage
import os


def main():
    cov = coverage.coverage(branch=True, include='application/*')
    cov.start()
    tests = unittest.TestLoader().discover('tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    cov.stop()
    cov.save()
    print('Coverage Summary:')
    cov.report()
    basedir = os.path.abspath(os.path.dirname(__file__))
    covdir = os.path.join(basedir, 'tmp/coverage')
    cov.html_report(directory=covdir)
    print('HTML version: file://%s/index.html' % covdir)
    cov.erase()
    try:
        os.remove(os.path.join(basedir, 'tests/dev.sqlite'))

    except OSError:
        pass

    if result.wasSuccessful():
        return 0
    else:
        return 1


if __name__ == '__main__':
    main()
