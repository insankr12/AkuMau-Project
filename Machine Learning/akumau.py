import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt


import os
import os.path

print(os.path.isfile('dataset/data-train.csv'))


# df = pd.read_csv('dataset/data-train.csv')

# df.head(10)

# df.shape

# df.dtypes

# #rename columns
# df.columns = ['idSoal', 'soal','jawaban', 'jawaban_benar', 'materi','jumlahDikerjakan','jumlahBenar','kategori']

# # Check Missing Values
# df.isnull().sum()

# #Check the balance target
# plt.style.use("ggplot")
# df["kategori"].value_counts().plot(kind="bar", 
#                                   figsize = (8,5), color = "darkviolet")
# plt.title("Frequency of the classes of our Target variable", size=20)
# plt.xlabel("Target Variable", size = 16)
# plt.ylabel("Frequency", size = 16)

# #drop unnecessary column
# df.drop(['idSoal','jawaban','jawaban_benar'], axis=1, inplace=True)

# df.drop(['soal','materi'], axis=1, inplace=True)

# df.head()

# # Split dataset to data train and data test
# X = df.iloc[:,0:2].values
# Y = df.iloc[:,2].values

# encoder = LabelEncoder()
# y1 = encoder.fit_transform(Y)
# Y = pd.get_dummies(y1).values

# x_train, x_test, y_train, y_test = train_test_split(X,Y, test_size=0.2, random_state=1)

# import tensorflow as tf

# def classification_model():
#     # Define the model
#     model = tf.keras.models.Sequential([ 
#         tf.keras.layers.Dense(6, input_shape = (2,) ,activation='relu'),
#         tf.keras.layers.Dense(8, activation ='relu'),
#         tf.keras.layers.Dense(3, activation='softmax')
#     ]) 

#     # Compile the model
#     model.compile(optimizer='adam', 
#                   loss='categorical_crossentropy', 
#                   metrics=['accuracy'])
        
#     return model

# epochs = 20

# model = classification_model()
# model.summary()

# history = model.fit(x_train,y_train,validation_split=0.2,epochs=epochs)

# y_pred = model.predict(x_test)
# y_test_class = np.argmax(y_test, axis=1)
# y_pred_class = np.argmax(y_pred, axis=1)

# # Accuracy score
# from sklearn.metrics import classification_report,r2_score
# print(classification_report(y_test_class, y_pred_class))
# print(f"r2 score: {r2_score(y_test_class, y_pred_class)}")

# """# Predict dataset to create a new dataset"""

# predict_data = pd.read_csv('dataset.csv')

# update_dataset = predict_data.iloc[:,0:7].copy()

# X_test = predict_data.iloc[:,5:7].values

# X_pred = model.predict(X_test)

# X_pred = np.argmax(X_pred, axis=1)

# X_pred

# update_dataset['kategori'] = X_pred

# update_dataset.head()

# update_dataset['kategori'] = update_dataset['kategori'].astype('category', copy=False)

# kategori_mapping = gender_mapping = {0:"mudah", 1:"sedang", 2:"sulit"}
# update_dataset['kategori'] = update_dataset['kategori'].map(kategori_mapping)

# update_dataset.head()

# update_dataset.to_csv('newDataset.csv', index=False)