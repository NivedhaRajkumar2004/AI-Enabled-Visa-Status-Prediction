import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from src.logger import logger
from src.config import PROCESSED_DATA_DIR


class Visualizations:
    """Create visualizations for EDA"""

    def __init__(self, df):
        self.df = df.copy()
        sns.set_style("whitegrid")
        self.output_dir = PROCESSED_DATA_DIR

        # Create approved flag
        if "visa_status" in self.df.columns:
            self.df["is_approved"] = self.df["visa_status"].str.contains(
                "Certified", case=False, na=False
            )

    # -------------------------------------------------------
    # 1. Target Distribution
    # -------------------------------------------------------
    def plot_target_distribution(self):
        logger.info("Generating: Target variable distribution...")

        fig, axes = plt.subplots(1, 2, figsize=(14, 5))

        if "visa_status" in self.df.columns:
            status_counts = self.df["visa_status"].value_counts()

            axes[0].bar(status_counts.index, status_counts.values)
            axes[0].set_title("Visa Status Distribution", fontweight="bold")
            axes[0].set_ylabel("Count")

            for i, (status, count) in enumerate(status_counts.items()):
                pct = (count / len(self.df)) * 100
                axes[0].text(i, count, f"{pct:.1f}%", ha="center", va="bottom")

        if "processing_time_days" in self.df.columns:
            axes[1].hist(self.df["processing_time_days"], bins=30)
            axes[1].set_title("Processing Time Distribution", fontweight="bold")
            axes[1].set_xlabel("Days")

        plt.tight_layout()
        plt.savefig(self.output_dir / "viz_01_target_distribution.png", dpi=300)
        plt.close()

    # -------------------------------------------------------
    # 2. Nationality Analysis
    # -------------------------------------------------------
    def plot_nationality_analysis(self):
        logger.info("Generating: Nationality analysis...")

        if "nationality" not in self.df.columns:
            return

        fig, axes = plt.subplots(1, 2, figsize=(15, 6))

        top_nat = self.df["nationality"].value_counts().head(10)
        axes[0].barh(top_nat.index, top_nat.values)
        axes[0].set_title("Top 10 Nationalities by Application Count", fontweight="bold")
        axes[0].invert_yaxis()

        approval_by_nat = (
            self.df.groupby("nationality")["is_approved"]
            .mean() * 100
        )

        # Only include nationalities with enough applications
        counts = self.df["nationality"].value_counts()
        valid = counts[counts >= 50].index
        approval_by_nat = approval_by_nat.loc[valid].sort_values(ascending=False).head(10)

        axes[1].barh(approval_by_nat.index, approval_by_nat.values)
        axes[1].set_xlim(0, 100)
        axes[1].set_title("Top 10 Nationalities by Approval Rate", fontweight="bold")
        axes[1].invert_yaxis()

        plt.tight_layout()
        plt.savefig(self.output_dir / "viz_02_nationality_analysis.png", dpi=300)
        plt.close()

    # -------------------------------------------------------
    # 3. Industry Analysis (FIXED)
    # -------------------------------------------------------
    def plot_industry_analysis(self):
        logger.info("Generating: Industry analysis...")

        if "naics_title" not in self.df.columns:
            return

        fig, axes = plt.subplots(1, 2, figsize=(16, 6))

        # Top industries by count
        top_ind = self.df["naics_title"].value_counts().head(10)
        axes[0].barh(top_ind.index, top_ind.values)
        axes[0].set_title("Top 10 Industries by Application Count", fontweight="bold")
        axes[0].invert_yaxis()

        # Filter industries with enough applications
        industry_counts = self.df["naics_title"].value_counts()
        valid_industries = industry_counts[industry_counts >= 100].index

        filtered_df = self.df[self.df["naics_title"].isin(valid_industries)]

        approval_by_ind = (
            filtered_df.groupby("naics_title")["is_approved"]
            .mean() * 100
        ).sort_values(ascending=False).head(10)

        axes[1].barh(approval_by_ind.index, approval_by_ind.values)
        axes[1].set_xlim(0, 100)
        axes[1].set_title("Top 10 Industries by Approval Rate", fontweight="bold")
        axes[1].invert_yaxis()

        plt.tight_layout()
        plt.savefig(self.output_dir / "viz_03_industry_analysis.png", dpi=300)
        plt.close()

    # -------------------------------------------------------
    # 4. Salary Analysis
    # -------------------------------------------------------
    def plot_salary_analysis(self):
        logger.info("Generating: Salary analysis...")

        if "annual_income_usd" not in self.df.columns:
            return

        fig, axes = plt.subplots(1, 2, figsize=(14, 5))

        axes[0].hist(self.df["annual_income_usd"], bins=30)
        axes[0].set_title("Salary Distribution", fontweight="bold")

        salary_by_status = self.df.groupby("visa_status")["annual_income_usd"].mean()
        axes[1].bar(salary_by_status.index, salary_by_status.values)
        axes[1].set_title("Average Salary by Visa Status", fontweight="bold")

        plt.tight_layout()
        plt.savefig(self.output_dir / "viz_04_salary_analysis.png", dpi=300)
        plt.close()

    # -------------------------------------------------------
    # 5. Temporal Patterns
    # -------------------------------------------------------
    def plot_temporal_patterns(self):
        logger.info("Generating: Temporal patterns...")

        if "application_date_month" not in self.df.columns:
            return

        fig, axes = plt.subplots(1, 2, figsize=(14, 5))

        month_counts = self.df["application_date_month"].value_counts().sort_index()
        months = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"]

        axes[0].bar(month_counts.index, month_counts.values)
        axes[0].set_xticks(month_counts.index)
        axes[0].set_xticklabels([months[m-1] for m in month_counts.index])
        axes[0].set_title("Applications by Month", fontweight="bold")

        approval_by_month = (
            self.df.groupby("application_date_month")["is_approved"]
            .mean() * 100
        ).sort_index()

        axes[1].plot(approval_by_month.index, approval_by_month.values, marker="o")
        axes[1].set_xticks(approval_by_month.index)
        axes[1].set_xticklabels([months[m-1] for m in approval_by_month.index])
        axes[1].set_ylim(0, 100)
        axes[1].set_title("Approval Rate by Month", fontweight="bold")
        axes[1].set_ylabel("Approval Rate (%)")

        plt.tight_layout()
        plt.savefig(self.output_dir / "viz_05_temporal_patterns.png", dpi=300)
        plt.close()

    # -------------------------------------------------------
    # 6. Correlation Heatmap
    # -------------------------------------------------------
    def plot_correlation_heatmap(self):
        logger.info("Generating: Correlation heatmap...")

        numeric_df = self.df.select_dtypes(include=[np.number])

        if len(numeric_df.columns) > 1:
            corr_matrix = numeric_df.corr()

            plt.figure(figsize=(10, 8))
            sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", center=0)
            plt.title("Feature Correlation Heatmap", fontweight="bold")
            plt.tight_layout()
            plt.savefig(self.output_dir / "viz_06_correlation_heatmap.png", dpi=300)
            plt.close()

    # -------------------------------------------------------
    def generate_all_visualizations(self):
        logger.info("=" * 70)
        logger.info("GENERATING VISUALIZATIONS")
        logger.info("=" * 70)

        self.plot_target_distribution()
        self.plot_nationality_analysis()
        self.plot_industry_analysis()
        self.plot_salary_analysis()
        self.plot_temporal_patterns()
        self.plot_correlation_heatmap()

        logger.info("✓ ALL VISUALIZATIONS GENERATED")