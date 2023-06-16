import pandas as pd
import numpy as np
import tensorflow as tf
from sqlalchemy import create_engine
from io import StringIO
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# import model
modelPath = "akumau-model.h5"
model = tf.keras.models.load_model(modelPath)

def conn_db():
    # Mengatur koneksi ke Cloud SQL
    config = {
        'user': 'test',
        'password': 'cobacoba',
        'host': '34.30.21.131',
        'database': 'db-soal'
    }        
    # Membuat URL koneksi
    db_url = f"mysql+mysqlconnector://{config['user']}:{config['password']}@{config['host']}/{config['database']}"
    # Membuat koneksi menggunakan create_engine
    engine = create_engine(db_url)
    return engine

def importDataset(namaTabel, conn=conn_db()):
    engine = conn
     # Query untuk mendapatkan semua baris dan kolom dari tabel
    query = f'SELECT * FROM {namaTabel}'
    result = engine.execute(query)
    # Mendapatkan nama-nama kolom dari hasil query
    column_names = result.keys()
    # Membuat dataframe dari hasil query dengan nama-nama kolom
    df = pd.DataFrame(result.fetchall(), columns=column_names)
    csv_file = df.to_csv(index=False)
    df = pd.read_csv(StringIO(csv_file))
    if (df.shape[1]==10):
        x_train = df.iloc[:,0:9].copy()
        x_test = df.iloc[:,7:9].copy()
    elif (df.shape[1]==8):
        x_train = df.iloc[:,0:7].copy()
        x_test = df.iloc[:,5:7].copy()
        
    return x_train,x_test
    

def do_predict(fileData,model=model):
    update_dataset, x_test = fileData
    x_test = fileData[1]
    x_pred = model.predict(x_test)
    x_pred = np.argmax(x_pred, axis=1)
    update_dataset['kategori_soal'] = x_pred
    kategori_mapping = {0:1, 1:2, 2:3}
    update_dataset['kategori_soal'] = update_dataset['kategori_soal'].map(kategori_mapping)
    filename = update_dataset.to_csv(index=False)
    return filename
    
def updateDataset(csvfile, namaTabel, conn=conn_db()):
    engine = conn
    # Mengupdate tabel di Cloud SQL
    data = pd.read_csv(StringIO(csvfile))  # Membaca kembali data dari CSV dalam memori
    data.to_sql(namaTabel, con=engine, if_exists='replace', index=False)
    message = f"Data {namaTabel} berhasil di update" 
    return message

app = Flask(__name__)

@app.route("/",methods=["GET","POST"])
def index():
    if request.method == "POST":
        try:
            #import dataset from api
            lidata = importDataset("li")
            ledata = importDataset("le")
            pbmdata = importDataset("pbm")
            pkdata = importDataset("pk")
            pmdata = importDataset("pm")
            ppudata = importDataset("ppu")
            pudata = importDataset("pu")

            # predict dataset
            lipred = do_predict(lidata)
            lepred = do_predict(ledata)
            pbmpred = do_predict(pbmdata)
            pkpred = do_predict(pkdata)
            pmpred = do_predict(pmdata)
            ppupred = do_predict(ppudata)
            pupred = do_predict(pudata)
            
            # Upload Datasets
            message1 = updateDataset(lipred,"li")
            message2 = updateDataset(lepred,"le")
            message3 = updateDataset(pbmpred,"pbm")
            message4 = updateDataset(pkpred,"pk")
            message5 = updateDataset(pmpred,"pm")
            message6= updateDataset(ppupred,"ppu")
            message7 = updateDataset(pupred,"pu")            
            messages = {"Pesan" : [message1,message2,message3,message4,message5,message6,message7]}
            return jsonify(messages)
        except Exception as e:
            return jsonify({"error": str(e)})        
    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
