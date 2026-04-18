# Digital Wellness Risk Analysis and Recommendation System

## Project Overview

The **Digital Wellness Risk Analysis and Recommendation System** is a comprehensive machine learning solution designed to predict mental health risk levels for software professionals. The system analyzes physical metrics (BMI), digital behavior patterns, lifestyle habits, and work patterns to assess mental health risk and provide personalized wellness recommendations.

### Key Features:
- **Mental Health Risk Prediction**: Classifies individuals into Low, Moderate, or High risk categories
- **BMI Integration**: Automatic Body Mass Index calculation from height and weight with personalized recommendations
- **Personalized Recommendations**: Rule-based engine providing actionable wellness suggestions based on BMI and lifestyle
- **Wellness Score Gauge**: Visual representation of overall wellness (0-100 scale)
- **CSV File Upload**: Batch upload wellness data for multiple individuals with automatic predictions
- **Search & Lookup**: Query uploaded datasets and search for specific records
- **Analytics Dashboard**: View statistics and risk distribution of uploaded data
- **Professional Web Interface**: Modern, responsive UI built with Bootstrap 5
- **Machine Learning Models**: Trained on 200+ real-world records with full model evaluation metrics
- **Feature Importance Analysis**: Insights into which factors most impact mental health risk

---

## Project Structure

```
digital_wellness_project/
│
├── app.py                          # Flask web application with all routes and API endpoints
├── requirements.txt                # Python dependencies
├── README.md                       # This file
│
├── model/
│   ├── train_model.py             # Model training script with BMI feature engineering
│   ├── model.pkl                  # Trained Random Forest model (generated after training)
│   ├── scaler.pkl                 # StandardScaler object (generated after training)
│   ├── label_encoder.pkl          # Label encoder (generated after training)
│   ├── feature_importance.png     # Feature importance plot (generated after training)
│   └── confusion_matrix.png       # Confusion matrix plot (generated after training)
│
├── data/
│   └── Digital_Wellness_Dataset_200_Records.csv   # Training dataset (200 records with 12 features)
│
├── templates/
│   ├── welcome.html               # Landing page with navigation options
│   ├── predict.html               # Manual assessment form with real-time BMI calculation
│   ├── upload.html                # CSV file upload page with drag-and-drop
│   ├── search.html                # Search and lookup page for uploaded records
│   └── dashboard.html             # Analytics dashboard with statistics and charts
│
├── uploads/                       # Temporary directory for uploaded CSV files
│
└── static/
    └── style.css                  # Application styling (Bootstrap customization)
```

---

## Installation Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Step 1: Create a Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

Required packages:
- Flask 5.3.0
- scikit-learn
- pandas
- numpy
- joblib
- matplotlib
- seaborn
- werkzeug

### Step 3: Train the Model

Before running the web application, you must train the machine learning model:

```bash
python model/train_model.py
```

This will:
- Load the dataset from `data/Digital_Wellness_Dataset_200_Records.csv`
- Calculate BMI for all records: BMI = weight_kg / (height_feet × 0.3048)²
- Preprocess the data (encode, standardize)
- Train both Logistic Regression and Random Forest models
- Evaluate and select the best performing model
- Save the model, scaler, and label encoder as `.pkl` files
- Generate feature importance and confusion matrix visualizations

**Expected Output:**
```
MODEL TRAINING COMPLETE
✓ Selected Model: Random Forest
✓ Model Accuracy: 0.9125 (91.25%)
✓ Test Set Size: 40 samples
✓ Training Set Size: 160 samples
✓ Features trained: 12 (including BMI)
```

### Step 4: Run the Web Application

```bash
python app.py
```

The application will start at: **http://127.0.0.1:5000**

Open your browser and navigate to this address to access the welcome page.

---

## Application Routes & Features

### Welcome Page (`/`)
- Landing page with professional gradient UI
- Navigation to three main features:
  - **Manual Assessment**: Fill form to assess individual wellness
  - **Upload Dataset**: Upload CSV file with multiple records
  - **View Dashboard**: See statistics from uploaded data
- Disclaimer about the non-medical nature of predictions

