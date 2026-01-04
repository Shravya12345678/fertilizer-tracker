import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import (
    mean_squared_error, r2_score, mean_absolute_error,
    accuracy_score, classification_report, confusion_matrix
)
import matplotlib.pyplot as plt
import seaborn as sns
from preprocess_data import DataPreprocessor

class ModelTrainer:
    """
    Train ML models for fertilizer efficiency analysis
    """
    
    def __init__(self):
        self.efficiency_model = None
        self.deficiency_model = None
        self.preprocessor = DataPreprocessor()
        self.data = None
    
    def prepare_data(self):
        """Prepare data using preprocessor"""
        print("="*60)
        print("PREPARING DATA FOR TRAINING")
        print("="*60)
        
        self.data = self.preprocessor.prepare_all()
        return self.data
    
    def train_efficiency_model(self):
        """
        Train Random Forest Regressor for efficiency prediction
        """
        print("\n" + "="*60)
        print("TRAINING EFFICIENCY PREDICTION MODEL")
        print("="*60)
        
        X_train = self.data['efficiency']['X_train']
        X_test = self.data['efficiency']['X_test']
        y_train = self.data['efficiency']['y_train']
        y_test = self.data['efficiency']['y_test']
        
        # Initialize model (optimized for 4GB RAM)
        print("\nInitializing Random Forest Regressor...")
        self.efficiency_model = RandomForestRegressor(
            n_estimators=100,        # Number of trees
            max_depth=15,            # Maximum depth
            min_samples_split=5,     # Minimum samples to split
            min_samples_leaf=2,      # Minimum samples in leaf
            max_features='sqrt',     # Features per split
            random_state=42,
            n_jobs=-1,               # Use all CPU cores
            verbose=1                # Show progress
        )
        
        # Train model
        print("\nTraining model...")
        self.efficiency_model.fit(X_train, y_train)
        print("✅ Training complete!")
        
        # Make predictions
        print("\nEvaluating model...")
        y_train_pred = self.efficiency_model.predict(X_train)
        y_test_pred = self.efficiency_model.predict(X_test)
        
        # Calculate metrics
        train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
        test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
        train_mae = mean_absolute_error(y_train, y_train_pred)
        test_mae = mean_absolute_error(y_test, y_test_pred)
        train_r2 = r2_score(y_train, y_train_pred)
        test_r2 = r2_score(y_test, y_test_pred)
        
        # Display results
        print("\n📊 EFFICIENCY MODEL PERFORMANCE:")
        print("─"*60)
        print(f"Training Set:")
        print(f"  RMSE:  {train_rmse:.2f}")
        print(f"  MAE:   {train_mae:.2f}")
        print(f"  R² Score: {train_r2:.4f}")
        print(f"\nTest Set:")
        print(f"  RMSE:  {test_rmse:.2f}")
        print(f"  MAE:   {test_mae:.2f}")
        print(f"  R² Score: {test_r2:.4f}")
        
        # Feature importance
        feature_names = self.data['efficiency']['feature_names']
        importances = self.efficiency_model.feature_importances_
        feature_importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': importances
        }).sort_values('importance', ascending=False)
        
        print("\n📈 FEATURE IMPORTANCE:")
        print("─"*60)
        print(feature_importance_df.to_string(index=False))
        
        # Visualization
        self._plot_efficiency_results(y_test, y_test_pred, feature_importance_df)
        
        return {
            'train_rmse': train_rmse,
            'test_rmse': test_rmse,
            'train_r2': train_r2,
            'test_r2': test_r2,
            'feature_importance': feature_importance_df
        }
    
    def train_deficiency_model(self):
        """
        Train Random Forest Classifier for deficiency classification
        """
        print("\n" + "="*60)
        print("TRAINING DEFICIENCY CLASSIFICATION MODEL")
        print("="*60)
        
        X_train = self.data['deficiency']['X_train']
        X_test = self.data['deficiency']['X_test']
        y_train = self.data['deficiency']['y_train']
        y_test = self.data['deficiency']['y_test']
        classes = self.data['deficiency']['classes']
        
        # Initialize model
        print("\nInitializing Random Forest Classifier...")
        self.deficiency_model = RandomForestClassifier(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            max_features='sqrt',
            random_state=42,
            n_jobs=-1,
            verbose=1
        )
        
        # Train model
        print("\nTraining model...")
        self.deficiency_model.fit(X_train, y_train)
        print("✅ Training complete!")
        
        # Make predictions
        print("\nEvaluating model...")
        y_train_pred = self.deficiency_model.predict(X_train)
        y_test_pred = self.deficiency_model.predict(X_test)
        
        # Calculate metrics
        train_accuracy = accuracy_score(y_train, y_train_pred)
        test_accuracy = accuracy_score(y_test, y_test_pred)
        
        # Display results
        print("\n📊 DEFICIENCY MODEL PERFORMANCE:")
        print("─"*60)
        print(f"Training Accuracy: {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
        print(f"Test Accuracy:     {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
        
        print("\n📋 CLASSIFICATION REPORT:")
        print("─"*60)
        print(classification_report(y_test, y_test_pred, target_names=classes))
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_test_pred)
        
        # Feature importance
        feature_names = self.data['deficiency']['feature_names']
        importances = self.deficiency_model.feature_importances_
        feature_importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': importances
        }).sort_values('importance', ascending=False)
        
        print("\n📈 FEATURE IMPORTANCE:")
        print("─"*60)
        print(feature_importance_df.to_string(index=False))
        
        # Visualization
        self._plot_deficiency_results(cm, classes, feature_importance_df)
        
        return {
            'train_accuracy': train_accuracy,
            'test_accuracy': test_accuracy,
            'confusion_matrix': cm,
            'feature_importance': feature_importance_df
        }
    
    def _plot_efficiency_results(self, y_test, y_pred, feature_importance):
        """Plot efficiency model results"""
        fig, axes = plt.subplots(1, 2, figsize=(15, 5))
        
        # Actual vs Predicted
        axes[0].scatter(y_test, y_pred, alpha=0.5)
        axes[0].plot([y_test.min(), y_test.max()], 
                     [y_test.min(), y_test.max()], 
                     'r--', lw=2)
        axes[0].set_xlabel('Actual Efficiency Score')
        axes[0].set_ylabel('Predicted Efficiency Score')
        axes[0].set_title('Efficiency Model: Actual vs Predicted')
        axes[0].grid(True, alpha=0.3)
        
        # Feature importance
        top_features = feature_importance.head(9)
        axes[1].barh(range(len(top_features)), top_features['importance'])
        axes[1].set_yticks(range(len(top_features)))
        axes[1].set_yticklabels(top_features['feature'])
        axes[1].set_xlabel('Importance')
        axes[1].set_title('Top Feature Importance')
        axes[1].invert_yaxis()
        
        plt.tight_layout()
        plt.savefig('../data/efficiency_model_results.png', dpi=300, bbox_inches='tight')
        print("\n✅ Efficiency results saved to: data/efficiency_model_results.png")
        plt.close()
    
    def _plot_deficiency_results(self, cm, classes, feature_importance):
        """Plot deficiency model results"""
        fig, axes = plt.subplots(1, 2, figsize=(15, 5))
        
        # Confusion matrix
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                    xticklabels=classes, yticklabels=classes, ax=axes[0])
        axes[0].set_xlabel('Predicted')
        axes[0].set_ylabel('Actual')
        axes[0].set_title('Confusion Matrix')
        
        # Feature importance
        top_features = feature_importance.head(9)
        axes[1].barh(range(len(top_features)), top_features['importance'])
        axes[1].set_yticks(range(len(top_features)))
        axes[1].set_yticklabels(top_features['feature'])
        axes[1].set_xlabel('Importance')
        axes[1].set_title('Top Feature Importance')
        axes[1].invert_yaxis()
        
        plt.tight_layout()
        plt.savefig('../data/deficiency_model_results.png', dpi=300, bbox_inches='tight')
        print("\n✅ Deficiency results saved to: data/deficiency_model_results.png")
        plt.close()
    
    def save_models(self, output_dir='../trained_models'):
        """Save trained models"""
        os.makedirs(output_dir, exist_ok=True)
        
        print("\n" + "="*60)
        print("SAVING MODELS")
        print("="*60)
        
        # Save efficiency model
        eff_path = os.path.join(output_dir, 'efficiency_model.pkl')
        joblib.dump(self.efficiency_model, eff_path)
        print(f"✅ Efficiency model saved: {eff_path}")
        
        # Save deficiency model
        def_path = os.path.join(output_dir, 'deficiency_model.pkl')
        joblib.dump(self.deficiency_model, def_path)
        print(f"✅ Deficiency model saved: {def_path}")
        
        # Save feature names
        feature_info = {
            'efficiency_features': self.data['efficiency']['feature_names'],
            'deficiency_features': self.data['deficiency']['feature_names'],
            'deficiency_classes': self.data['deficiency']['classes'].tolist()
        }
        
        import json
        info_path = os.path.join(output_dir, 'model_info.json')
        with open(info_path, 'w') as f:
            json.dump(feature_info, f, indent=2)
        print(f"✅ Model info saved: {info_path}")
    
    def train_all(self):
        """
        Complete training pipeline
        """
        print("\n" + "="*70)
        print(" "*20 + "ML MODEL TRAINING")
        print("="*70)
        
        # Prepare data
        self.prepare_data()
        
        # Train models
        eff_results = self.train_efficiency_model()
        def_results = self.train_deficiency_model()
        
        # Save models
        self.save_models()
        
        # Summary
        print("\n" + "="*70)
        print("TRAINING SUMMARY")
        print("="*70)
        print(f"\n✅ Efficiency Model:")
        print(f"   Test R² Score: {eff_results['test_r2']:.4f}")
        print(f"   Test RMSE: {eff_results['test_rmse']:.2f}")
        
        print(f"\n✅ Deficiency Model:")
        print(f"   Test Accuracy: {def_results['test_accuracy']:.4f} ({def_results['test_accuracy']*100:.2f}%)")
        
        print("\n" + "="*70)
        print("✅ ALL MODELS TRAINED AND SAVED SUCCESSFULLY!")
        print("="*70)
        
        return eff_results, def_results

# Main execution
if __name__ == "__main__":
    trainer = ModelTrainer()
    eff_results, def_results = trainer.train_all()