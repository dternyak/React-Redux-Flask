import json
import requests

from sqlalchemy.exc import IntegrityError

from index import app, db
from ..models import Rep, Zipcode

def get_reps(address):
    url = 'https://www.googleapis.com/civicinfo/v2/representatives'
    params = {
        'address': address,
        'key': app.config['CIVIC_API_KEY'],
    }
    res = requests.get(url, params=params)
    res = json.loads(res.content)

    city = res['normalizedInput']['city']
    state = res['normalizedInput']['state']
    zipcode = res['normalizedInput']['zip']
    offices = res['offices']
    officials = res['officials']
    reps = []

    for office in offices:
        if not office.get('levels'):
            continue
        level = office['levels'][0]

        if not office.get('roles'):
            continue
        role = office['roles'][0]

        if level not in ['country', 'administrativeArea1']:
            # Don't care
            continue
        if role not in ['legislatorLowerBody', 'legislatorUpperBody']:
            # Don't care
            continue
        
        official_ids = office['officialIndices']
        for i in official_ids:
            official = officials[i]
            first_name, last_name = official['name'].split(' ')[0], official['name'].split(' ')[-1]
            rep, new = Rep.get_or_create(full_name=official['name'], defaults={
                'first_name': first_name,
                'last_name': last_name,
                'party': official['party'],
                'phones': ','.join(official.get('phones', '')),
                'office': office['name'],
                'level': level,
                'role': role,
                'image_url': official['photoUrl'],
            })
            if not new:
                print 'already have rep', rep
            else:
                print 'added rep', rep
            reps.append(rep)
            try:
                zip = Zipcode(zipcode=zipcode, rep=rep)
                db.session.add(zip)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print 'skipping duplicate rep-zipcode', rep, zipcode
                continue

    return reps, city, state, zipcode
