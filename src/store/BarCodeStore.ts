/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";


interface Product {
  id: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
}


interface BarcodeStoreState {
  barcodeItem: Product | null; 
  isLoading: boolean;
  error: string | null;
  fetchBarcodeItems: (barcode: string) => Promise<void>;
}


export const useBarCodeStore = create<BarcodeStoreState>((set) => ({
  barcodeItem: null, 
  isLoading: false,
  error: null,
  fetchBarcodeItems: async (barcode: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      
      if (data.product) {
        const product: Product = {
          id: barcode,
          product_name: data.product.product_name || "Unknown Product",
          image_url: data.product.image_url || '',
          categories: data.product.categories || "Uncategorized",
          ingredients_text: data.product.ingredients_text || 'Ingredients not available',
          nutrition_grades: data.product.nutrition_grades || 'N/A',
        };
        set({ barcodeItem: product }); 
      } else {
        set({ barcodeItem: null });
      }
    } catch (error: any) {
      set({ error: error.message }); 
    } finally {
      set({ isLoading: false }); 
    }
  },
}));
