# visa-processing-ml-1

![Python](https://img.shields.io/badge/-Python-blue?logo=python&logoColor=white)

## 📝 Description

visa-processing-ml-1 is a sophisticated machine learning solution built with Python, designed to automate and optimize the visa application workflow. The project offers a versatile architecture featuring a powerful API for integration into existing services, a Command Line Interface (CLI) for streamlined operational control, and a rigorous testing framework to ensure reliability and precision in processing. Whether for large-scale automation or targeted visa classification tasks, this tool provides a robust foundation for modern immigration tech solutions.

---

## 🎯 Objectives

- Automate visa status prediction using supervised learning
- Provide data-driven processing time estimation
- Design a scalable ML pipeline suitable for real-world integration
- Maintain clean, modular, and maintainable code structure
  
---

## 🧠 Core Capabilities

### 1️⃣ Visa Status Classification
Predicts whether a visa application is likely to be approved or denied based on structured applicant and case attributes.

### 2️⃣ Processing Time Estimation
Estimates the expected number of days required for case completion using regression modeling techniques.

---

## ✨ Features

- 🌐 Api
- 🧪 Testing
- 💻 Cli

---

## 🛠️ Tech Stack

- Python 3.8+
- Pandas
- NumPy
- Scikit-learn
- PyYAML
- Python-dotenv
  
---

## 📦 Key Dependencies

```
pandas: 2.0.3
numpy: 1.24.3
scikit-learn: 1.3.0
python-dotenv: 1.0.0
pyyaml: 6.0

---

## 🏗 System Architecture

The system follows a structured ML workflow:

Raw Data  
→ Data Validation  
→ Data Preprocessing  
→ Feature Engineering  
→ ML-Ready Dataset Generation  
→ Model Training & Evaluation  

This modular design ensures clarity, maintainability, and scalability.

---

## 📁 Project Structure

```
visa-processing-ml-1
├── data
│   ├── processed
│   │   ├── visa_applications_cleaned.csv
│   │   └── visa_applications_no_leakage.csv
│   ├── raw
│   │   └── visa_applications.csv
│   └── reports
│       └── processing_report.json
├── requirements.txt
├── run_leakage_removal.py
├── run_pipeline.py
├── setup.py
└── src
    ├── __init__.py
    ├── config.py
    ├── data_cleaner.py
    ├── data_loader.py
    ├── data_validator.py
    ├── feature_engineer.py
    ├── logger.py
    ├── pipeline.py
    └── remove_data_leakage.py
```

## 🛠️ Development Setup

### Python Setup
1. Install Python (v3.8+ recommended)
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`

---

## 📊 Outputs

- Cleaned and processed datasets  
- Model-ready feature sets  
- Structured processing reports
  
---

## 🚀 Engineering Highlights

- Modular and extensible codebase  
- Separation of concerns across pipeline stages  
- Reproducible data processing workflow  
- Structured logging and reporting  
- GitHub-ready project organization  

---

## 📄 License

This project is licensed under the MIT License.

---
