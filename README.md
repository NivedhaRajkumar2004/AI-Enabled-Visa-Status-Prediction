# 🚀 AI-Enabled Visa Status Prediction

<div align="center">

![Project Logo](https://img.shields.io/badge/AI%20Enabled-Visa%20Prediction-blueviolet?style=for-the-badge) <!-- TODO: Add project logo (e.g., a relevant icon or graphic) -->

[![GitHub license](https://img.shields.io/github/license/NivedhaRajkumar2004/AI-Enabled-Visa-Status-Prediction?style=for-the-badge)](LICENSE)

**A production-style data engineering pipeline for visa application processing with automated validation, feature engineering, and ML-ready export, complemented by a Next.js application for visualization and interaction.**

</div>

## 📖 Overview

This project presents a robust, AI-enabled solution designed to streamline visa application processing by predicting visa status. It comprises two main components:

1.  **Python Data Engineering & Machine Learning Pipeline**: A comprehensive pipeline developed in Python that handles raw visa application data. It features automated data validation, extensive exploratory data analysis (EDA), advanced feature engineering, and robust machine learning model training and hyperparameter tuning. The pipeline outputs an optimized predictive model and an engineered dataset ready for deployment or further analysis.
2.  **Next.js Web Application**: A modern, interactive web interface built with Next.js, React, and TypeScript. This application serves as a front-end for visualizing the results of the ML pipeline, including model performance, predictions, and residual analysis. It is designed to provide clear insights into the predictive capabilities and data characteristics.

The solution aims to provide a reliable method for predicting visa outcomes, enhancing efficiency and decision-making in immigration processes.

## ✨ Features

-   **Automated Data Validation**: Ensures data quality and consistency within the pipeline.
-   **Comprehensive EDA & Visualization**: In-depth analysis and graphical representation of visa application data characteristics (`eda.py`, `visualizations.py`).
-   **Advanced Feature Engineering**: Transforms raw data into powerful predictive features, enhancing model accuracy (`advanced_feature_engineer.py`).
-   **Machine Learning Model Training**: Trains and evaluates various models to predict visa status (`model_trainer.py`).
-   **Hyperparameter Tuning**: Optimizes model performance through systematic hyperparameter search (`hyperparameter_tuning.py`).
-   **Model Evaluation**: Rigorous assessment of trained models using key metrics and visualizations (`model_evaluator.py`, `model_comparison.png`, `model_errors.png`, `model_predictions.png`, `model_residuals.png`).
-   **Predictive Modeling for Visa Status**: Generates a tuned machine learning model capable of predicting visa outcomes (`best_model_tuned.pkl`).
-   **Interactive Web Application**: A user-friendly interface built with Next.js and React for displaying pipeline results.
-   **Dynamic Data & Model Visualizations**: Presents complex data and model insights in an easily digestible format within the web app.

## 🛠️ Tech Stack

**Frontend:**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

**Backend / Data Science:**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

![Pandas](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)

![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

![Matplotlib](https://img.shields.io/badge/Matplotlib-EE6633?style=for-the-badge&logo=matplotlib&logoColor=white)

![Seaborn](https://img.shields.io/badge/Seaborn-4378A5?style=for-the-badge&logo=seaborn&logoColor=white)

## 🚀 Quick Start

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   **Node.js** (version 16 or higher, recommended for Next.js 14)
-   **npm** (Node Package Manager, usually comes with Node.js)
-   **Python** (version 3.8 or higher is recommended)
-   **pip** (Python package installer, usually comes with Python)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/NivedhaRajkumar2004/AI-Enabled-Visa-Status-Prediction.git
    cd AI-Enabled-Visa-Status-Prediction
    ```

2.  **Set up the Python environment**
    It is highly recommended to use a virtual environment for Python dependencies.
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```

    Install Python dependencies. A `requirements.txt` file is not provided, so you will need to install the inferred dependencies:
    ```bash
    pip install pandas numpy scikit-learn matplotlib seaborn  # Add other libraries like xgboost/lightgbm if used
    ```
    *(Optional: You may want to create a `requirements.txt` from your environment once these are installed: `pip freeze > requirements.txt`)*

3.  **Install Node.js dependencies**
    ```bash
    npm install
    ```

4.  **Environment setup**
    This project does not currently use explicit environment variables via `.env` files. For the Next.js application, sensitive keys or configurations would typically be managed in a `.env.local` file.

### Running the Project

#### 1. Run the Python Data Engineering & ML Pipeline

Execute the main pipeline script to process data, train, and evaluate models.

-   **To run the full pipeline (EDA, Feature Engineering, Training, Evaluation):**
    ```bash
    python run_milestone_3.py
    ```
-   **To run the pipeline with hyperparameter tuning:**
    ```bash
    python run_milestone_3_tuning.py
    ```

    The trained model (`best_model_tuned.pkl`), engineered data (`visa_applications_engineered.csv`), and various model performance visualizations will be generated and saved in the project root or specified output directories.

#### 2. Start the Next.js Development Server

After the Python pipeline runs and generates its outputs, you can view relevant visualizations or interact with the potential UI.

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` (or the port specified by Next.js if 3000 is taken).

## 📁 Project Structure

```
AI-Enabled-Visa-Status-Prediction/
├── app/                        # Next.js App Router directory for pages and routes
├── public/                     # Static assets for the Next.js application
├── components/                 # React components for the Next.js UI
├── hooks/                      # Custom React hooks
├── lib/                        # Frontend utility functions
├── styles/                     # Tailwind CSS and other styling files
├── advanced_feature_engineer.py # Python script for advanced feature engineering
├── best_model_tuned.pkl        # Serialized machine learning model (output)
├── eda.py                      # Python script for Exploratory Data Analysis
├── hyperparameter_tuning.py    # Python script for ML hyperparameter tuning
├── model_evaluator.py          # Python script for model evaluation
├── model_trainer.py            # Python script for training ML models
├── run_milestone_3.py          # Main Python script to execute the ML pipeline
├── run_milestone_3_tuning.py   # Main Python script to execute the ML pipeline with tuning
├── tuning_visualization.py     # Python script for visualizing tuning results
├── visualizations.py           # Python script for data and model visualizations
├── Vizualizations/             # Directory for visualization outputs (e.g., charts)
├── visa_applications_engineered.csv # Engineered dataset (output)
├── model_comparison.png        # Generated image: comparison of models
├── model_errors.png            # Generated image: model error analysis
├── model_predictions.png       # Generated image: actual vs. predicted values
├── model_residuals.png         # Generated image: residual plot
├── Nivedha_Agile.xls           # Project Agile planning document
├── Nivedha_Defect_Tracker.xlsx # Project defect tracking document
├── Nivedha_Unit_Test_Plan.xlsx # Project unit test plan document (manual)
├── package.json                # Node.js project configuration and scripts
├── package-lock.json           # npm lock file
├── LICENSE                     # Project license file (MIT License)
└── README.md                   # This README file
```

## ⚙️ Configuration

### Environment Variables (Next.js)

The Next.js application can use environment variables. Create a `.env.local` file in the root directory for local development.

```

# Example (if needed for API keys, etc.)

# NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Python Configuration

Python scripts are generally configured directly within the code. No external configuration files (e.g., `config.ini`) were detected.

## 🔧 Development

### Available Node.js Scripts

| `npm run dev`   | Starts the Next.js development server           |

| `npm run build` | Creates a production build of the Next.js app   |

| `npm run start` | Starts the Next.js production server            |

| `npm run lint`  | Runs ESLint to check for code style issues      |

### Python Development Workflow

Developers can modify and run individual Python scripts for EDA, feature engineering, model training, and evaluation. It's recommended to activate the Python virtual environment before running any Python scripts.

## 🧪 Testing

This project includes manual testing documentation in `Nivedha_Unit_Test_Plan.xlsx` and `Nivedha_Defect_Tracker.xlsx`.

Automated testing frameworks (e.g., Jest for JavaScript/TypeScript, Pytest for Python) were not explicitly configured in `package.json` scripts or `requirements.txt`.

## 🚀 Deployment

### Production Build (Next.js)

To create an optimized production build of the Next.js application:

```bash
npm run build
```

The build output will be in the `.next` directory. You can then deploy this output to platforms like Vercel, Netlify, or a custom server.

### Python Pipeline Deployment

For deploying the Python pipeline, consider containerization (e.g., Docker, not currently configured) for consistent environments, or setting up scheduled execution on a server for regular data processing. The trained model (`best_model_tuned.pkl`) can be used for inference in a separate service or integrated into an application.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## 🙏 Acknowledgments

-   Built with Next.js, React, and TypeScript for the web interface.
-   Powered by Python and its extensive data science ecosystem (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn).

## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/NivedhaRajkumar2004/AI-Enabled-Visa-Status-Prediction/issues)
-   📧 For general inquiries, please contact [Nivedha Rajkumar](https://github.com/NivedhaRajkumar2004). <!-- TODO: Add a specific contact email if desired -->

---