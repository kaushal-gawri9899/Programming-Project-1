import logging
import os
import re
import subprocess

import pandas
import yaml

from src import convertPDFtoText

CONFS = None

ALL_EXTENSIONS = {'.csv', '.doc', '.docx', '.eml', '.epub', '.gif', '.htm', '.html', '.jpeg', '.jpg', '.json',
                        '.log', '.mp3', '.msg', '.odt', '.ogg', '.pdf', '.png', '.pptx', '.ps', '.psv', '.rtf', '.tff',
                        '.tif', '.tiff', '.tsv', '.txt', '.wav', '.xls', '.xlsx'}


def load_confs(confs_path='../confs/config.yaml'):
    global CONFS

    if CONFS is None:
        try:
            CONFS = yaml.load(open(confs_path))
        except IOError:
            temp_path = confs_path + '.template'
            logging.warn('Confs path: {} does not exist. Using template instead, '
                        'from path : {}'.format(confs_path,temp_path))
            CONFS = yaml.load(open(temp_path))

    return CONFS


def get_conf(cName):
    return load_confs()[cName]


def create_datasets(name, curr_dict, parent_dict):
    """
    Create the dataset schema for all the pandas dataframes
    @params
    name : Name of current operation(extract,transform, model or load)
    curr_dict : Dictionary containing mappings from variable to objects on local level
    parent_dict : Dictionary containing mappings from variable to objects on global level
    """
    logging.info('Creating data set schema for name: {}'.format(name))

    #References
    data_set_dir = get_conf('data_set_dir')
    #Create the csv file using the data_set_dir
    data_set_path = os.path.join(data_set_dir, name + '.csv')
    schema_list = list()

    #Create the environment variables and add our dictionaries
    env_vars = dict()
    env_vars.update(curr_dict)
    env_vars.update(parent_dict)

    #Create and filter down our pandas dataframes
    #The lambda functions with the filter() function will check if the type is similar to that of dataframes in pandas for the input list env_vars
    data_sets = filter(lambda x: type(x[1]) == pandas.DataFrame, env_vars.items())
    data_sets = dict(data_sets)

    #We will be appending our schema list for multiple entries for our pandas dataframe
    for (ds_name, ds) in data_sets.items():
        #We will now extract all the attributes name from our data_sets dict which is now similar to pandas.DataFrame
        logging.info('Current dataset: {}'.format(ds_name))

        curr_df = pandas.DataFrame(ds.dtypes, columns=['type'])
        curr_df['ds'] = ds_name

        schema_list.append(curr_df)

    #Now we can aggregate our schema_list to a single data frame
    final_dataframe = pandas.concat(schema_list)

    #Now we can write this to our csv file using the final_dataframe
    final_dataframe.to_csv(data_set_path, index_label='variable')

def convertToPDF(curr_file):

    output_file = os.path.basename(os.path.splittext(curr_file)[0]) + '.txt'
    output_filepath = os.path.join('..','datasets','outputs',output_file)
    logging.info('File Writing from {} to {}'.format(curr_file, output_filepath))


    #Now we should convert pdf to text placed in the output_filepath
    convertPDFtoText.main(args=[curr_file, '--outfile', output_filepath])

    return open(output_filepath).read()

def getTermInString(search_string, term):
    """
    Function to count the number of terms in the search_string
    """
    try:
        expression = re.compile(term, re.IGNORECASE)
        count_str = re.findall(expression, search_string)
        count = len(count_str)
        return count
    except Exception:
        logging.error('Search cannot be completed')
        return 0


def getTermMatch(search_string, term):
    """
    Function that returns the first match to our pattern mentioned above in the search_string
    """
    try:
        expression = re.compile(term, re.IGNORECASE)
        match_str = re.findall(expression, search_string)

        if len(match_str) > 0:
            return match_str[0]
        else:
            return None
    except Exception:
        logging.error('Search cannot be completed')
        return None











