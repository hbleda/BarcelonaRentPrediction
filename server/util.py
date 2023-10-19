import pickle
import json
import numpy as np

import os

CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
FILE_PATH_COLUMNS = os.path.join(CURRENT_DIRECTORY, "artifacts", "columns.json")
FILE_PATH_MODEL = os.path.join(CURRENT_DIRECTORY, "artifacts", "barcelona_home_prices_model.pickle")

__barrios = None
__distritos = None
__data_columns = None
__model = None

def get_predict_rent_price(distritos, barrios, superficie, banyos, habitaciones):
    try:
        loc_index_distrito = __data_columns.index(distritos)
    except:
        loc_index_distrito = -1

    try:
        loc_index_barrio = __data_columns.index(barrios)
    except:
        loc_index_barrio = -1

    x = np.zeros(len(__data_columns))
    x[0] = superficie
    x[1] = banyos
    x[2] = habitaciones
    
    if loc_index_distrito >= 0:
        x[loc_index_distrito] = 1
    if loc_index_barrio >= 0:
        x[loc_index_barrio] = 1

    return round(__model.predict([x])[0],0)



def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __distritos
    global __barrios


    with open(FILE_PATH_COLUMNS, "r",encoding='utf-8') as f:
        __data_columns = json.load(f)['data_columns']
        __barrios = __data_columns[3:48]  # first 3 columns are sqft, bath, bhk
        __distritos = __data_columns[49:]  # first 3 columns are sqft, bath, bhk


    global __model
    if __model is None:
        with open(FILE_PATH_MODEL, 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_distritos_names():
    return __distritos

def get_barrios_names():
    return __barrios

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_barrios_names())
    print(get_distritos_names())
    print(get_predict_rent_price('Horta-Guinardó','la Font d\'en Fargues',17, 1, 0))
    print(get_predict_rent_price('Sant Andreu','Navas',80, 1, 3))
    print(get_predict_rent_price('Sant Martí','el Clot',44, 1, 2)) 
   