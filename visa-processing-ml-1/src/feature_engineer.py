import pandas as pd
import numpy as np
from src.logger import logger

class FeatureEngineer:
    """Create new features for ML"""
    
    def __init__(self, df):
        self.df = df.copy()
    
    def engineer_date_features(self):
        """Extract date-based features"""
        logger.info("\n[STEP 6] Engineering date features...")
        
        date_cols = []
        for col in self.df.columns:
            if 'date' in col.lower():
                try:
                    self.df[col] = pd.to_datetime(self.df[col], errors='coerce')
                    date_cols.append(col)
                except:
                    pass
        
        for col in date_cols:
            if col in self.df.columns:
                self.df[f'{col}_year'] = self.df[col].dt.year
                self.df[f'{col}_month'] = self.df[col].dt.month
                self.df[f'{col}_day'] = self.df[col].dt.day
                self.df[f'{col}_dayofweek'] = self.df[col].dt.dayofweek
                logger.info(f"  ✓ Extracted features from '{col}'")
        
        return self.df
    
    def engineer_numeric_features(self):
        """Create derived numeric features"""
        logger.info("\n[STEP 7] Engineering numeric features...")
        
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns.tolist()
        
        if len(numeric_cols) >= 2:
            try:
                col1, col2 = numeric_cols[0], numeric_cols[1]
                self.df[f'{col1}_to_{col2}_ratio'] = self.df[col1] / (self.df[col2] + 1)
                logger.info(f"  ✓ Created ratio feature")
            except:
                pass
        
        return self.df
    
    def engineer_categorical_features(self):
        """Create categorical interaction features"""
        logger.info("\n[STEP 8] Engineering categorical features...")
        
        categorical_cols = self.df.select_dtypes(include=['object']).columns.tolist()
        
        for col in categorical_cols[:3]:  # Limit to first 3 to avoid too many features
            try:
                freq_encode = self.df[col].value_counts().to_dict()
                self.df[f'{col}_frequency'] = self.df[col].map(freq_encode)
                logger.info(f"  ✓ Created frequency encoding for '{col}'")
            except:
                pass
        
        return self.df
    
    def get_engineered_df(self):
        """Return dataframe with engineered features"""
        return self.df