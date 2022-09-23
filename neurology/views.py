import os
from pathlib import Path

from django.http import HttpResponse
from django.shortcuts import render

from .mprocess import cust_Process

BASE_DIR = Path(__file__).resolve().parent.parent

# Create your views here.
def index(request):
   indexSeo = [
    { 'seotitle': 'Home :: Neurology' }
   ]
   return render(request, 'index.html', {
    'indexSeo': indexSeo
   })
   #return HttpResponse('hello world')

def anchor(request):
   if request.method == 'POST':
      age = request.POST['Age']
      headache = request.POST['Headache']
      dementia = request.POST['Dementia']
      motor_weakness = request.POST['Motor_Weakness']
      csdh_size = request.POST['CSDH_size']
      midline_shift = request.POST['Midline_Shift']
      qol = request.POST['QoL']

      #test print
      #print(age, "\t", headache, "\t", dementia, "\t", motor_weakness, "\t", csdh_size, "\t", qol)

      process = cust_Process(age,headache, dementia, motor_weakness, midline_shift, qol, csdh_size)
      
      result_list = process.output()
      probability_output = result_list[0]
      prediction_result  = result_list[1]
      lime_output        = result_list[2]

      indexSeo = [
         { 'seotitle': 'Neural Analysis Model' }
      ]

      # print(lime_output)
      # context = {'output':output}
      return render(request, 'anchor.html', {'probability':probability_output, 'prediction':prediction_result, 'lime':lime_output, 'seotitle': indexSeo})

   else:
      indexSeo = [
         { 'seotitle': 'Neural Analysis Model' }
      ]
      
      return render(request, 'anchor.html', {
         'indexSeo': indexSeo
      })
