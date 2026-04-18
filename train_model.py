"""
Digital Wellness Risk Analysis - Model Training Script
Trains machine learning models on the Digital Wellness Dataset
Includes BMI calculation and feature engineering
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                             f1_score, confusion_matrix, classification_report)
import joblib
import os
import warnings
warnings.filterwarnings('ignore')

# Set style for visualizations
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)

# ============================================================================
# CONFIGURATION & PATHS
# ============================================================================
print("=" * 70)
print("DIGITAL WELLNESS RISK ANALYSIS - MODEL TRAINING")
print("=" * 70)

script_dir = os.path.dirname(os.path.abspath(__file__))  # model directory
project_root = os.path.dirname(script_dir)  # digital_wellness_project directory
data_path = os.path.join(project_root, 'data', 'Digital_Wellness_Dataset_200_Records.csv')

FEATURE_NAMES = [
    'Age', 'Height_in_Feet', 'Weight_in_Kg', 'BMI', 'Screen_Time_Hours', 'Sleep_Hours', 'Work_Hours_Per_Day',
    'Physical_Activity_Hours_Per_Week', 'Stress_Level_1_to_10',
    'Caffeine_Cups_Per_Day', 'Fast_Food_Per_Week', 'Social_Interaction_Hours_Per_Week'
]

# ============================================================================
# STEP 1: LOAD AND EXPLORE DATA
# ============================================================================
print("\n[STEP 1] Loading Dataset...")
print("-" * 70)

df = pd.read_csv(data_path)
print(f"✓ Dataset loaded: {df.shape[0]} records × {df.shape[1]} columns")
print(f"  Columns: {list(df.columns)}")
print(f"\n[Dataset Info]")
print(f"  Missing values: {df.isnull().sum().sum()}")
print(f"  Target distribution:\n{df['Mental_Health_Risk'].value_counts()}")

# ============================================================================
# STEP 2: FEATURE ENGINEERING - BMI CALCULATION
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 2] Feature Engineering - BMI Calculation")
print("-" * 70)

# Validate required columns
required_cols = ['Age', 'Height_in_Feet', 'Weight_in_Kg', 'Mental_Health_Risk']
for col in required_cols:
    if col not in df.columns:
        raise ValueError(f"Required column '{col}' not found!")

# Calculate BMI: BMI = weight(kg) / (height_in_meters)^2
# 1 foot = 0.3048 meters
print("Calculating BMI...")
df['BMI'] = df['Weight_in_Kg'] / ((df['Height_in_Feet'] * 0.3048) ** 2)

print(f"✓ BMI calculated for all {len(df)} records")
print(f"  BMI Range: {df['BMI'].min():.2f} - {df['BMI'].max():.2f}")
print(f"  BMI Mean: {df['BMI'].mean():.2f} ± {df['BMI'].std():.2f}")

# BMI Categories
def get_bmi_category(bmi):
    if bmi < 18.5:
        return 'Underweight'
    elif bmi < 25:
        return 'Normal'
    elif bmi < 30:
        return 'Overweight'
    else:
        return 'Obese'

df['BMI_Category'] = df['BMI'].apply(get_bmi_category)
print(f"\n[BMI Category Distribution]")
print(df['BMI_Category'].value_counts())

# Handle missing values
df = df.dropna()
print(f"\n✓ Missing values handled: {len(df)} records")

# Filter for software professionals aged 30+
original_count = len(df)
df = df[df['Age'] >= 30]
print(f"✓ Filtered for Age >= 30: {original_count} → {len(df)} records")

# ============================================================================
# STEP 3: DATA PREPARATION
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 3] Data Preparation")
print("-" * 70)

X = df[FEATURE_NAMES]
y = df['Mental_Health_Risk']

print(f"Features shape: {X.shape}")
print(f"Features: {list(X.columns)}")
print(f"Target shape: {y.shape}")

# Encode target variable
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

print(f"\n[Class Mapping]")
for class_name, encoded_value in zip(label_encoder.classes_, range(len(label_encoder.classes_))):
    print(f"  {class_name}: {encoded_value}")

# ============================================================================
# STEP 4: TRAIN-TEST SPLIT
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 4] Train-Test Split (80-20 with Stratification)")
print("-" * 70)

X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

print(f"✓ Training set: {X_train.shape[0]} samples")
print(f"✓ Test set: {X_test.shape[0]} samples")

# Initialize and fit scaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"\n✓ Features standardized using StandardScaler")

# ============================================================================
# STEP 5: TRAIN MODELS
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 5] Training Machine Learning Models")
print("-" * 70)

# Model 1: Logistic Regression
print("\n[Logistic Regression]")
lr_model = LogisticRegression(max_iter=1000, random_state=42, multi_class='multinomial')
lr_model.fit(X_train_scaled, y_train)
lr_y_pred = lr_model.predict(X_test_scaled)
print("✓ Training complete")

# Model 2: Random Forest
print("\n[Random Forest]")
rf_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=15)
rf_model.fit(X_train_scaled, y_train)
rf_y_pred = rf_model.predict(X_test_scaled)
print("✓ Training complete")

# ============================================================================
# STEP 6: EVALUATE MODELS
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 6] Model Evaluation")
print("-" * 70)

def evaluate_model(y_true, y_pred, model_name):
    """Calculate metrics"""
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_true, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_true, y_pred, average='weighted', zero_division=0)
    
    print(f"\n[{model_name}]")
    print(f"  Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
    print(f"  Precision: {precision:.4f}")
    print(f"  Recall:    {recall:.4f}")
    print(f"  F1-Score:  {f1:.4f}")
    
    return {'model': model_name, 'accuracy': accuracy, 'precision': precision, 
            'recall': recall, 'f1': f1}

lr_metrics = evaluate_model(y_test, lr_y_pred, "Logistic Regression")
rf_metrics = evaluate_model(y_test, rf_y_pred, "Random Forest")

# ============================================================================
# STEP 7: CONFUSION MATRICES & CLASSIFICATION REPORTS
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 7] Confusion Matrices & Classification Reports")
print("-" * 70)

print("\n[Logistic Regression - Confusion Matrix]")
print(confusion_matrix(y_test, lr_y_pred))

print("\n[Random Forest - Confusion Matrix]")
print(confusion_matrix(y_test, rf_y_pred))

print("\n[Random Forest - Classification Report]")
print(classification_report(y_test, rf_y_pred, target_names=label_encoder.classes_))

# ============================================================================
# STEP 8: SELECT BEST MODEL
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 8] Best Model Selection")
print("-" * 70)

models_comparison = [lr_metrics, rf_metrics]
best_model_info = max(models_comparison, key=lambda x: x['accuracy'])

print(f"\n{'Model':<25} {'Accuracy':<12} {'Precision':<12} {'Recall':<12} {'F1-Score':<12}")
print("-" * 75)
for info in models_comparison:
    print(f"{info['model']:<25} {info['accuracy']:<12.4f} {info['precision']:<12.4f} "
          f"{info['recall']:<12.4f} {info['f1']:<12.4f}")

best_model = rf_model if best_model_info['model'] == "Random Forest" else lr_model
print(f"\n✓ Best Model: {best_model_info['model']}")
print(f"  Accuracy: {best_model_info['accuracy']:.4f}")

# ============================================================================
# STEP 9: FEATURE IMPORTANCE
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 9] Feature Importance Analysis")
print("-" * 70)

feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop Features:")
for idx, row in feature_importance.head(8).iterrows():
    print(f"  {row['feature']:<35} {row['importance']:.4f}")

# Visualization
plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance.head(10), x='importance', y='feature', palette='viridis')
plt.title('Top 10 Feature Importance - Random Forest', fontsize=14, fontweight='bold')
plt.xlabel('Importance Score')
plt.ylabel('Feature')
plt.tight_layout()
plt.savefig(os.path.join(script_dir, 'feature_importance.png'), dpi=300, bbox_inches='tight')
print("\n✓ Feature importance plot saved")

# ============================================================================
# STEP 10: VISUALIZATION - CONFUSION MATRIX
# ============================================================================
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, rf_y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=label_encoder.classes_,
            yticklabels=label_encoder.classes_,
            cbar_kws={'label': 'Count'})
plt.title('Confusion Matrix - Random Forest', fontsize=14, fontweight='bold')
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.tight_layout()
plt.savefig(os.path.join(script_dir, 'confusion_matrix.png'), dpi=300, bbox_inches='tight')
print("✓ Confusion matrix plot saved")

# ============================================================================
# STEP 11: SAVE MODEL ARTIFACTS
# ============================================================================
print("\n" + "=" * 70)
print("[STEP 11] Saving Model Artifacts")
print("-" * 70)

model_path = os.path.join(script_dir, 'model.pkl')
scaler_path = os.path.join(script_dir, 'scaler.pkl')
label_encoder_path = os.path.join(script_dir, 'label_encoder.pkl')

joblib.dump(best_model, model_path)
joblib.dump(scaler, scaler_path)
joblib.dump(label_encoder, label_encoder_path)

print(f"✓ Model saved: {model_path}")
print(f"✓ Scaler saved: {scaler_path}")
print(f"✓ Label Encoder saved: {label_encoder_path}")

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print("\n" + "=" * 70)
print("✓ TRAINING COMPLETED SUCCESSFULLY!")
print("=" * 70)
print(f"\nModel Summary:")
print(f"  Selected: Random Forest Classifier")
print(f"  Test Accuracy: {best_model_info['accuracy']:.4f} ({best_model_info['accuracy']*100:.2f}%)")
print(f"  Test Samples: {X_test.shape[0]}")
print(f"  Training Samples: {X_train.shape[0]}")
print(f"  Features: {len(FEATURE_NAMES)}")
print(f"\nNext Step:")
print(f"  Run: python app.py")
print(f"  Then open: http://localhost:5000")
print("=" * 70 + "\n")

