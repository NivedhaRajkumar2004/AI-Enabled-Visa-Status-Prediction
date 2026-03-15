import pandas as pd
import numpy as np
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from src.logger import logger
import warnings

warnings.filterwarnings('ignore')


class HyperparameterTuning:
    """Hyperparameter tuning for regression models"""

    def __init__(self, X_train, X_test, y_train, y_test):
        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test
        self.best_models = {}
        self.tuning_results = {}

    def tune_gradient_boosting(self):
        """Tune Gradient Boosting Regressor"""

        logger.info("\n" + "=" * 70)
        logger.info("HYPERPARAMETER TUNING: GRADIENT BOOSTING REGRESSOR")
        logger.info("=" * 70)

        param_grid = {
            'n_estimators': [50, 100, 150],
            'learning_rate': [0.05, 0.1],
            'max_depth': [3, 4, 5],
            'min_samples_split': [2, 5],
            'min_samples_leaf': [1, 2],
            'subsample': [0.8, 1.0]
        }

        logger.info("\nParameter Grid:")
        logger.info(f"  n_estimators: {param_grid['n_estimators']}")
        logger.info(f"  learning_rate: {param_grid['learning_rate']}")
        logger.info(f"  max_depth: {param_grid['max_depth']}")

        logger.info("\n[STEP 1] Performing Fast RandomizedSearchCV...")

        gb_model = GradientBoostingRegressor(random_state=42)

        random_search = RandomizedSearchCV(
            estimator=gb_model,
            param_distributions=param_grid,
            n_iter=5,
            cv=2,
            scoring='r2',
            n_jobs=1,
            verbose=2,
            random_state=42
        )

        random_search.fit(self.X_train, self.y_train)

        logger.info(f"\n✓ RandomizedSearchCV completed")
        logger.info(f"  Best CV R² Score: {random_search.best_score_:.6f}")
        logger.info(f"  Best Parameters: {random_search.best_params_}")

        best_model = random_search.best_estimator_

        y_pred_train = best_model.predict(self.X_train)
        y_pred_test = best_model.predict(self.X_test)

        mae_train = mean_absolute_error(self.y_train, y_pred_train)
        mae_test = mean_absolute_error(self.y_test, y_pred_test)
        rmse_test = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2_test = r2_score(self.y_test, y_pred_test)

        logger.info("\n[FINAL EVALUATION]")
        logger.info(f"  Train MAE: {mae_train:.2f}")
        logger.info(f"  Test MAE: {mae_test:.2f}")
        logger.info(f"  Test RMSE: {rmse_test:.2f}")
        logger.info(f"  Test R² Score: {r2_test:.6f}")

        self.best_models['Gradient Boosting (Tuned)'] = best_model
        self.tuning_results['Gradient Boosting (Tuned)'] = {
            'MAE': mae_test,
            'RMSE': rmse_test,
            'R2': r2_test,
            'Best_Params': random_search.best_params_
        }

        return best_model, random_search.best_params_

    def tune_random_forest(self):
        """Tune Random Forest"""

        logger.info("\n" + "=" * 70)
        logger.info("HYPERPARAMETER TUNING: RANDOM FOREST REGRESSOR")
        logger.info("=" * 70)

        param_grid = {
            'n_estimators': [50, 100],
            'max_depth': [10, 15],
            'min_samples_split': [2, 5],
            'min_samples_leaf': [1, 2],
            'max_features': ['sqrt']
        }

        rf_model = RandomForestRegressor(random_state=42, n_jobs=-1)

        random_search = RandomizedSearchCV(
            estimator=rf_model,
            param_distributions=param_grid,
            n_iter=5,
            cv=2,
            scoring='r2',
            n_jobs=1,
            verbose=2,
            random_state=42
        )

        random_search.fit(self.X_train, self.y_train)

        best_model = random_search.best_estimator_

        y_pred_test = best_model.predict(self.X_test)

        mae_test = mean_absolute_error(self.y_test, y_pred_test)
        rmse_test = np.sqrt(mean_squared_error(self.y_test, y_pred_test))
        r2_test = r2_score(self.y_test, y_pred_test)

        logger.info(f"\n✓ Random Forest Best Params: {random_search.best_params_}")

        self.best_models['Random Forest (Tuned)'] = best_model
        self.tuning_results['Random Forest (Tuned)'] = {
            'MAE': mae_test,
            'RMSE': rmse_test,
            'R2': r2_test,
            'Best_Params': random_search.best_params_
        }

        return best_model, random_search.best_params_

    def compare_tuned_models(self):
        """Compare tuned models"""

        logger.info("\n" + "=" * 70)
        logger.info("TUNED MODELS COMPARISON")
        logger.info("=" * 70)

        best_model_name = None
        best_r2 = -float('inf')

        for model_name, metrics in self.tuning_results.items():
            logger.info(
                f"{model_name}: MAE={metrics['MAE']:.2f}, RMSE={metrics['RMSE']:.2f}, R2={metrics['R2']:.6f}"
            )

            if metrics['R2'] > best_r2:
                best_r2 = metrics['R2']
                best_model_name = model_name

        logger.info(f"\n🏆 Best Tuned Model: {best_model_name}")

        return best_model_name

    def run_all_tuning(self):
        """Run all tuning"""

        logger.info("\n" + "=" * 70)
        logger.info("MILESTONE 3 EXTENDED: HYPERPARAMETER TUNING")
        logger.info("=" * 70)

        self.tune_gradient_boosting()
        self.tune_random_forest()

        best_model_name = self.compare_tuned_models()

        logger.info("\n✓ HYPERPARAMETER TUNING COMPLETE")

        return best_model_name, self.best_models[best_model_name]