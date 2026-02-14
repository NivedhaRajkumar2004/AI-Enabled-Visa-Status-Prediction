import pandas as pd
import numpy as np
import re
from src.logger import logger
from src.config import MISSING_VALUE_THRESHOLD, OUTLIER_METHOD

class DataCleaner:
    """Advanced data cleaning with data quality fixes"""
    
    def __init__(self, df):
        self.df = df.copy()
        self.cleaning_log = {}
        
        # State abbreviation to full name mapping
        self.state_mapping = {
            'AL': 'ALABAMA', 'AK': 'ALASKA', 'AZ': 'ARIZONA', 'AR': 'ARKANSAS',
            'CA': 'CALIFORNIA', 'CO': 'COLORADO', 'CT': 'CONNECTICUT', 'DE': 'DELAWARE',
            'FL': 'FLORIDA', 'GA': 'GEORGIA', 'HI': 'HAWAII', 'ID': 'IDAHO',
            'IL': 'ILLINOIS', 'IN': 'INDIANA', 'IA': 'IOWA', 'KS': 'KANSAS',
            'KY': 'KENTUCKY', 'LA': 'LOUISIANA', 'ME': 'MAINE', 'MD': 'MARYLAND',
            'MA': 'MASSACHUSETTS', 'MI': 'MICHIGAN', 'MN': 'MINNESOTA', 'MS': 'MISSISSIPPI',
            'MO': 'MISSOURI', 'MT': 'MONTANA', 'NE': 'NEBRASKA', 'NV': 'NEVADA',
            'NH': 'NEW HAMPSHIRE', 'NJ': 'NEW JERSEY', 'NM': 'NEW MEXICO', 'NY': 'NEW YORK',
            'NC': 'NORTH CAROLINA', 'ND': 'NORTH DAKOTA', 'OH': 'OHIO', 'OK': 'OKLAHOMA',
            'OR': 'OREGON', 'PA': 'PENNSYLVANIA', 'RI': 'RHODE ISLAND', 'SC': 'SOUTH CAROLINA',
            'SD': 'SOUTH DAKOTA', 'TN': 'TENNESSEE', 'TX': 'TEXAS', 'UT': 'UTAH',
            'VT': 'VERMONT', 'VA': 'VIRGINIA', 'WA': 'WASHINGTON', 'WV': 'WEST VIRGINIA',
            'WI': 'WISCONSIN', 'WY': 'WYOMING'
        }
    
    def clean_salary(self):
        """Clean salary column - handle format issues and unrealistic values"""
        logger.info("\n[STEP 2A] Cleaning salary column...")
        
        salary_cols = [col for col in self.df.columns if 'income' in col.lower() or 'salary' in col.lower()]
        
        for col in salary_cols:
            if col not in self.df.columns:
                continue
            
            initial_count = self.df[col].notna().sum()
            
            # Convert to string for processing
            self.df[col] = self.df[col].astype(str)
            
            # Remove commas: "1,09,600.00" -> "109600.00"
            self.df[col] = self.df[col].str.replace(',', '')
            
            # Try to convert to float
            try:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')
            except:
                pass
            
            # Fix unrealistic values (less than 1000 or greater than 1000000)
            unrealistic = ((self.df[col] < 1000) | (self.df[col] > 1000000)).sum()
            if unrealistic > 0:
                logger.info(f"  Unrealistic salary values detected: {unrealistic}")
                self.df.loc[(self.df[col] < 1000) | (self.df[col] > 1000000), col] = np.nan
            
            logger.info(f"  ✓ Fixed salary column: {col}")
            
            if self.df[col].notna().sum() > 0:
                logger.info(f"  Salary range: ${self.df[col].min():.2f} - ${self.df[col].max():.2f}")
    
    def clean_education(self):
        """Clean education columns - remove duplicates, standardize"""
        logger.info("\n[STEP 2B] Cleaning education columns...")
        
        education_cols = [col for col in self.df.columns if 'education' in col.lower()]
        
        if len(education_cols) > 1:
            # Keep the main one, remove duplicates
            logger.info(f"  Multiple education columns found: {education_cols}")
            primary_col = education_cols[0]
            
            # Fill missing in primary from secondary if available
            for secondary_col in education_cols[1:]:
                mask = self.df[primary_col].isna() & self.df[secondary_col].notna()
                self.df.loc[mask, primary_col] = self.df.loc[mask, secondary_col]
                self.df = self.df.drop(secondary_col, axis=1)
            
            logger.info(f"  ✓ Kept primary column: {primary_col}")
        
        # Fill missing education values with mode
        for col in education_cols:
            if col in self.df.columns:
                missing = self.df[col].isna().sum()
                if missing > 0:
                    mode_val = self.df[col].mode()[0] if len(self.df[col].mode()) > 0 else 'Bachelor\'s'
                    self.df[col].fillna(mode_val, inplace=True)
                    logger.info(f"  ✓ Filled {missing} missing education values with mode: {mode_val}")
    
    def standardize_states(self):
        """Standardize state abbreviations to full names"""
        logger.info("\n[STEP 2C] Standardizing state names...")
        
        state_cols = [col for col in self.df.columns if 'state' in col.lower()]
        
        for col in state_cols:
            if col not in self.df.columns:
                continue
            
            # Convert to uppercase for matching
            self.df[col] = self.df[col].str.upper()
            
            # Replace abbreviations with full names
            self.df[col] = self.df[col].map(lambda x: self.state_mapping.get(x, x) if pd.notna(x) else x)
            
            converted = sum(self.df[col].isin(self.state_mapping.values()))
            logger.info(f"  ✓ Converted state abbreviations in '{col}'")
    
    def clean_missing_values(self):
        """Handle missing values intelligently"""
        logger.info("\n[STEP 3] Handling missing values...")
        
        # Numeric columns: fill with median
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if self.df[col].isnull().sum() > 0:
                median_val = self.df[col].median()
                self.df[col].fillna(median_val, inplace=True)
                logger.info(f"  ✓ Filled '{col}' with median: {median_val:.2f}")
        
        # Categorical columns: fill with mode
        categorical_cols = self.df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if self.df[col].isnull().sum() > 0:
                mode_val = self.df[col].mode()[0] if len(self.df[col].mode()) > 0 else 'Unknown'
                self.df[col].fillna(mode_val, inplace=True)
                logger.info(f"  ✓ Filled '{col}' with mode: {mode_val}")
        
        logger.info(f"  Remaining missing values: {self.df.isnull().sum().sum()}")
        return self.df
    
    def remove_duplicates(self):
        """Remove duplicate rows"""
        logger.info("\n[STEP 4] Removing duplicates...")
        
        initial_rows = len(self.df)
        self.df = self.df.drop_duplicates()
        removed = initial_rows - len(self.df)
        
        logger.info(f"  ✓ Removed {removed} duplicate rows")
        logger.info(f"  Remaining rows: {len(self.df)}")
        
        return self.df
    
    def remove_outliers(self):
        """Remove outliers using IQR method"""
        logger.info("\n[STEP 5] Detecting and removing outliers...")
        
        initial_rows = len(self.df)
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            Q1 = self.df[col].quantile(0.25)
            Q3 = self.df[col].quantile(0.75)
            IQR = Q3 - Q1
            
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers = ((self.df[col] < lower_bound) | (self.df[col] > upper_bound)).sum()
            if outliers > 0:
                logger.info(f"  Found {outliers} outliers in '{col}'")
                self.df = self.df[(self.df[col] >= lower_bound) & (self.df[col] <= upper_bound)]
        
        removed = initial_rows - len(self.df)
        logger.info(f"  ✓ Removed {removed} rows with outliers")
        
        return self.df
    
    def get_cleaned_df(self):
        """Return cleaned dataframe"""
        return self.df