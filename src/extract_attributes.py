import logging
from gensim.utils import simple_preprocess

from src import extras

PHONE = r"\(?(\d{3})?\)?[\s\.-]{0,2}?(\d{3})[\s\.-]{0,2}(\d{4})"
EMAIL = r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}"
NAME = r'[a-z]+(\s+[a-z]+)?'

def extract_names(input_name, nlp):

    document = nlp(input_name)

    #Extract All Entities
    doc_entities = document.ents

    #Adding the substes for our PERSON type entities using lambda function
    doc_pname = filter(lambda x: x.label_ == 'PERSON', doc_entities)
    doc_pname = filter(lambda x: len(x.text.strip().split()) >=2, doc_pname)
    doc_pname = map(lambda x: x.text.strip(), doc_pname)
    doc_pname = list(doc_pname)

    #Checking that the first PERSON enity with more than two tokens is the name of person
    if len(doc_pname) > 0:
        return doc_pname[0]
    
    return "NOT_FOUND"



#This will extract the whole resume into one text field
#This could be then used to extract the other information like skills from it
def extract_other_fields(df):
    for e, items in extras.get_conf('extractors').items():
        df[e] = df['text'].apply(lambda x: extract_skills(x,e,items))
    return df


def extract_skills(resume_text, e, items):
    all_skills = dict()
    matched_skills = set()

    for skill in items:
        if type(skill) is list and len(skill) >= 1:
            all_skills[skill[0]] = skill
        
        elif type(skill) is str:
            all_skills[skill] = [skill]

        else:
            logging.warn('Unknown type. Only String or List of String valid'''.format(skill))

    for (skill_name, skill_list) in all_skills.items():

        matched = 0

        for skill in skill_list:
            matched += extras.getTermInString(resume_text, skill.lower())
        
        if matched > 0:
            matched_skills.add(skill_name)
    
    return matched_skills




