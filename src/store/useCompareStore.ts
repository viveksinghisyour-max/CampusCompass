import { create } from 'zustand';

interface CompareStore {
  selectedIds: string[]; // List of college IDs to compare (Max 3)
  
  addCollege: (id: string) => { success: boolean; message?: string };
  removeCollege: (id: string) => void;
  clearCompare: () => void;
  isCompared: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => {
  // Safe localStorage getter
  const getStoredCompare = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('cc_compare');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const syncCompare = (ids: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cc_compare', JSON.stringify(ids));
    }
  };

  return {
    selectedIds: getStoredCompare(),

    addCollege: (id) => {
      const { selectedIds } = get();

      if (selectedIds.includes(id)) {
        return { success: false, message: 'College is already selected for comparison.' };
      }

      if (selectedIds.length >= 3) {
        return { success: false, message: 'You can compare a maximum of 3 colleges.' };
      }

      const updated = [...selectedIds, id];
      set({ selectedIds: updated });
      syncCompare(updated);
      return { success: true };
    },

    removeCollege: (id) => {
      const { selectedIds } = get();
      const updated = selectedIds.filter((item) => item !== id);
      set({ selectedIds: updated });
      syncCompare(updated);
    },

    clearCompare: () => {
      set({ selectedIds: [] });
      syncCompare([]);
    },

    isCompared: (id) => {
      return get().selectedIds.includes(id);
    }
  };
});
