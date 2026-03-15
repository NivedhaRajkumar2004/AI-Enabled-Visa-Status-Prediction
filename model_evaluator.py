import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from src.logger import logger
from src.config import PROCESSED_DATA_DIR

class ModelEvaluator:
    """Evaluate model performance"""
    
    def __init__(self, y_test, results):
        self.y_test = y_test
        self.results = results
        sns.set_style("whitegrid")
    
    def plot_predictions(self):
        """Plot actual vs predicted values"""
        logger.info("\nGenerating: Predictions visualization...")
        
        fig, axes = plt.subplots(2, 2, figsize=(14, 10))
        axes = axes.flatten()
        
        for idx, (model_name, metrics) in enumerate(self.results.items()):
            y_pred = metrics['y_pred']
            
            axes[idx].scatter(self.y_test, y_pred, alpha=0.5, s=30)
            axes[idx].plot([self.y_test.min(), self.y_test.max()], 
                          [self.y_test.min(), self.y_test.max()], 
                          'r--', lw=2)
            
            r2 = metrics['R2']
            mae = metrics['MAE']
            
            axes[idx].set_xlabel('Actual Processing Time (days)')
            axes[idx].set_ylabel('Predicted Processing Time (days)')
            axes[idx].set_title(f'{model_name}\nR² = {r2:.4f}, MAE = {mae:.2f}')
            axes[idx].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(PROCESSED_DATA_DIR / 'model_predictions.png', dpi=300, bbox_inches='tight')
        logger.info("  ✓ Saved: model_predictions.png")
        plt.close()
    
    def plot_residuals(self):
        """Plot residual analysis"""
        logger.info("\nGenerating: Residuals visualization...")
        
        fig, axes = plt.subplots(2, 2, figsize=(14, 10))
        axes = axes.flatten()
        
        for idx, (model_name, metrics) in enumerate(self.results.items()):
            y_pred = metrics['y_pred']
            residuals = self.y_test - y_pred
            
            axes[idx].scatter(y_pred, residuals, alpha=0.5, s=30)
            axes[idx].axhline(y=0, color='r', linestyle='--', lw=2)
            
            axes[idx].set_xlabel('Predicted Values')
            axes[idx].set_ylabel('Residuals')
            axes[idx].set_title(f'{model_name} - Residual Plot')
            axes[idx].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(PROCESSED_DATA_DIR / 'model_residuals.png', dpi=300, bbox_inches='tight')
        logger.info("  ✓ Saved: model_residuals.png")
        plt.close()
    
    def plot_error_distribution(self):
        """Plot error distribution"""
        logger.info("\nGenerating: Error distribution visualization...")
        
        fig, axes = plt.subplots(2, 2, figsize=(14, 10))
        axes = axes.flatten()
        
        for idx, (model_name, metrics) in enumerate(self.results.items()):
            y_pred = metrics['y_pred']
            errors = np.abs(self.y_test - y_pred)
            
            axes[idx].hist(errors, bins=30, color='#3498db', edgecolor='black', alpha=0.7)
            axes[idx].set_xlabel('Absolute Error (days)')
            axes[idx].set_ylabel('Frequency')
            axes[idx].set_title(f'{model_name} - Error Distribution')
            axes[idx].axvline(errors.mean(), color='r', linestyle='--', 
                             label=f'Mean: {errors.mean():.2f}')
            axes[idx].legend()
            axes[idx].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(PROCESSED_DATA_DIR / 'model_errors.png', dpi=300, bbox_inches='tight')
        logger.info("  ✓ Saved: model_errors.png")
        plt.close()
    
    def plot_model_comparison(self):
        """Plot model performance comparison"""
        logger.info("\nGenerating: Model comparison visualization...")
        
        models = list(self.results.keys())
        maes = [self.results[m]['MAE'] for m in models]
        rmses = [self.results[m]['RMSE'] for m in models]
        r2s = [self.results[m]['R2'] for m in models]
        
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        
        # MAE comparison
        axes[0].bar(models, maes, color='#3498db', edgecolor='black')
        axes[0].set_ylabel('Mean Absolute Error (days)')
        axes[0].set_title('MAE Comparison')
        axes[0].tick_params(axis='x', rotation=45)
        for i, v in enumerate(maes):
            axes[0].text(i, v, f'{v:.2f}', ha='center', va='bottom')
        
        # RMSE comparison
        axes[1].bar(models, rmses, color='#e74c3c', edgecolor='black')
        axes[1].set_ylabel('Root Mean Squared Error (days)')
        axes[1].set_title('RMSE Comparison')
        axes[1].tick_params(axis='x', rotation=45)
        for i, v in enumerate(rmses):
            axes[1].text(i, v, f'{v:.2f}', ha='center', va='bottom')
        
        # R2 comparison
        axes[2].bar(models, r2s, color='#2ecc71', edgecolor='black')
        axes[2].set_ylabel('R² Score')
        axes[2].set_title('R² Score Comparison')
        axes[2].set_ylim(0, 1)
        axes[2].tick_params(axis='x', rotation=45)
        for i, v in enumerate(r2s):
            axes[2].text(i, v, f'{v:.4f}', ha='center', va='bottom')
        
        plt.tight_layout()
        plt.savefig(PROCESSED_DATA_DIR / 'model_comparison.png', dpi=300, bbox_inches='tight')
        logger.info("  ✓ Saved: model_comparison.png")
        plt.close()
    
    def generate_report(self):
        """Generate evaluation report"""
        logger.info("\n" + "="*70)
        logger.info("DETAILED MODEL EVALUATION REPORT")
        logger.info("="*70)
        
        for model_name, metrics in self.results.items():
            logger.info(f"\n{model_name.upper()}")
            logger.info("-"*70)
            logger.info(f"  Mean Absolute Error (MAE):     {metrics['MAE']:.2f} days")
            logger.info(f"  Root Mean Squared Error (RMSE): {metrics['RMSE']:.2f} days")
            logger.info(f"  R² Score:                       {metrics['R2']:.4f}")
            logger.info(f"  Cross-validation R²:            {metrics['CV_Score']:.4f}")
            
            y_pred = metrics['y_pred']
            errors = np.abs(self.y_test - y_pred)
            logger.info(f"\n  Error Statistics:")
            logger.info(f"    Mean Error:     {errors.mean():.2f} days")
            logger.info(f"    Median Error:   {np.median(errors):.2f} days")
            logger.info(f"    Std Dev Error:  {errors.std():.2f} days")
            logger.info(f"    Min Error:      {errors.min():.2f} days")
            logger.info(f"    Max Error:      {errors.max():.2f} days")
            logger.info(f"    90% within:     {np.percentile(errors, 90):.2f} days")
    
    def run_evaluation(self):
        """Run all evaluations"""
        logger.info("\n" + "="*70)
        logger.info("MILESTONE 3: MODEL EVALUATION")
        logger.info("="*70)
        
        self.plot_predictions()
        self.plot_residuals()
        self.plot_error_distribution()
        self.plot_model_comparison()
        self.generate_report()
        
        logger.info("\n" + "="*70)
        logger.info("✓ EVALUATION COMPLETE")
        logger.info("="*70)