import pandas as pd
from app.services import ml_service, recommendation_service

path = r'd:\3rd year\term 3\ML\Project\digital_wellness_project\data\Digital_Wellness_Dataset_200_Records.csv'
df = pd.read_csv(path)
ml_service.set_uploaded_dataframe(df)

# bulk predict
results = ml_service.predict_dataframe(df.copy(), persist=False)
annotated = ml_service.annotate_results(results)
print('total annotated', len(annotated))
print('example', annotated[0])

# search attempt
matches = df[df['Age'] == 30]
print('matches by age 30', len(matches))
search_preds = ml_service.predict_dataframe(matches, persist=False)
print('search results example', search_preds[0])

# recommendation example
print('recommendations for first record', recommendation_service.generate_recommendations(annotated[0]))
