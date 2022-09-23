import pandas as pd
import tensorflow as tf
from tensorflow import keras
import numpy as np
import pickle
import warnings
warnings.filterwarnings("ignore")
import lime
from lime import lime_tabular
import dill
import matplotlib.pyplot as plt
import uuid

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class cust_Process():
    def __init__(self, age, headache, dementia, motor, midline, qol, size):
        self.age = age
        self.headache = headache
        self.dementia = dementia
        self.motor = motor
        self.midline = midline
        self.qol = qol
        self.size = size
       
        #Load the final_model Folder
        self.model = keras.models.load_model(os.path.join(BASE_DIR, 'neurology/static/source/final_model'))
        #Load the scaler.sav from static root
        self.scaler = pickle.load(open(os.path.join(BASE_DIR, 'neurology/static/source/scaler.sav'), 'rb'))
        #Load the LIME explainer from static root
        with open(os.path.join(BASE_DIR, 'neurology/static/source/LIME_explainer'), 'rb') as f:     
            self.explainer = dill.load(f) 

    #Define the function that performs the prediction
    def model_prediction (self):
    
        # Store the input parameters
        userinput_age = self.age
        userinput_headache = self.headache
        userinput_dementia = self.dementia
        userinput_motor = self.motor
        userinput_midline = self.midline
        userinput_size = self.size
        userinput_qol = self.qol
    
        # Normalize the "Age" input parameter
        userinput_age = np.reshape(userinput_age, (1,-1))
        test_scaled_set = self.scaler.transform(userinput_age) # This is the problem line...
        
        # Creat the final input array
        test = [test_scaled_set, userinput_headache, userinput_dementia, userinput_motor, userinput_midline, userinput_size, userinput_qol]
        finalArray = np.asarray(test, dtype = np.float64, order ='C')

        henry = np.transpose(finalArray)
        test= pd.DataFrame(data = henry, index=['age','headache' ,'dementia','Motor weakness', 'midline shift', 'CSDH size','Pre-morbid QoL']) 
        test = test.T
        
        #Predict the output
        prediction = self.model.predict(test)
        
        return prediction, test # Main the Visual Lime Flow 

    def output(self):
        #Call the function to generate the output

        #age, dementia, headache, dementia, motor, midline, size, qol are the input parameters defined by the user
        final_prediction, test = self.model_prediction()

        #Print probability of the output
        final_prediction = final_prediction.flatten()
        final_prediction = final_prediction*100
        final_prediction = '%.3f' % final_prediction
        #print(f"P (Acceptance) = {str(final_prediction).replace('[', '').replace(']', '')}%") #Output 1
        probability_output = f"P (Acceptance) = {str(final_prediction).replace('[', '').replace(']', '')}%"

        #Print prediction
        if float(final_prediction) > 50:
            #print("Accepted")  #Output 2
            prediction_result = 'Accepted'
        else:
            #print("Rejected")  #Output 2
            prediction_result = 'Rejected'
        
        #Generate the LIME explanation
        finalArray = test.to_numpy().flatten()
        finalArray = np.transpose(finalArray)

        explain = self.explainer.explain_instance(finalArray, self.model.predict,top_labels=1)
        #print(uuid.uuid1())
        # plt.gcf().subplots_adjust(bottom=0.15)
        # plt.subplots_adjust(bottom=0.15)
        with plt.style.context("ggplot"):
            lime_output = explain.as_pyplot_figure(label = 0) #Output 3
            lime_output.savefig(os.path.join(BASE_DIR, 'neurology/static/output.png'),dpi=100, bbox_inches='tight')

        return [probability_output, prediction_result, lime_output] 
