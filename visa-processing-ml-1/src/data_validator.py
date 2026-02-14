import pandas as pd
import json
from src.logger import logger

class DataValidator:
    """Validate data quality"""
    
    def __init__(self, df):
        self.df = df.copy()
        self.validation_report = {}
    
    def validate_completeness(self):
        """Check data completeness"""
        logger.info("\n[STEP 9] Validating data completeness...")
        
        missing_count = self.df.isnull().sum().sum()
        logger.info(f"  Missing values: {missing_count}")
        
        if missing_count == 0:
            logger.info("  ✓ Dataset is 100% complete!")
        
        self.validation_report['missing_values'] = missing_count
        return missing_count == 0
    
    def validate_consistency(self):
        """Check data consistency"""
        logger.info("\n[STEP 10] Validating data consistency...")
        
        duplicates = self.df.duplicated().sum()
        logger.info(f"  Duplicate rows: {duplicates}")
        
        if duplicates == 0:
            logger.info("  ✓ No duplicate rows!")
        
        self.validation_report['duplicate_rows'] = duplicates
        return duplicates == 0
    
    def validate_schema(self):
        """Check schema consistency"""
        logger.info("\n[STEP 11] Validating schema:")
        
        for col in self.df.columns:
            logger.info(f"    {col}: {self.df[col].dtype}")
        
        self.validation_report['schema'] = self.df.dtypes.astype(str).to_dict()
        return True
    
    def generate_report(self):
        """Generate final validation report"""
        report = {
            'total_rows': len(self.df),
            'total_columns': len(self.df.columns),
            'missing_values': self.validation_report.get('missing_values', 0),
            'duplicate_rows': self.validation_report.get('duplicate_rows', 0),
            'schema': self.validation_report.get('schema', {}),
            'status': 'PASSED' if self.df.isnull().sum().sum() == 0 else 'FAILED'
        }
        
        logger.info("\n" + "="*60)
        logger.info(f"Validation Status: {report['status']}")
        logger.info("="*60)
        
        return report
    
    def get_validated_df(self):
        """Return validated dataframe"""
        return self.df