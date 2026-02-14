"""
Main entry point to run the data processing pipeline
"""

from src.pipeline import DataPipeline

if __name__ == "__main__":
    pipeline = DataPipeline()
    processed_df = pipeline.run()
    
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    print(f"Processed data shape: {processed_df.shape}")
    print(f"Output file: data/processed/visa_applications_processed.csv")
    print("="*70 + "\n")