import pandas as pd
import numpy as np
import tensorflow as tf
from googleapiclient.http import MediaFileUpload
from Google import Create_Service
from flask import Flask, request, jsonify

# import model
modelPath = "akumau-model.h5"
model = tf.keras.models.load_model(modelPath)

def importDataset(url):
    url = url
    filename = url.rsplit('/', 1)[-1]
    df = pd.read_csv(url)
    if (df.shape[1]==10):
        x_train = df.iloc[:,0:9].copy()
        x_test = df.iloc[:,7:9].copy()
    elif (df.shape[1]==8):
        x_train = df.iloc[:,0:7].copy()
        x_test = df.iloc[:,5:7].copy()
        
    return x_train,x_test,filename

def do_predict(model,fileData):
    x_test = fileData[1]
    x_pred = model.predict(x_test)
    x_pred = np.argmax(x_pred, axis=1)
    
    return x_pred

def saveDataset(predicted,filedata): 
    updated_dataset,x_test,filename = filedata
    updated_dataset['kategori_soal'] = predicted
    kategori_mapping = {0:1, 1:2, 2:3}
    updated_dataset['kategori_soal'] = updated_dataset['kategori_soal'].map(kategori_mapping)
    updated_dataset.to_csv(f'dataset/{filename}.csv', index=False)
    
def uploadDataset():
    CLIENT_SECRET_FILE = 'google_api.json'
    API_NAME = 'drive'
    API_VERSION = 'v3'
    SCOPES = ['https://www.googleapis.com/auth/drive']

    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
    folder_id = '1xUHtOt_JeEKWZz1Bpk47BQ-qN3yNHiPw'
    file_names = ['le.csv','li.csv','pbm.csv','pk.csv','pm.csv','pu.csv','ppu.csv']
    mime_types = ['text/csv','text/csv','text/csv','text/csv','text/csv','text/csv','text/csv']

    for file_name, mime_type in zip(file_names,mime_types):
        file_metadata = {
            'name' : file_name,
            'parents' : [folder_id]
        }
        media = MediaFileUpload('./dataset/{0}'.format(file_name), mimetype=mime_type)
        
        service.files().create(
            body=file_metadata,
            media_body = media,
            fields='id'
        ).execute()
    
    
'''
penalaran umum: https://akumau-capstoneproject.uc.r.appspot.com/latihan/pu
penalaran matematika : https://akumau-capstoneproject.uc.r.appspot.com/latihan/pm
pengetahuan kuantitatif: https://akumau-capstoneproject.uc.r.appspot.com/latihan/pk
literasi indonesia: https://akumau-capstoneproject.uc.r.appspot.com/latihan/li
literasi inggris: https://akumau-capstoneproject.uc.r.appspot.com/latihan/le
pengetahuan pemahaman umum: https://akumau-capstoneproject.uc.r.appspot.com/latihan/ppu
pemahaman bacaan menulis: https://akumau-capstoneproject.uc.r.appspot.com/latihan/pbm
'''   

app = Flask(__name__)

@app.route("/",methods=["GET,POST"])
def index():
    if request.method == "POST":
        try:
            #import dataset from api
            lidata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/li")
            ledata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/le")
            pbmdata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/pbm")
            pkdata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/pk")
            pmdata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/pm")
            ppudata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/ppu")
            pudata = importDataset("https://akumau-capstoneproject.uc.r.appspot.com/latihan/pu")

            # predict dataset
            lipred = do_predict(model,lidata)
            lepred = do_predict(model,ledata)
            pbmpred = do_predict(model,pbmdata)
            pkpred = do_predict(model,pkdata)
            pmpred = do_predict(model,pmdata)
            ppupred = do_predict(model,ppudata)
            pupred = do_predict(model,pudata)
            
            # save the new dataset
            saveDataset(lipred,lidata)
            saveDataset(lepred,ledata)
            saveDataset(pbmpred,pbmdata)
            saveDataset(pkpred,pkdata)
            saveDataset(pmpred,pmdata)
            saveDataset(ppupred,ppudata)
            saveDataset(pupred,pudata)
            
            # Upload Datasets
            uploadDataset()
            linkDataset = {"Dataset Berhasil Diperbarui : https://bit.ly/UpdatedDatasets"}
            return linkDataset
        except Exception as e:
            return jsonify({"error": str(e)})        
    return "OK"
    
if __name__ == "__main__":
    app.run(debug=True)
