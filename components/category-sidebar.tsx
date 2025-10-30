"use client";

import { motion } from "framer-motion";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/lib/types";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onAddProblem: (category: string) => void;
  categoryStats: Record<string, { total: number; solved: number }>;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddProblem,
  categoryStats,
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-full bg-sidebar border-r border-sidebar-border overflow-y-auto flex flex-col"
    >
      <div className="p-4 md:p-6 border-b border-sidebar-border sticky top-0 bg-sidebar">
        <h2 className="text-base md:text-lg font-bold text-sidebar-foreground">
          Categories
        </h2>
        <p className="text-xs text-sidebar-foreground/60 mt-1">
          Select a category to view problems
        </p>
      </div>

      <div className="flex-1 p-3 md:p-4 space-y-2 overflow-y-auto">
        {/* All Problems Option */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => {
            onSelectCategory(null);
            setIsOpen(false);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all text-sm ${
            selectedCategory === null
              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <div className="flex items-center justify-between cursor-pointer">
            <span>All Problems</span>
            {categoryStats["all"] && (
              <span className="text-xs bg-sidebar-accent text-sidebar-accent-foreground px-2 py-1 rounded">
                {categoryStats["all"].solved}/{categoryStats["all"].total}
              </span>
            )}
          </div>
        </motion.button>

        {/* Category List */}
        {categories.map((category, index) => {
          const stats = categoryStats[category] || { total: 0, solved: 0 };
          const isSelected = selectedCategory === category;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="group "
            >
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => {
                    onSelectCategory(category);
                    setIsOpen(false);
                  }}
                  className={`flex-1 text-left px-4 py-3 rounded-lg font-medium transition-all text-sm cursor-pointer ${
                    isSelected
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{category}</span>
                    <span className="text-xs bg-sidebar-accent text-sidebar-accent-foreground px-2 py-1 rounded flex-shrink-0 ml-2">
                      {stats.solved}/{stats.total}
                    </span>
                  </div>
                </button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddProblem(category)}
                  className="p-2 text-sidebar-foreground/50 hover:text-sidebar-primary hover:bg-sidebar-accent rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 cursor-pointer"
                  title="Add problem to this category"
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 md:hidden p-3 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 sticky top-0 h-screen border-r border-sidebar-border">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
