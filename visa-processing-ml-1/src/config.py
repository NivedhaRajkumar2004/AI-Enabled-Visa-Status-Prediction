import os
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / 'data'
RAW_DATA_DIR = DATA_DIR / 'raw'
PROCESSED_DATA_DIR = DATA_DIR / 'processed'
REPORTS_DIR = DATA_DIR / 'reports'

# File paths
RAW_DATA_FILE = RAW_DATA_DIR / 'visa_applications.csv'
PROCESSED_DATA_FILE = PROCESSED_DATA_DIR / 'visa_applications_processed.csv'
REPORT_FILE = REPORTS_DIR / 'processing_report.json'
LOG_FILE = REPORTS_DIR / 'processing.log'

# Processing parameters
MISSING_VALUE_THRESHOLD = 0.5
DUPLICATE_THRESHOLD = 1.0
OUTLIER_METHOD = 'iqr'

# Feature engineering
DATE_FEATURES = ['application_date', 'decision_date']
NUMERIC_FEATURES_TO_SCALE = True
CATEGORICAL_ENCODING = 'onehot'

# Logging
LOG_LEVEL = 'INFO'
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
CONSOLE_OUTPUT = True
FILE_OUTPUT = True

# Ensure directories exist
for directory in [RAW_DATA_DIR, PROCESSED_DATA_DIR, REPORTS_DIR]:
    directory.mkdir(parents=True, exist_ok=True)