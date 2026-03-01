import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from src.logger import logger
from src.config import PROCESSED_DATA_DIR

class ExploratoryDataAnalysis:
    """Comprehensive EDA with visualizations"""
    
    def __init__(self, df):
        self.df = df.copy()
        self.insights = {}
        sns.set_style("whitegrid")
        plt.rcParams['figure.figsize'] = (12, 6)
    
    def basic_statistics(self):
        """Generate basic statistics"""
        logger.info("\n" + "="*70)
        logger.info("EXPLORATORY DATA ANALYSIS - BASIC STATISTICS")
        logger.info("="*70)
        
        logger.info(f"\nDataset Shape: {self.df.shape[0]} rows × {self.df.shape[1]} columns")
        
        # Numeric columns stats
        logger.info("\n[NUMERIC FEATURES STATISTICS]")
        numeric_stats = self.df.describe()
        logger.info(f"\n{numeric_stats}")
        
        # Categorical columns stats
        logger.info("\n[CATEGORICAL FEATURES STATISTICS]")
        categorical_cols = self.df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            unique_count = self.df[col].nunique()
            logger.info(f"\n{col}:")
            logger.info(f"  Unique values: {unique_count}")
            logger.info(f"  Top 5 values:")
            for idx, (val, count) in enumerate(self.df[col].value_counts().head().items(), 1):
                logger.info(f"    {idx}. {val}: {count}")
        
        self.insights['basic_stats'] = numeric_stats.to_dict()
    
    def missing_value_analysis(self):
        """Analyze remaining missing values"""
        logger.info("\n" + "-"*70)
        logger.info("MISSING VALUE ANALYSIS")
        logger.info("-"*70)
        
        missing = self.df.isnull().sum()
        if missing.sum() == 0:
            logger.info("✓ No missing values - Dataset is complete!")
        else:
            logger.info("Missing values found:")
            for col, count in missing[missing > 0].items():
                pct = (count / len(self.df)) * 100
                logger.info(f"  {col}: {count} ({pct:.2f}%)")
        
        self.insights['missing'] = missing.to_dict()
    
    def target_variable_analysis(self):
        """Analyze target variable distribution"""
        logger.info("\n" + "-"*70)
        logger.info("TARGET VARIABLE ANALYSIS")
        logger.info("-"*70)
        
        if 'visa_status' in self.df.columns:
            logger.info("\nVisa Status Distribution:")
            status_counts = self.df['visa_status'].value_counts()
            
            for status, count in status_counts.items():
                pct = (count / len(self.df)) * 100
                logger.info(f"  {status}: {count} ({pct:.1f}%)")
            
            self.insights['visa_status'] = status_counts.to_dict()
        
        if 'processing_time_days' in self.df.columns:
            logger.info("\nProcessing Time Statistics (days):")
            logger.info(f"  Mean: {self.df['processing_time_days'].mean():.1f}")
            logger.info(f"  Median: {self.df['processing_time_days'].median():.1f}")
            logger.info(f"  Std Dev: {self.df['processing_time_days'].std():.1f}")
            logger.info(f"  Min: {self.df['processing_time_days'].min():.1f}")
            logger.info(f"  Max: {self.df['processing_time_days'].max():.1f}")
    
    def correlation_analysis(self):
        """Analyze correlations between numeric features"""
        logger.info("\n" + "-"*70)
        logger.info("CORRELATION ANALYSIS")
        logger.info("-"*70)
        
        numeric_df = self.df.select_dtypes(include=[np.number])
        
        if len(numeric_df.columns) > 1:
            corr_matrix = numeric_df.corr()
            
            logger.info("\nTop correlations with target variable:")
            if 'processing_time_days' in numeric_df.columns:
                target_corr = corr_matrix['processing_time_days'].sort_values(ascending=False)
                logger.info(f"\nCorrelations with 'processing_time_days':")
                for feature, corr_val in target_corr.items():
                    if feature != 'processing_time_days':
                        logger.info(f"  {feature}: {corr_val:.3f}")
            
            self.insights['correlations'] = corr_matrix.to_dict()
    
    def nationality_analysis(self):
        """Analyze visa approval by nationality"""
        logger.info("\n" + "-"*70)
        logger.info("NATIONALITY ANALYSIS")
        logger.info("-"*70)
        
        if 'nationality' in self.df.columns and 'visa_status' in self.df.columns:
            logger.info("\nTop 10 nationalities by application count:")
            top_nationalities = self.df['nationality'].value_counts().head(10)
            for idx, (nat, count) in enumerate(top_nationalities.items(), 1):
                logger.info(f"  {idx}. {nat}: {count}")
            
            # Approval rate by nationality
            logger.info("\nVisa approval rate by top nationalities:")
            for nat in top_nationalities.head(5).index:
                nat_data = self.df[self.df['nationality'] == nat]
                approved = (nat_data['visa_status'] == 'Approved').sum()
                total = len(nat_data)
                approval_rate = (approved / total) * 100
                logger.info(f"  {nat}: {approval_rate:.1f}% ({approved}/{total})")
    
    def job_category_analysis(self):
        """Analyze visa approval by job category"""
        logger.info("\n" + "-"*70)
        logger.info("JOB CATEGORY ANALYSIS")
        logger.info("-"*70)
        
        if 'naics_title' in self.df.columns and 'visa_status' in self.df.columns:
            logger.info("\nTop 10 industries by application count:")
            top_industries = self.df['naics_title'].value_counts().head(10)
            for idx, (ind, count) in enumerate(top_industries.items(), 1):
                logger.info(f"  {idx}. {ind}: {count}")
            
            logger.info("\nVisa approval rate by top industries:")
            for ind in top_industries.head(5).index:
                ind_data = self.df[self.df['naics_title'] == ind]
                approved = (ind_data['visa_status'] == 'Approved').sum()
                total = len(ind_data)
                approval_rate = (approved / total) * 100
                logger.info(f"  {ind}: {approval_rate:.1f}% ({approved}/{total})")
    
    def salary_analysis(self):
        """Analyze salary distribution and impact"""
        logger.info("\n" + "-"*70)
        logger.info("SALARY ANALYSIS")
        logger.info("-"*70)
        
        if 'annual_income_usd' in self.df.columns:
            logger.info("\nSalary Statistics:")
            logger.info(f"  Mean: ${self.df['annual_income_usd'].mean():,.2f}")
            logger.info(f"  Median: ${self.df['annual_income_usd'].median():,.2f}")
            logger.info(f"  Std Dev: ${self.df['annual_income_usd'].std():,.2f}")
            logger.info(f"  Min: ${self.df['annual_income_usd'].min():,.2f}")
            logger.info(f"  Max: ${self.df['annual_income_usd'].max():,.2f}")
            
            # Salary by visa status
            if 'visa_status' in self.df.columns:
                logger.info("\nAverage salary by visa status:")
                salary_by_status = self.df.groupby('visa_status')['annual_income_usd'].mean()
                for status, avg_salary in salary_by_status.items():
                    logger.info(f"  {status}: ${avg_salary:,.2f}")
    
    def temporal_analysis(self):
        """Analyze temporal patterns"""
        logger.info("\n" + "-"*70)
        logger.info("TEMPORAL ANALYSIS")
        logger.info("-"*70)
        
        if 'application_date_month' in self.df.columns:
            logger.info("\nApplications by month:")
            month_counts = self.df['application_date_month'].value_counts().sort_index()
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            for month_num, count in month_counts.items():
                logger.info(f"  {months[int(month_num)-1]}: {count}")
            
            # Approval rate by month
            if 'visa_status' in self.df.columns:
                logger.info("\nApproval rate by month:")
                for month_num in sorted(self.df['application_date_month'].unique()):
                    month_data = self.df[self.df['application_date_month'] == month_num]
                    approved = (month_data['visa_status'] == 'Approved').sum()
                    total = len(month_data)
                    approval_rate = (approved / total) * 100
                    logger.info(f"  {months[int(month_num)-1]}: {approval_rate:.1f}%")
    
    def run_all_analysis(self):
        """Run all EDA analyses"""
        self.basic_statistics()
        self.missing_value_analysis()
        self.target_variable_analysis()
        self.correlation_analysis()
        self.nationality_analysis()
        self.job_category_analysis()
        self.salary_analysis()
        self.temporal_analysis()
        
        logger.info("\n" + "="*70)
        logger.info("EDA COMPLETE")
        logger.info("="*70)