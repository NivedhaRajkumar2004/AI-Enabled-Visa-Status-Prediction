import json
from src.logger import logger
from src.config import PROCESSED_DATA_FILE, REPORT_FILE
from src.data_loader import DataLoader
from src.data_cleaner import DataCleaner
from src.feature_engineer import FeatureEngineer
from src.data_validator import DataValidator

class DataPipeline:
    """Main data processing pipeline"""
    
    def __init__(self):
        self.df = None
        self.report = {}
    
    def run(self):
        """Execute complete pipeline"""
        logger.info("\n" + "="*70)
        logger.info("MILESTONE 1: ADVANCED DATA PREPROCESSING PIPELINE")
        logger.info("="*70)
        
        try:
            # Stage 1: Load
            logger.info("\n📥 STAGE 1: LOAD")
            loader = DataLoader()
            self.df = loader.load_data()
            loader.analyze_quality()
            
            # Stage 2: Advanced Clean
            logger.info("\n🧹 STAGE 2: ADVANCED CLEANING")
            cleaner = DataCleaner(self.df)
            cleaner.clean_salary()
            cleaner.clean_education()
            cleaner.standardize_states()
            self.df = cleaner.clean_missing_values()
            self.df = cleaner.remove_duplicates()
            self.df = cleaner.remove_outliers()
            
            # Stage 3: Engineer
            logger.info("\n⚙️ STAGE 3: ENGINEER FEATURES")
            engineer = FeatureEngineer(self.df)
            self.df = engineer.engineer_date_features()
            self.df = engineer.engineer_numeric_features()
            self.df = engineer.engineer_categorical_features()
            
            # Stage 4: Validate
            logger.info("\n✅ STAGE 4: VALIDATE")
            validator = DataValidator(self.df)
            validator.validate_completeness()
            validator.validate_consistency()
            validator.validate_schema()
            self.report = validator.generate_report()
            
            # Stage 5: Export
            logger.info("\n💾 STAGE 5: EXPORT")
            self.export_data()
            
            logger.info("\n" + "="*70)
            logger.info("✓ PIPELINE COMPLETED SUCCESSFULLY!")
            logger.info("="*70)
            
            return self.df
        
        except Exception as e:
            logger.error(f"\n✗ PIPELINE FAILED: {str(e)}")
            raise
    
    def export_data(self):
        """Export processed data"""
        logger.info(f"  Exporting to: {PROCESSED_DATA_FILE}")
        
        self.df.to_csv(PROCESSED_DATA_FILE, index=False)
        logger.info(f"  ✓ Saved {len(self.df)} rows × {len(self.df.columns)} columns")
        
        # Save report
        with open(REPORT_FILE, 'w') as f:
            json.dump(self.report, f, indent=2, default=str)
        logger.info(f"  ✓ Report saved to: {REPORT_FILE}")
    
    def get_df(self):
        """Return processed dataframe"""
        return self.df