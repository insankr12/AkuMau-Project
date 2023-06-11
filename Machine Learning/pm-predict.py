import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import tensorflow as tf

# Import dataset
df = pd.read_csv('dataset/data-train.csv')
#rename columns
df.columns = ['idSoal', 'soal','jawaban', 'jawaban_benar', 'materi','jumlahDikerjakan','jumlahBenar','kategori']

#drop unnecessary column
df.drop(['idSoal','jawaban','jawaban_benar','soal','materi'], axis=1, inplace=True)

# Split dataset to data train and data test
X = df.iloc[:,0:2].values
Y = df.iloc[:,2].values

# Encode label (categorical to numerical)
encoder = LabelEncoder()
y1 = encoder.fit_transform(Y)
Y = pd.get_dummies(y1).values

x_train, x_test, y_train, y_test = train_test_split(X,Y, test_size=0.2, random_state=1)

def classification_model():
    # Define the model
     model = tf.keras.models.Sequential([ 
         tf.keras.layers.Dense(6, input_shape = (2,) ,activation='relu'),
         tf.keras.layers.Dense(8, activation ='relu'),
         tf.keras.layers.Dense(3, activation='softmax')
     ])
     # Compile the model
     model.compile(optimizer='adam', 
                   loss='categorical_crossentropy', 
                   metrics=['accuracy'])
        
     return model

epochs = 20
model = classification_model()
# train model
history = model.fit(x_train,y_train,validation_split=0.2,epochs=epochs)

# Predict dataset and create new dataset
filePath = "dataset/penalaran_matematika.csv"
predict_data = pd.read_csv(filePath)
update_dataset = predict_data.iloc[:,0:7].copy()

X_test = predict_data.iloc[:,5:7].values
X_pred = model.predict(X_test)
X_pred = np.argmax(X_pred, axis=1)

update_dataset['kategori'] = X_pred
update_dataset['kategori'] = update_dataset['kategori'].astype('category', copy=False)
kategori_mapping = gender_mapping = {0:"mudah", 1:"sedang", 2:"sulit"}
update_dataset['kategori'] = update_dataset['kategori'].map(kategori_mapping)
# save dataset
update_dataset.to_csv('new dataset/penalaran_matematika.csv', index=False)