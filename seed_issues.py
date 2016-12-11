from datetime import datetime

from index import db
from application.models import Issue, Rep


issues = [
    {
        'title': 'Protecting benefits for retired coal miners',
        'summary': 'Retired coal miners\' benefit plans have become severely underfunded during the industry\'s downturn. A bipartisan group of senators wants to rescue the pension and health benefits for retired union members. Why are people against it? Mitch McConnell is against it. He questions why the bill would protect only members of the United Mine Workers of America, and not un-unionized retirees.',
        'level': 'country',
        'role': 'legislatorUpperBody',
        'code': 'S.1714',
        'due_date': datetime(2016, 12, 13)
    }, {
        'title': 'Ensuring Presidential Accountability and Avoiding Conflicts of Interest',
        'summary': 'Current law prohibits federal office holders from engaging in government business when they stand to gain profit. The President and Vice President are currently exempt from this statute. The Presidential Accountability Act removes this exemption. Previous American presidents including Lyndon Johnson, Jimmy Carter, Ronald Reagan, George H.W. Bush, Bill Clinton, George W. Bush and Barack Obama have all used some form of blind trust or placed their assets in an investment vehicle over which they had no control.',
        'level': 'country',
        'role': 'legislatorLowerBody',
        'code': 'H.R. 6340',
        'due_date': datetime(2016, 12, 17)
    }, {
        'title': 'Increase targets for greenhouse gas emissions',
        'summary': 'SB 32 would require greenhouse gas emissions to be 40% below 1990 levels by 2030, a more aggressive set of mandates than those established by California\'s landmark climate change law, AB 32, enacted in 2006. Existing law set a 2020 target for reducing emissions to 1990 levels. Questions over whether the state\'s programs, including cap and trade, could continue past that deadline led to a scramble for new legislation. The oil industry and some manufacturers have opposed new regulations, but advocates were able to convince enough Democrats and even a handful of Republicans to back the measures.',
        'level': 'administrativeArea1',
        'role': 'legislatorUpperBody',
        'code': 'SB 32',
        'due_date': datetime(2016, 12, 18)
    }, {
        'title': 'Trying to address California\'s lack of affordable housing by allowing more home building',
        'summary': 'AB 2299, AB 2406: These bills would try to make it easier for homeowners to add another housing unit in their backyards or as part of their existing homes. California\'s average home price of roughly $460,000 is more than double the national average and even higher in wealthy coastal communities in the Bay Area and Los Angeles. Many academics and experts blame a lack of supply as the primary driver of rising costs.',
        'level': 'administrativeArea1',
        'role': 'legislatorLowerBody',
        'code': 'AB 2299, AB 2406',
        'due_date': datetime(2016, 12, 15)
    }#, {
    #    'title': 'Dakota Access Pipeline',
    #    'summary': 'The DAPL is a $3.7 billion project that would cross four states and change the landscape of the US crude oil supply. The results could be an economic boon that makes the country more self-sufficient or an environmental disaster that destroys sacred Native American sites. The Army Corps of Engineers announced that protesters must vacate the premises by a December 5th deadline.',
    #    'level': '',
    #    'role': '',
    #    'code': '',
    #    'due_date': datetime(2016, 12, 15)
    #}
]


def seed_issues():
    for issue in issues:
        i = Issue(**issue)
        db.session.add(i)
    db.session.commit()


if __name__ == '__main__':
    seed_issues()
