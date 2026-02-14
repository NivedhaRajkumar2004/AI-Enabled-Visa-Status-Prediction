import pandas as pd
from src.logger import logger
from src.config import PROCESSED_DATA_FILE, PROCESSED_DATA_DIR

class DataLeakageRemover:
    """Remove data leakage from processed dataset"""
    
    def __init__(self):
        self.df = None
    
    def load_processed_data(self):
        """Load the processed data"""
        logger.info("\nLoading processed data...")
        self.df = pd.read_csv(PROCESSED_DATA_FILE)
        logger.info(f"Loaded: {len(self.df)} rows × {len(self.df.columns)} columns")
        return self.df
    
    def remove_data_leakage(self):
        """Remove columns that cause data leakage"""
        logger.info("\n" + "="*70)
        logger.info("REMOVING DATA LEAKAGE")
        logger.info("="*70)
        
        initial_columns = self.df.columns.tolist()
        
        # Columns to remove for classification task (predict visa_status)
        logger.info("\n[Decision] Removing data leakage columns...")
        logger.info("Task: Predict visa_status at application time")
        logger.info("Data available: application_date only")
        logger.info("Data NOT available: decision_date (hasn't happened yet)")
        
        leakage_columns = [
            'decision_date',  # Actual column name
            'decision_date_year',
            'decision_date_month',
            'decision_date_day',
            'decision_date_dayofweek',
            'applicant_id',  # Unique identifier - no predictive value
            'applicant_id_frequency'  # All values = 1, no variance
        ]
        
        removed = []
        for col in leakage_columns:
            if col in self.df.columns:
                self.df = self.df.drop(col, axis=1)
                removed.append(col)
                logger.info(f"  ✓ Removed: {col}")
        
        logger.info(f"\nRemoved {len(removed)} leakage columns:")
        for col in removed:
            logger.info(f"  - {col}")
        
        return self.df
    
    def show_final_columns(self):
        """Show final columns for ML training"""
        logger.info("\n" + "-"*70)
        logger.info("FINAL COLUMNS FOR ML TRAINING")
        logger.info("-"*70)
        
        logger.info(f"\nTotal columns: {len(self.df.columns)}")
        logger.info("\nFeature columns:")
        
        features = []
        target = None
        
        for col in self.df.columns:
            if col == 'visa_status':
                target = col
                logger.info(f"  [TARGET] {col}")
            else:
                features.append(col)
                dtype = self.df[col].dtype
                logger.info(f"  {col}: {dtype}")
        
        logger.info(f"\nTotal features: {len(features)}")
        logger.info(f"Target variable: {target}")
        
        return features, target
    
    def export_ml_ready_data(self):
        """Export ML-ready dataset"""
        output_file = PROCESSED_DATA_DIR / 'visa_applications_ml_ready.csv'
        
        logger.info(f"\n" + "-"*70)
        logger.info("EXPORTING ML-READY DATASET")
        logger.info("-"*70)
        
        self.df.to_csv(output_file, index=False)
        logger.info(f"✓ Saved to: {output_file}")
        logger.info(f"  Shape: {len(self.df)} rows × {len(self.df.columns)} columns")
        
        return output_file
    
    def run(self):
        """Execute complete leakage removal"""
        logger.info("\n" + "="*70)
        logger.info("MILESTONE 1.5: DATA LEAKAGE REMOVAL")
        logger.info("="*70)
        
        self.load_processed_data()
        self.remove_data_leakage()
        features, target = self.show_final_columns()
        output_file = self.export_ml_ready_data()
        
        logger.info("\n" + "="*70)
        logger.info("✓ DATA LEAKAGE REMOVAL COMPLETE")
        logger.info("="*70)
        logger.info(f"\nYour dataset is now ready for ML training!")
        logger.info(f"File: {output_file}")
        logger.info(f"\nNext steps:")
        logger.info(f"1. Exploratory Data Analysis (EDA)")
        logger.info(f"2. Handle class imbalance (if needed)")
        logger.info(f"3. Train classification model")
        logger.info(f"4. Evaluate model performance")
        
        return self.df