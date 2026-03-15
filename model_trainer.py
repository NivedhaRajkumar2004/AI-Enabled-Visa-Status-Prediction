import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from src.logger import logger
import joblib

class ModelTrainer:
    """Train regression models for processing time prediction"""
    
    def __init__(self, df):
        self.df = df.copy()
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.models = {}
        self.results = {}
        self.scaler = StandardScaler()
        self.label_encoders = {}
    
    def prepare_data(self):
        """Prepare data for modeling"""
        logger.info("\n[STEP 1] Preparing data for modeling...")
        
        # Check if target variable exists
        if 'processing_time_days' not in self.df.columns:
            logger.error("Target variable 'processing_time_days' not found!")
            return False
        
        # Separate features and target
        target_col = 'processing_time_days'
        X = self.df.drop(columns=[target_col])
        y = self.df[target_col]
        
        logger.info(f"  Target variable: {target_col}")
        logger.info(f"  Features shape: {X.shape}")
        logger.info(f"  Target shape: {y.shape}")
        
        # Handle categorical variables
        logger.info("\n  Encoding categorical variables...")
        categorical_cols = X.select_dtypes(include=['object']).columns
        
        for col in categorical_cols:
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
            self.label_encoders[col] = le
            logger.info(f"    ✓ Encoded: {col} ({len(le.classes_)} classes)")
        
        # Split data
        logger.info("\n  Splitting data (80% train, 20% test)...")
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        logger.info(f"  Training set: {self.X_train.shape[0]} samples")
        logger.info(f"  Testing set: {self.X_test.shape[0]} samples")
        
        # Scale features
        logger.info("\n  Scaling features...")
        self.X_train = self.scaler.fit_transform(self.X_train)
        self.X_test = self.scaler.transform(self.X_test)
        logger.info("  ✓ Features scaled successfully")
        
        return True
    
    def train_linear_regression(self):
        """Train Linear Regression model"""
        logger.info("\n" + "-"*70)
        logger.info("TRAINING: Linear Regression")
        logger.info("-"*70)
        
        model = LinearRegression()
        model.fit(self.X_train, self.y_train)
        
        # Predictions
        y_pred_train = model.predict(self.X_train)
        y_pred_test = model.predict(self.X_test)
        
        # Evaluate
        mae = mean_absolute_error(self.y_test, y_pred_test)
        rmse = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2 = r2_score(self.y_test, y_pred_test)
        cv_score = cross_val_score(model, self.X_train, self.y_train, cv=5, scoring='r2').mean()
        
        logger.info(f"  Train MAE: {mean_absolute_error(self.y_train, y_pred_train):.2f} days")
        logger.info(f"  Test MAE: {mae:.2f} days")
        logger.info(f"  Test RMSE: {rmse:.2f} days")
        logger.info(f"  Test R² Score: {r2:.4f}")
        logger.info(f"  Cross-validation R²: {cv_score:.4f}")
        
        self.models['Linear Regression'] = model
        self.results['Linear Regression'] = {
            'MAE': mae,
            'RMSE': rmse,
            'R2': r2,
            'CV_Score': cv_score,
            'y_pred': y_pred_test
        }
        
        return model
    
    def train_random_forest(self):
        """Train Random Forest model"""
        logger.info("\n" + "-"*70)
        logger.info("TRAINING: Random Forest Regressor")
        logger.info("-"*70)
        
        model = RandomForestRegressor(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
        model.fit(self.X_train, self.y_train)
        
        # Predictions
        y_pred_train = model.predict(self.X_train)
        y_pred_test = model.predict(self.X_test)
        
        # Evaluate
        mae = mean_absolute_error(self.y_test, y_pred_test)
        rmse = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2 = r2_score(self.y_test, y_pred_test)
        cv_score = cross_val_score(model, self.X_train, self.y_train, cv=5, scoring='r2').mean()
        
        logger.info(f"  Train MAE: {mean_absolute_error(self.y_train, y_pred_train):.2f} days")
        logger.info(f"  Test MAE: {mae:.2f} days")
        logger.info(f"  Test RMSE: {rmse:.2f} days")
        logger.info(f"  Test R² Score: {r2:.4f}")
        logger.info(f"  Cross-validation R²: {cv_score:.4f}")
        
        self.models['Random Forest'] = model
        self.results['Random Forest'] = {
            'MAE': mae,
            'RMSE': rmse,
            'R2': r2,
            'CV_Score': cv_score,
            'y_pred': y_pred_test,
            'feature_importance': model.feature_importances_
        }
        
        return model
    
    def train_gradient_boosting(self):
        """Train Gradient Boosting model"""
        logger.info("\n" + "-"*70)
        logger.info("TRAINING: Gradient Boosting Regressor")
        logger.info("-"*70)
        
        model = GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        model.fit(self.X_train, self.y_train)
        
        # Predictions
        y_pred_train = model.predict(self.X_train)
        y_pred_test = model.predict(self.X_test)
        
        # Evaluate
        mae = mean_absolute_error(self.y_test, y_pred_test)
        rmse = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2 = r2_score(self.y_test, y_pred_test)
        cv_score = cross_val_score(model, self.X_train, self.y_train, cv=5, scoring='r2').mean()
        
        logger.info(f"  Train MAE: {mean_absolute_error(self.y_train, y_pred_train):.2f} days")
        logger.info(f"  Test MAE: {mae:.2f} days")
        logger.info(f"  Test RMSE: {rmse:.2f} days")
        logger.info(f"  Test R² Score: {r2:.4f}")
        logger.info(f"  Cross-validation R²: {cv_score:.4f}")
        
        self.models['Gradient Boosting'] = model
        self.results['Gradient Boosting'] = {
            'MAE': mae,
            'RMSE': rmse,
            'R2': r2,
            'CV_Score': cv_score,
            'y_pred': y_pred_test,
            'feature_importance': model.feature_importances_
        }
        
        return model
    
    def train_svr(self):
        """Train Support Vector Regressor"""
        logger.info("\n" + "-"*70)
        logger.info("TRAINING: Support Vector Regressor (SVR)")
        logger.info("-"*70)
        
        model = SVR(kernel='rbf', C=100, epsilon=0.1)
        model.fit(self.X_train, self.y_train)
        
        # Predictions
        y_pred_train = model.predict(self.X_train)
        y_pred_test = model.predict(self.X_test)
        
        # Evaluate
        mae = mean_absolute_error(self.y_test, y_pred_test)
        rmse = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2 = r2_score(self.y_test, y_pred_test)
        cv_score = cross_val_score(model, self.X_train, self.y_train, cv=5, scoring='r2').mean()
        
        logger.info(f"  Train MAE: {mean_absolute_error(self.y_train, y_pred_train):.2f} days")
        logger.info(f"  Test MAE: {mae:.2f} days")
        logger.info(f"  Test RMSE: {rmse:.2f} days")
        logger.info(f"  Test R² Score: {r2:.4f}")
        logger.info(f"  Cross-validation R²: {cv_score:.4f}")
        
        self.models['SVR'] = model
        self.results['SVR'] = {
            'MAE': mae,
            'RMSE': rmse,
            'R2': r2,
            'CV_Score': cv_score,
            'y_pred': y_pred_test
        }
        
        return model
    
    def get_best_model(self):
        """Get best model based on R2 score"""
        logger.info("\n" + "="*70)
        logger.info("MODEL COMPARISON")
        logger.info("="*70)
        
        logger.info("\nModel Performance Metrics:")
        logger.info("-"*70)
        logger.info(f"{'Model':<25} {'MAE':<12} {'RMSE':<12} {'R2':<12} {'CV R2':<12}")
        logger.info("-"*70)
        
        best_model_name = None
        best_r2 = -float('inf')
        
        for model_name, metrics in self.results.items():
            mae = metrics['MAE']
            rmse = metrics['RMSE']
            r2 = metrics['R2']
            cv = metrics['CV_Score']
            
            logger.info(f"{model_name:<25} {mae:<12.2f} {rmse:<12.2f} {r2:<12.4f} {cv:<12.4f}")
            
            if r2 > best_r2:
                best_r2 = r2
                best_model_name = model_name
        
        logger.info("-"*70)
        logger.info(f"\n🏆 Best Model: {best_model_name} (R² = {best_r2:.4f})")
        
        return best_model_name, self.models[best_model_name]
    
    def run_all_training(self):
        """Run all model training"""
        logger.info("\n" + "="*70)
        logger.info("MILESTONE 3: PREDICTIVE MODELING - MODEL TRAINING")
        logger.info("="*70)
        
        # Prepare data
        if not self.prepare_data():
            return None
        
        # Train all models
        self.train_linear_regression()
        self.train_random_forest()
        self.train_gradient_boosting()
        self.train_svr()
        
        # Get best model
        best_model_name, best_model = self.get_best_model()
        
        return best_model_name, best_model