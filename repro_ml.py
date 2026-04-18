import pandas as pd  
from app.services import ml_service, validation_service  
path=r'd:\3rd year\term 3\ML\Project\digital_wellness_project\data\Digital_Wellness_Dataset_200_Records.csv'  
df=pd.read_csv(path)  
print('columns', df.columns.tolist()[:15])  
valid,missing,errors=validation_service.validate_schema(df)  
print('valid', valid, 'missing', missing, 'errors', errors)  
df2=df.copy()  
if errors: df2=validation_service.clean_dataframe(df2)  
try:  
  ml_service.initialize()  
except Exception as e:  
  print('init failed', e)  
print('model', ml_service.model is not None, 'scaler', ml_service.scaler is not None, 'label_encoder', ml_service.label_encoder is not None)  
try:  
  results=ml_service.predict_dataframe(df2,persist=False)  
  print('predict len', len(results), 'example', results[0])  
except Exception as e:  
  import traceback  
  traceback.print_exc()  
