from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/get_distritos_names', methods=['GET'])
def get_distritos_names():
    response = jsonify({
        'distritos': util.get_distritos_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_barrios_names', methods=['GET'])
def get_barrios_names():
    response = jsonify({
        'barrios': util.get_barrios_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_rent_price', methods=['GET', 'POST'])
def predict_rent_price():
    print("Solicitud recibida", request.form)
    distritos = request.form.get('distritos')
    barrios = request.form.get('barrios')
    superficie = int(request.form.get('superficie'))
    banyos = int(request.form.get('banyos'))
    habitaciones = int(request.form.get('habitaciones'))
    

    response = jsonify({
        'estimated_price': util.get_predict_rent_price(distritos, barrios, superficie, banyos, habitaciones)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server para la predicción del precio de alquiler en la ciudad de Barcelona 2023...")
    util.load_saved_artifacts()
    app.run()