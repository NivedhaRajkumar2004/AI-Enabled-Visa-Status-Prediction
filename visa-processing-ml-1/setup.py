from setuptools import setup, find_packages

setup(
    name="visa-processing-ml",
    version="1.0.0",
    description="Advanced visa processing application with ML pipeline",
    author="Your Name",
    packages=find_packages(),
    install_requires=[
        "pandas>=2.0.0",
        "numpy>=1.24.0",
        "scikit-learn>=1.3.0",
    ],
    python_requires=">=3.8",
)