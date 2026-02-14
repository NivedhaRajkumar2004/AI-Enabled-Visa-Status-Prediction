import pandas as pd
import json
from src.config import RAW_DATA_FILE, REPORTS_DIR
from src.logger import logger

class DataLoader:
    """Load and analyze data quality"""
    
    def __init__(self, file_path=RAW_DATA_FILE):
        self.file_path = file_path
        self.df = None
        self.metadata = {}
    
    def load_data(self):
        """Load CSV data"""
        logger.info(f"Loading data from {self.file_path}...")
        
        try:
            self.df = pd.read_csv(self.file_path)
            logger.info(f"✓ Data loaded successfully!")
            logger.info(f"  Shape: {self.df.shape[0]} rows × {self.df.shape[1]} columns")
            return self.df
        except FileNotFoundError:
            logger.error(f"✗ File not found: {self.file_path}")
            raise
        except Exception as e:
            logger.error(f"✗ Error loading data: {str(e)}")
            raise
    
    def analyze_quality(self):
        """Analyze data quality"""
        logger.info("\n[STEP 1] Analyzing data quality...")
        
        if self.df is None:
            logger.error("No data loaded")
            return
        
        missing_data = self.df.isnull().sum()
        missing_pct = (missing_data / len(self.df)) * 100
        
        logger.info("\n  Missing Values:")
        total_missing = 0
        for col in self.df.columns:
            if missing_data[col] > 0:
                logger.info(f"    {col}: {missing_data[col]} ({missing_pct[col]:.2f}%)")
                total_missing += missing_data[col]
        
        logger.info(f"  Total missing: {total_missing}")
        
        logger.info("\n  Data Types:")
        for col, dtype in self.df.dtypes.items():
            logger.info(f"    {col}: {dtype}")
        
        duplicates = self.df.duplicated().sum()
        logger.info(f"\n  Duplicate rows: {duplicates}")
        
        self.metadata = {
            'total_rows': len(self.df),
            'total_columns': len(self.df.columns),
            'missing_values': missing_data.to_dict(),
            'duplicate_rows': duplicates,
            'data_types': self.df.dtypes.astype(str).to_dict()
        }
        
        return self.df
    
    def get_df(self):
        """Return dataframe"""
        return self.df