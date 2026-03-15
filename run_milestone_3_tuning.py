"""
MILESTONE 3 EXTENDED: Hyperparameter Tuning
Optimize Gradient Boosting and Random Forest models
"""

import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from src.logger import logger
from src.config import PROCESSED_DATA_DIR
from src.hyperparameter_tuning import HyperparameterTuning
#from src.tuning_visualization import TuningVisualization
import joblib

def main():
    logger.info("\n" + "="*70)
    logger.info("MILESTONE 3 EXTENDED: HYPERPARAMETER TUNING")
    logger.info("="*70)
    
    # Load data
    ml_file = PROCESSED_DATA_DIR / 'visa_applications_no_leakage.csv'
    logger.info(f"\nLoading dataset: {ml_file}")
    df = pd.read_csv(ml_file)
    logger.info(f"✓ Loaded {len(df)} rows × {len(df.columns)} columns")
    
    # Prepare data
    logger.info("\n[DATA PREPARATION]")
    target_col = 'processing_time_days'
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    # Encode categorical variables
    label_encoders = {}
    for col in X.select_dtypes(include=['object']).columns:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    logger.info(f"  Training samples: {X_train.shape[0]}")
    logger.info(f"  Testing samples: {X_test.shape[0]}")
    
    # Run hyperparameter tuning
    logger.info("\n" + "-"*70)
    tuner = HyperparameterTuning(X_train, X_test, y_train, y_test)
    best_model_name, best_model = tuner.run_all_tuning()
    
    # Save best model
    logger.info(f"\n[SAVING BEST MODEL]")
    model_path = PROCESSED_DATA_DIR / 'best_model_tuned.pkl'
    joblib.dump(best_model, model_path)
    logger.info(f"✓ Saved best model: {model_path}")
    
    # Summary
    logger.info("\n" + "="*70)
    logger.info("HYPERPARAMETER TUNING COMPLETE")
    logger.info("="*70)
    logger.info(f"\n🏆 Best Tuned Model: {best_model_name}")
    logger.info(f"   Saved to: {model_path}")
    logger.info("\nKey Improvements:")
    logger.info("  ✓ RandomizedSearchCV: Tested 300+ parameter combinations")
    logger.info("  ✓ GridSearchCV: Fine-tuned around best parameters")
    logger.info("  ✓ 5-Fold Cross-validation: Ensured model generalization")
    logger.info("  ✓ Best model saved for production deployment")
    logger.info("\nNext Steps: Deploy model as REST API (Milestone 4)")

if __name__ == "__main__":
    main()