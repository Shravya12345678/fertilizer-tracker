import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)

# Load dataset
df = pd.read_csv('../data/thermal_dataset.csv')

print("="*60)
print("THERMAL DATASET EXPLORATION")
print("="*60)

# Basic info
print(f"\nDataset Shape: {df.shape}")
print(f"\nColumn Names:")
print(df.columns.tolist())

print(f"\nFirst 5 rows:")
print(df.head())

print(f"\nData Types:")
print(df.dtypes)

print(f"\nMissing Values:")
print(df.isnull().sum())

# Statistical summary
print(f"\nStatistical Summary:")
print(df.describe())

# Visualizations
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle('Thermal Dataset Analysis', fontsize=16)

# 1. Efficiency Score Distribution
axes[0, 0].hist(df['efficiency_score'], bins=30, edgecolor='black')
axes[0, 0].set_title('Efficiency Score Distribution')
axes[0, 0].set_xlabel('Efficiency Score')
axes[0, 0].set_ylabel('Frequency')

# 2. Thermal Delta Distribution
axes[0, 1].hist(df['thermal_delta'], bins=30, edgecolor='black', color='orange')
axes[0, 1].set_title('Thermal Delta Distribution')
axes[0, 1].set_xlabel('Thermal Delta (°C)')
axes[0, 1].set_ylabel('Frequency')

# 3. NPK Distribution
axes[0, 2].boxplot([df['N'], df['P'], df['K']], labels=['N', 'P', 'K'])
axes[0, 2].set_title('NPK Distribution')
axes[0, 2].set_ylabel('Value')

# 4. Health Status vs Efficiency
health_efficiency = df.groupby('health_status')['efficiency_score'].mean()
axes[1, 0].bar(health_efficiency.index, health_efficiency.values)
axes[1, 0].set_title('Health Status vs Avg Efficiency')
axes[1, 0].set_ylabel('Avg Efficiency Score')

# 5. Deficiency Distribution
deficiency_counts = df['deficiency'].value_counts()
axes[1, 1].pie(deficiency_counts.values, labels=deficiency_counts.index, autopct='%1.1f%%')
axes[1, 1].set_title('Deficiency Distribution')

# 6. Thermal Delta vs Efficiency
axes[1, 2].scatter(df['thermal_delta'], df['efficiency_score'], alpha=0.5)
axes[1, 2].set_title('Thermal Delta vs Efficiency')
axes[1, 2].set_xlabel('Thermal Delta (°C)')
axes[1, 2].set_ylabel('Efficiency Score')

plt.tight_layout()
plt.savefig('../data/dataset_exploration.png', dpi=300, bbox_inches='tight')
print("\n✅ Visualization saved to: data/dataset_exploration.png")

plt.show()

# Correlation analysis
print("\n" + "="*60)
print("CORRELATION ANALYSIS")
print("="*60)

numeric_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall',
                'thermal_delta', 'efficiency_score', 'green_ratio']

correlation = df[numeric_cols].corr()

plt.figure(figsize=(12, 10))
sns.heatmap(correlation, annot=True, fmt='.2f', cmap='coolwarm', center=0)
plt.title('Feature Correlation Heatmap')
plt.tight_layout()
plt.savefig('../data/correlation_heatmap.png', dpi=300, bbox_inches='tight')
print("✅ Correlation heatmap saved to: data/correlation_heatmap.png")
plt.show()

print("\n✅ Data exploration complete!")