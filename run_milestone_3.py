"""
MILESTONE 3: Predictive Modeling
Train and evaluate regression models for processing time prediction
"""

import pandas as pd
from src.logger import logger
from src.config import PROCESSED_DATA_DIR
from src.model_trainer import ModelTrainer
from src.model_evaluator import ModelEvaluator

def main():
    logger.info("\n" + "="*70)
    logger.info("MILESTONE 3: PREDICTIVE MODELING")
    logger.info("="*70)
    
    # Load engineered dataset
    ml_file = PROCESSED_DATA_DIR / 'visa_applications_no_leakage.csv'
    
    logger.info(f"\nLoading dataset: {ml_file}")
    df = pd.read_csv(ml_file)
    logger.info(f"✓ Loaded {len(df)} rows × {len(df.columns)} columns")
    
    # Train models
    logger.info("\n" + "-"*70)
    trainer = ModelTrainer(df)
    best_model_name, best_model = trainer.run_all_training()
    
    if best_model is None:
        logger.error("Model training failed!")
        return
    
    # Evaluate models
    logger.info("\n" + "-"*70)
    evaluator = ModelEvaluator(trainer.y_test, trainer.results)
    evaluator.run_evaluation()
    
    # Final summary
    logger.info("\n" + "="*70)
    logger.info("MILESTONE 3 COMPLETE")
    logger.info("="*70)
    logger.info("\nOutputs Generated:")
    logger.info("  1. Model training completed (4 models trained)")
    logger.info("  2. Performance evaluation with MAE, RMSE, R² scores")
    logger.info("  3. Visualizations:")
    logger.info("     - model_predictions.png (Actual vs Predicted)")
    logger.info("     - model_residuals.png (Residual analysis)")
    logger.info("     - model_errors.png (Error distribution)")
    logger.info("     - model_comparison.png (Performance comparison)")
    logger.info(f"\n🏆 Best Model: {best_model_name}")
    logger.info("\nReady for Milestone 4: Model Deployment & API Development!")

if __name__ == "__main__":
    main()