import pandas as pd
import numpy as np
import os

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_path = os.path.join(project_root, 'data', 'Digital_Wellness_Dataset_200_Records.csv')
backup_path = data_path + '.bak'

print('Loading dataset:', data_path)
df = pd.read_csv(data_path)
print('Columns before:', list(df.columns))

if 'Height_in_Feet' in df.columns and 'Weight_in_Kg' in df.columns:
    print('Height and weight columns already present. No change made.')
else:
    # Backup original
    if not os.path.exists(backup_path):
        df.to_csv(backup_path, index=False)
        print('Backup saved to', backup_path)

    n = len(df)
    rng = np.random.default_rng(seed=42)

    # Generate heights in feet (mean ~5.8, sd 0.25)
    heights = rng.normal(loc=5.8, scale=0.25, size=n)
    heights = np.clip(heights, 4.8, 6.6)

    # Generate BMI values (mean ~24, sd 3)
    bmis = rng.normal(loc=24, scale=3, size=n)
    bmis = np.clip(bmis, 16, 35)

    # Compute weights from BMI and height (convert feet to meters)
    heights_m = heights * 0.3048
    weights = bmis * (heights_m ** 2)

    df['Height_in_Feet'] = np.round(heights, 2)
    df['Weight_in_Kg'] = np.round(weights, 1)

    # Reorder columns to include new fields before mental health risk
    cols = list(df.columns)
    # Ensure Height and Weight appear early
    for c in ['Height_in_Feet', 'Weight_in_Kg']:
        if c in cols:
            cols.remove(c)
    # Place after Age if Age exists
    if 'Age' in cols:
        age_idx = cols.index('Age')
        cols.insert(age_idx + 1, 'Height_in_Feet')
        cols.insert(age_idx + 2, 'Weight_in_Kg')

    df = df[cols]

    df.to_csv(data_path, index=False)
    print('Saved augmented dataset with Height_in_Feet and Weight_in_Kg')
    print('Columns after:', list(df.columns))
