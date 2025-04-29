
import { useState, useEffect } from "react";
import { categories as categoriesData, Category } from "@/data/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    try {
      setCategories(categoriesData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch categories");
      setLoading(false);
    }
  }, []);

  return { categories, loading, error };
};