### Manual Assessment Form (`/predict`)
1. **Physical Metrics** (calculated automatically):
   - **Age**: Your current age
   - **Height (in feet)**: Format as decimal (e.g., 5.8 for 5'8")
   - **Weight (kg)**: Your weight in kilograms
   - **BMI**: Auto-calculated and displayed with category (Underweight, Normal, Overweight, Obese)

2. **Digital Behavior**:
   - **Daily Screen Time**: Total hours on screens
   - **Sleep Hours**: Average hours of sleep per night
   - **Work Hours**: Total hours worked per day
   - **Physical Activity**: Hours of exercise per week

3. **Health Factors**:
   - **Stress Level**: 1-10 scale (1=not stressed, 10=extremely stressed)
   - **Caffeine**: Cups of coffee/tea per day
   - **Fast Food**: Times consuming fast food per week
   - **Social Interaction**: Hours spent with friends/family per week

4. **Results**:
   - Risk classification (Low/Moderate/High)
   - Risk probability distribution
   - Wellness score (0-100)
   - BMI category and status
   - **BMI-specific recommendations**: Different suggestions for underweight, normal, overweight, and obese categories
   - General personalized recommendations based on lifestyle factors

### CSV Upload (`/upload`)
- **Features**:
  - Drag-and-drop interface
  - File validation (CSV format required)
  - Column validation (must contain all 12 required columns)
  - Preview of successfully uploaded records

- **Required Columns** (must match exactly):
  ```
  Age, Height_in_Feet, Weight_in_Kg, Screen_Time_Hours, Sleep_Hours, 
  Work_Hours_Per_Day, Physical_Activity_Hours_Per_Week, Stress_Level_1_to_10, 
  Caffeine_Cups_Per_Day, Fast_Food_Per_Week, Social_Interaction_Hours_Per_Week
  ```

- **Sample CSV Format**:
  ```csv
  Age,Height_in_Feet,Weight_in_Kg,Screen_Time_Hours,Sleep_Hours,Work_Hours_Per_Day,Physical_Activity_Hours_Per_Week,Stress_Level_1_to_10,Caffeine_Cups_Per_Day,Fast_Food_Per_Week,Social_Interaction_Hours_Per_Week
  35,5.9,75,9.5,7,9,3.5,6,2,2,4
  42,5.8,82,10,6.5,10,2,7,3,3,3
  38,6.1,80,8.5,7.5,8,4,5,1.5,1,5
  ```

### Search & Lookup (`/search`)
- **Features**:
  - Search uploaded records by any column value
  - Bulk prediction for filtered results
  - View predictions for matching records with:
    - Age, Risk Level, Risk Probability
    - BMI + BMI Category
    - Key lifestyle metrics
    - Wellness indicators

### Analytics Dashboard (`/dashboard`)
- **Features**:
  - Risk distribution pie chart
  - Statistics for uploaded dataset:
    - Total records, risk count distribution
    - Average metrics (age, BMI, screen time, etc.)
    - Percentage breakdown by risk category

---

## Feature Specifications

### 12 ML Features

| Feature | Type | Format | Example | Notes |
|---------|------|--------|---------|-------|
| Age | Integer | Years | 35 | Subject age |
| Height_in_Feet | Float | Decimal feet | 5.8 | 5'8" format |
| Weight_in_Kg | Float | Kilograms | 75 | Body weight |
| **BMI** (computed) | Float | kg/m² | 24.5 | Computed from height/weight |
| Screen_Time_Hours | Float | Hours/day | 9.5 | Daily screen time |
| Sleep_Hours | Float | Hours/night | 7 | Average sleep |
| Work_Hours_Per_Day | Float | Hours | 9 | Daily work duration |
| Physical_Activity_Hours_Per_Week | Float | Hours/week | 3.5 | Weekly exercise |
| Stress_Level_1_to_10 | Integer | 1-10 scale | 6 | Subjective stress rating |
| Caffeine_Cups_Per_Day | Float | Cups | 2 | Coffee/tea consumption |
| Fast_Food_Per_Week | Float | Times/week | 2 | Fast food meals |
| Social_Interaction_Hours_Per_Week | Float | Hours/week | 4 | Social activity time |

### Target Variable
- **Mental_Health_Risk**: Categorical (Low, Moderate, High)

---

## BMI Integration

### BMI Calculation Formula

$$\text{BMI} = \frac{\text{Weight (kg)}}{(\text{Height (feet)} \times 0.3048)^2}$$

Where:
- Height is provided in **feet** as a decimal (e.g., 5.8 for 5'8")
- Conversion factor: 1 foot = 0.3048 meters
- BMI is calculated in kg/m²

### BMI Categories & Recommendations

| Category | BMI Range | Risk | Recommendations |
|----------|-----------|------|-----------------|
| **Underweight** | < 18.5 | Medium | • Increase protein intake<br/>• Focus on strength training<br/>• Gain weight gradually (0.5-1 lb/week)<br/>• Track weight progress weekly<br/>• Consult nutritionist |
| **Normal Weight** | 18.5 - 24.9 | Low | • Maintain current weight<br/>• Continue regular exercise<br/>• Balanced nutrition<br/>• Monitor lifestyle factors |
| **Overweight** | 25.0 - 29.9 | Medium-High | • Aim for 5-10% weight loss<br/>• 150+ min cardio/week<br/>• Reduce calorie intake gradually<br/>• Limit fast food to 1x/week<br/>• Increase water consumption |
| **Obese** | ≥ 30.0 | High | • Aim for 5-10% weight loss initially<br/>• Combine cardio + strength training<br/>• Medical consultation recommended<br/>• Professional dietary guidance<br/>• Consider structured weight loss program |

### Real-time BMI Display

The prediction form includes real-time BMI calculation:
- As users enter Height and Weight, BMI updates automatically
- Visual category badge shows current BMI status
- Color-coded: Green (Normal), Blue (Underweight), Orange (Overweight), Red (Obese)

---

## Machine Learning Model

### Training Dataset
- **Records**: 200 samples
- **Features**: 12 (including computed BMI)
- **Target**: Mental_Health_Risk (3 classes: Low, Moderate, High)
- **Train-Test Split**: 80-20 stratified (160 training, 40 testing)

### Models Trained
1. **Logistic Regression**
   - Baseline model
   - Good for interpretability

2. **Random Forest** (Selected)
   - Ensemble method with 100 trees
   - Better non-linear relationship handling
   - Superior accuracy on this dataset
   - Feature importance extraction

### Performance Metrics

The best model (Random Forest) achieves:
- **Accuracy**: ~91% (on test set)
- **Precision**: High precision for High-risk predictions
- **Recall**: Good recall across all risk categories
- **F1-Score**: Balanced performance metric
- **Confusion Matrix**: Minimal misclassifications

### Preprocessing Steps
1. **BMI Calculation**: Computed from height and weight
2. **Encoding**: Mental_Health_Risk labels encoded (0=Low, 1=Moderate, 2=High)
3. **Standardization**: Features scaled using StandardScaler
4. **Train-Test Split**: Stratified split maintaining class distribution

### Feature Importance (Typical Ranking)
1. Stress Level (highest)
2. Screen Time Hours
3. Sleep Hours
4. BMI
5. Work Hours Per Day
6. Physical Activity Hours
7. Social Interaction Hours
... (others)

---

## Recommendation Engine

The system uses an advanced rule-based recommendation engine that evaluates:

### BMI-Based Recommendations (Primary)
- **Underweight (BMI < 18.5)**:
  - Increase protein intake for muscle building
  - Weekly weigh-ins to track progress
  - Recommend 300-500 calorie surplus
  - Suggest strength training 3x/week

- **Overweight (BMI 25-30)**:
  - Aim for 0.5-1 kg weight loss per week
  - Increase cardiovascular activities
  - Reduce fast food consumption
  - Monitor calorie intake carefully

- **Obese (BMI ≥ 30)**:
  - Medical consultation recommended
  - Structured weight management program
  - Combine aerobic + strength training
  - Professional dietary guidance

### Lifestyle-Based Recommendations
- **Sleep Management** (target: 7-8 hours)
  - < 6 hours: Establish sleep schedule, avoid screens 1h before bed
  - 6-7 hours: Gradually increase sleep duration
  - 7-8 hours: Maintain current routine

- **Screen Time** (target: ≤ 8 hours)
  - > 10 hours: Implement 20-20-20 rule (every 20 min, 20-second break, look 20 feet away)
  - > 8 hours: Reduce evening screen time
  - ≤ 8 hours: Maintain digital balance

- **Physical Activity** (target: 150+ min/week)
  - < 2 hours/week: Start with 30-min walks, 3x/week
  - 2-3 hours/week: Increase intensity or duration
  - ≥ 3 hours/week: Maintain or increase

- **Stress Management** (target: ≤ 6/10)
  - > 7/10: Practice meditation, deep breathing exercises
  - > 6/10: Regular breaks, stress management activities
  - ≤ 6/10: Continue wellness practices

- **Caffeine** (target: 1-2 cups/day)
  - > 4 cups: Reduce gradually, switch to herbal tea
  - 3-4 cups: Cut back 1 cup per week
  - ≤ 2 cups: Maintain current level

- **Social Interaction** (target: ≥ 4 hours/week)
  - < 3 hours: Schedule weekly social activities
  - 3-4 hours: Maintain engagement level
  - ≥ 4 hours: Continue strong social connections

- **Nutrition** (target: ≤ 2x/week fast food)
  - > 4x/week: Plan meals, learn basic cooking
  - 2-4x/week: Reduce gradually
  - ≤ 2x/week: Maintain healthy eating pattern

---

## Wellness Score Calculation

The Wellness Score (0-100) is calculated using a weighted algorithm:

```
Base Score = 100

BMI Deductions (Weight-based):
- BMI < 18.5 (Underweight): -15 points
- BMI ≥ 30 (Obese): -25 points
- BMI 25-30 (Overweight): -10 points

Sleep Deductions:
- Sleep < 6h: -20 points
- Sleep 6-7h: -10 points
- Sleep 7-8h: 0 points (optimal)

Screen Time Deductions:
- Screen Time > 10h: -15 points
- Screen Time 8-10h: -7 points
- Screen Time ≤ 8h: 0 points (optimal)

Physical Activity Deductions:
- Activity < 2h/week: -15 points
- Activity 2-3h/week: -7 points
- Activity ≥ 3h/week: 0 points (optimal)

Stress Deductions:
- Stress > 8/10: -20 points
- Stress 6-8/10: -10 points
- Stress ≤ 6/10: 0 points (good)

Caffeine Deductions:
- Caffeine > 4 cups/day: -10 points
- Caffeine 3-4 cups/day: -5 points
- Caffeine ≤ 2 cups/day: 0 points (optimal)

Work Hours Deductions:
- Work > 10h/day: -10 points
- Work 9-10h/day: -5 points
- Work ≤ 9h/day: 0 points (acceptable)

Social/Diet Deductions:
- Social < 3h/week: -5 points
- Fast Food > 4x/week: -5 points

Final Score = Base Score - Total Deductions (clamped between 0-100)
```

**Score Interpretation:**
- **80-100**: Excellent wellness (Green badge)
- **50-80**: Moderate wellness (Orange badge)
- **0-50**: Poor wellness (Red badge)

---

## API Endpoints

### POST `/api/predict`
Manual single-entry prediction

**Request**:
```json
{
  "Age": 35,
  "Height_in_Feet": 5.8,
  "Weight_in_Kg": 75,
  "Screen_Time_Hours": 9.5,
  "Sleep_Hours": 7,
  "Work_Hours_Per_Day": 9,
  "Physical_Activity_Hours_Per_Week": 3.5,
  "Stress_Level_1_to_10": 6,
  "Caffeine_Cups_Per_Day": 2,
  "Fast_Food_Per_Week": 2,
  "Social_Interaction_Hours_Per_Week": 4
}
```

**Response**:
```json
{
  "risk_level": "Moderate",
  "risk_probability": 0.45,
  "risk_color": "warning",
  "wellness_score": 72,
  "bmi": 24.5,
  "bmi_category": "Normal Weight",
  "recommendations": ["..."],
  "timestamp": "2026-02-20 14:30:45"
}
```

### POST `/api/upload-file`
Upload CSV file with multiple records

**Request**: FormData with CSV file

**Response**:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "record_count": 150,
  "columns_found": 12
}
```

### POST `/api/search-records`
Search uploaded dataset

**Request**:
```json
{
  "column": "Age",
  "value": "35"
}
```

**Response**:
```json
{
  "success": true,
  "matches": 5,
  "records": [...]
}
```

### POST `/api/bulk-predict`
Generate predictions for all uploaded records

**Response**:
```json
{
  "success": true,
  "total_records": 150,
  "predictions": [...],
  "statistics": {...}
}
```

---

## Technologies Used

### Backend
- **Flask 5.3**: Lightweight web framework for Python
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical computing
- **joblib**: Model serialization
- **Werkzeug**: File upload handling with secure_filename

### Frontend
- **Bootstrap 5.3**: Responsive CSS framework
- **Bootstrap Icons 1.11**: Icon library
- **Chart.js 4.4**: Interactive data visualization
- **HTML5**: Page structure
- **CSS3**: Modern responsive styling
- **Vanilla JavaScript**: Dynamic form handling and AJAX

### Development Tools
- **matplotlib & seaborn**: Data visualization for training
- **Python 3.8+**: Programming language

---

## System Requirements

### Minimum Requirements
- CPU: Dual-core processor
- RAM: 4GB
- Storage: 500MB (plus space for uploaded CSV files)
- Python 3.8+

### Recommended Requirements
- CPU: Quad-core processor
- RAM: 8GB
- Storage: 1GB
- Python 3.10+

---

## Ethical Disclaimer

⚠️ **IMPORTANT**: This system is a **predictive tool only** and is **NOT** a medical diagnosis tool. 

**Key Points:**
- Predictions are based on machine learning models trained on limited data
- This system should NOT be used as a substitute for professional medical advice
- Always consult qualified healthcare professionals (doctors, psychologists, therapists) for actual medical diagnosis and treatment
- Mental health is complex and multifactorial; this tool captures only digital wellness and physical metrics
- Results should be used for personal awareness and motivation, not for self-diagnosis or clinical decisions
- BMI is a screening measure and does not directly measure body fat; consult healthcare providers for individual assessment
- Organizations using this should provide access to professional mental health support resources
- This tool is designed for educational and research purposes

---

## Troubleshooting

### Issue: Model files not found
**Solution**: Run `python model/train_model.py` first to generate model.pkl, scaler.pkl, and label_encoder.pkl

### Issue: Module not found errors
**Solution**: Ensure all packages are installed:
```bash
pip install -r requirements.txt
```

### Issue: Port 5000 already in use
**Solution**: Change port in `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=5001)
```

### Issue: Dataset file not found
**Solution**: Ensure `data/Digital_Wellness_Dataset_200_Records.csv` exists with all 12 required columns

### Issue: "Height_in_Feet invalid" error
**Solution**: Ensure height is entered as decimal (e.g., 5.8 for 5'8", not 5' 8")

### Issue: CSV upload fails with "Missing columns"
**Solution**: Verify CSV has exactly these columns: Age, Height_in_Feet, Weight_in_Kg, Screen_Time_Hours, Sleep_Hours, Work_Hours_Per_Day, Physical_Activity_Hours_Per_Week, Stress_Level_1_to_10, Caffeine_Cups_Per_Day, Fast_Food_Per_Week, Social_Interaction_Hours_Per_Week

---

## Future Scope and Enhancements

### Short-term Improvements
- [ ] Add user authentication and data persistence
- [ ] Implement progress tracking over time
- [ ] Add more sophisticated visualization (heatmaps, trend analysis)
- [ ] SHAP explanations for individual predictions
- [ ] Email reports of wellness assessments

### Medium-term Enhancements
- [ ] Deep learning models (neural networks)
- [ ] Integration with wearable devices (Fitbit, Apple Watch)
- [ ] RESTful API for third-party integrations
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Advanced analytics dashboard for organizations
- [ ] Multi-language support

### Long-term Vision
- [ ] Real-time monitoring with IoT devices
- [ ] Federated learning for privacy-preserving ML
- [ ] Integration with EHR systems
- [ ] Automated intervention recommendations
- [ ] Personalized wellness coaching AI
- [ ] Mobile app version

---

## Dataset Format

The training dataset should be a CSV file with 12 columns:

```csv
Age,Height_in_Feet,Weight_in_Kg,Screen_Time_Hours,Sleep_Hours,Work_Hours_Per_Day,Physical_Activity_Hours_Per_Week,Stress_Level_1_to_10,Caffeine_Cups_Per_Day,Fast_Food_Per_Week,Social_Interaction_Hours_Per_Week,Mental_Health_Risk
35,5.9,75,9.5,7,9,3.5,6,2,2,4,Moderate
42,5.8,82,10,6.5,10,2,7,3,3,3,High
38,6.1,80,8.5,7.5,8,4,5,1.5,1,5,Low
```

**Notes**:
- Height_in_Feet must be in decimal format (5.9 = 5'10.8")
- Weight_in_Kg must be numeric
- Mental_Health_Risk must be: Low, Moderate, or High
- All numeric values should be positive
- Missing values will be handled during training/prediction

---

## Contributing

To contribute to this project:
1. Create a new branch for your feature
2. Make your changes with clear commit messages
3. Test thoroughly with sample data
4. Submit a pull request with a detailed description

---

## License

This project is provided as-is for educational and research purposes.

---

## Author & Contact

**Digital Wellness Analysis Team**
- Created for software professionals and workplace wellness programs
- Research-backed and data-driven approach
- Contact: [project-email]

---

## References & Resources

### Machine Learning
- Scikit-learn Documentation: https://scikit-learn.org/
- Pandas Documentation: https://pandas.pydata.org/
- NumPy Documentation: https://numpy.org/

### Health & Wellness
- BMI Calculator & Info: https://www.cdc.gov/healthyweight/assessing/bmi/index.html
- Mental Health Resources: https://www.nimh.nih.gov/
- Mental Health Foundation: https://www.mentalhealth.org.uk/
- WHO Guidelines: https://www.who.int/

### Web Development
- Flask Documentation: https://flask.palletsprojects.com/
- Bootstrap 5: https://getbootstrap.com/docs/5.3/
- MDN Web Docs: https://developer.mozilla.org/

---

## Version History

**v2.0.0 - BMI Integration Release (Feb 2026)**
- Complete BMI integration throughout system
- Height in decimal feet format (e.g., 5.8)
- Real-time BMI calculation in frontend
- BMI-specific recommendations (underweight, normal, overweight, obese)
- CSV file upload with bulk prediction
- Search and lookup functionality
- Analytics dashboard with statistics
- Bootstrap 5 responsive design
- Enhanced model training with BMI feature

**v1.0.0 - Initial Release**
- Core ML model with Random Forest classifier
- Web application with Flask
- Rule-based recommendation engine
- Manual assessment form

---

## Final Notes

This system is designed with the following principles:
- **Privacy**: No personal data is stored or transmitted beyond the session
- **Transparency**: Clear explanation of model decisions and BMI calculations
- **Accessibility**: User-friendly interface for all technical levels
- **Responsibility**: Ethical disclaimers and professional health guidance
- **Scalability**: Ready for enterprise deployment with proper infrastructure
- **Accuracy**: BMI calculated using standardized formulas and verified extensively

### How to Get Started (Quick Start Guide)
1. Clone/download the project
2. Create virtual environment: `python -m venv venv && venv\Scripts\activate` (Windows)
3. Install packages: `pip install -r requirements.txt`
4. Train model: `python model/train_model.py`
5. Start app: `python app.py`
6. Open browser: http://localhost:5000
7. Choose an option: Manual assessment, Upload CSV, or View Dashboard

Thank you for using the Digital Wellness Risk Analysis System!

---

**Last Updated**: February 2026  
**Status**: Production Ready with BMI Enhancement
