"""
Remove data leakage from processed dataset
Run this after run_pipeline.py
"""

from src.remove_data_leakage import DataLeakageRemover

if __name__ == "__main__":
    remover = DataLeakageRemover()
    ml_ready_df = remover.run()
    
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    print(f"ML-Ready dataset shape: {ml_ready_df.shape}")
    print(f"Output file: data/processed/visa_applications_ml_ready.csv")
    print("="*70 + "\n")