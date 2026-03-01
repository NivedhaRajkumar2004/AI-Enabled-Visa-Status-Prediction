import pandas as pd
import numpy as np
from src.logger import logger

class AdvancedFeatureEngineering:
    """Advanced feature engineering for better predictions"""
    
    def __init__(self, df):
        self.df = df.copy()
        self.engineered_features = {}
    
    def create_seasonal_features(self):
        """Create seasonal features from application date"""
        logger.info("\n[FEATURE 1] Creating seasonal features...")
        
        if 'application_date_month' not in self.df.columns:
            return self.df
        
        # Seasonal mapping
        def get_season(month):
            if month in [12, 1, 2]:
                return 'Winter'
            elif month in [3, 4, 5]:
                return 'Spring'
            elif month in [6, 7, 8]:
                return 'Summer'
            else:
                return 'Fall'
        
        self.df['application_season'] = self.df['application_date_month'].apply(get_season)
        logger.info("  ✓ Created: application_season")
        
        # Is summer flag
        self.df['is_summer'] = (self.df['application_date_month'].isin([6, 7, 8])).astype(int)
        logger.info("  ✓ Created: is_summer")
        
        # Is peak hiring season (March-May)
        self.df['is_peak_hiring'] = (self.df['application_date_month'].isin([3, 4, 5])).astype(int)
        logger.info("  ✓ Created: is_peak_hiring")
        
        self.engineered_features['seasonal'] = ['application_season', 'is_summer', 'is_peak_hiring']
        return self.df
    
    def create_nationality_aggregates(self):
        """Create nationality-based aggregate features"""
        logger.info("\n[FEATURE 2] Creating nationality aggregate features...")
        
        if 'nationality' not in self.df.columns:
            return self.df
        
        # Average salary by nationality
        nat_salary = self.df.groupby('nationality')['annual_income_usd'].mean()
        self.df['nationality_avg_salary'] = self.df['nationality'].map(nat_salary)
        logger.info("  ✓ Created: nationality_avg_salary")
        
        # Approval rate by nationality
        if 'visa_status' in self.df.columns:
            nat_approval = self.df.groupby('nationality')['visa_status'].apply(
                lambda x: (x == 'Approved').sum() / len(x)
            )
            self.df['nationality_approval_rate'] = self.df['nationality'].map(nat_approval)
            logger.info("  ✓ Created: nationality_approval_rate")
        
        # Application count by nationality (popularity)
        nat_count = self.df['nationality'].value_counts()
        self.df['nationality_application_count'] = self.df['nationality'].map(nat_count)
        logger.info("  ✓ Created: nationality_application_count")
        
        self.engineered_features['nationality_agg'] = [
            'nationality_avg_salary', 
            'nationality_approval_rate', 
            'nationality_application_count'
        ]
        return self.df
    
    def create_industry_aggregates(self):
        """Create industry-based aggregate features"""
        logger.info("\n[FEATURE 3] Creating industry aggregate features...")
        
        if 'naics_title' not in self.df.columns:
            return self.df
        
        # Average salary by industry
        ind_salary = self.df.groupby('naics_title')['annual_income_usd'].mean()
        self.df['industry_avg_salary'] = self.df['naics_title'].map(ind_salary)
        logger.info("  ✓ Created: industry_avg_salary")
        
        # Approval rate by industry
        if 'visa_status' in self.df.columns:
            ind_approval = self.df.groupby('naics_title')['visa_status'].apply(
                lambda x: (x == 'Approved').sum() / len(x)
            )
            self.df['industry_approval_rate'] = self.df['naics_title'].map(ind_approval)
            logger.info("  ✓ Created: industry_approval_rate")
        
        # Application count by industry
        ind_count = self.df['naics_title'].value_counts()
        self.df['industry_application_count'] = self.df['naics_title'].map(ind_count)
        logger.info("  ✓ Created: industry_application_count")
        
        self.engineered_features['industry_agg'] = [
            'industry_avg_salary',
            'industry_approval_rate',
            'industry_application_count'
        ]
        return self.df
    
    def create_salary_features(self):
        """Create salary-based engineered features"""
        logger.info("\n[FEATURE 4] Creating salary-based features...")
        
        if 'annual_income_usd' not in self.df.columns:
            return self.df
        
        # Salary categories
        def salary_category(salary):
            if salary < 50000:
                return 'Low'
            elif salary < 100000:
                return 'Medium'
            elif salary < 150000:
                return 'High'
            else:
                return 'Very High'
        
        self.df['salary_category'] = self.df['annual_income_usd'].apply(salary_category)
        logger.info("  ✓ Created: salary_category")
        
        # Salary percentile
        self.df['salary_percentile'] = self.df['annual_income_usd'].rank(pct=True)
        logger.info("  ✓ Created: salary_percentile")
        
        # Salary deviation from mean
        mean_salary = self.df['annual_income_usd'].mean()
        self.df['salary_deviation'] = self.df['annual_income_usd'] - mean_salary
        logger.info("  ✓ Created: salary_deviation")
        
        # Is high earner
        self.df['is_high_earner'] = (self.df['annual_income_usd'] > self.df['annual_income_usd'].quantile(0.75)).astype(int)
        logger.info("  ✓ Created: is_high_earner")
        
        self.engineered_features['salary'] = [
            'salary_category',
            'salary_percentile',
            'salary_deviation',
            'is_high_earner'
        ]
        return self.df
    
    def create_education_features(self):
        """Create education-based features"""
        logger.info("\n[FEATURE 5] Creating education-based features...")
        
        if 'job_info_education' not in self.df.columns:
            return self.df
        
        # Education level ranking
        education_rank = {
            'High School': 1,
            'Bachelor\'s': 2,
            'Master\'s': 3,
            'PhD': 4,
            'Doctorate': 4
        }
        
        self.df['education_level_rank'] = self.df['job_info_education'].map(education_rank).fillna(0)
        logger.info("  ✓ Created: education_level_rank")
        
        # Is advanced degree required
        self.df['requires_advanced_degree'] = self.df['job_info_education'].isin(['Master\'s', 'PhD', 'Doctorate']).astype(int)
        logger.info("  ✓ Created: requires_advanced_degree")
        
        self.engineered_features['education'] = [
            'education_level_rank',
            'requires_advanced_degree'
        ]
        return self.df
    
    def create_processing_center_features(self):
        """Create processing center features"""
        logger.info("\n[FEATURE 6] Creating processing center features...")
        
        if 'processing_center' not in self.df.columns:
            return self.df
        
        # Processing center approval rate
        if 'visa_status' in self.df.columns:
            center_approval = self.df.groupby('processing_center')['visa_status'].apply(
                lambda x: (x == 'Approved').sum() / len(x)
            )
            self.df['center_approval_rate'] = self.df['processing_center'].map(center_approval)
            logger.info("  ✓ Created: center_approval_rate")
        
        # Processing center workload
        center_count = self.df['processing_center'].value_counts()
        self.df['center_workload'] = self.df['processing_center'].map(center_count)
        logger.info("  ✓ Created: center_workload")
        
        self.engineered_features['center'] = [
            'center_approval_rate',
            'center_workload'
        ]
        return self.df
    
    def create_interaction_features(self):
        """Create interaction features"""
        logger.info("\n[FEATURE 7] Creating interaction features...")
        
        # Salary x Industry
        if 'annual_income_usd' in self.df.columns and 'industry_avg_salary' in self.df.columns:
            self.df['salary_vs_industry_avg'] = (self.df['annual_income_usd'] / 
                                                  (self.df['industry_avg_salary'] + 1))
            logger.info("  ✓ Created: salary_vs_industry_avg")
        
        # High salary + Peak season
        if 'is_high_earner' in self.df.columns and 'is_peak_hiring' in self.df.columns:
            self.df['high_earner_peak_season'] = (self.df['is_high_earner'] * self.df['is_peak_hiring'])
            logger.info("  ✓ Created: high_earner_peak_season")
        
        self.engineered_features['interaction'] = [
            'salary_vs_industry_avg',
            'high_earner_peak_season'
        ]
        return self.df
    
    def run_all_engineering(self):
        """Run all feature engineering"""
        logger.info("\n" + "="*70)
        logger.info("ADVANCED FEATURE ENGINEERING")
        logger.info("="*70)
        
        self.create_seasonal_features()
        self.create_nationality_aggregates()
        self.create_industry_aggregates()
        self.create_salary_features()
        self.create_education_features()
        self.create_processing_center_features()
        self.create_interaction_features()
        
        logger.info("\n" + "-"*70)
        logger.info("FEATURE ENGINEERING SUMMARY")
        logger.info("-"*70)
        
        total_new_features = sum(len(v) for v in self.engineered_features.values())
        logger.info(f"\nTotal new features created: {total_new_features}")
        
        for category, features in self.engineered_features.items():
            logger.info(f"\n{category.upper()}:")
            for feature in features:
                logger.info(f"  - {feature}")
        
        logger.info(f"\nOriginal columns: 12")
        logger.info(f"New engineered features: {total_new_features}")
        logger.info(f"Final dataset columns: {len(self.df.columns)}")
        
        return self.df