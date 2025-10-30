"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { ProblemList } from "@/components/problem-list";
import { ProblemModal } from "@/components/problem-modal";
import { CategorySidebar } from "@/components/category-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Problem, Stats, Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap/Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D DP",
  "2-D DP",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
];

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [defaultCategoryForNew, setDefaultCategoryForNew] =
    useState<string>("");

  useEffect(() => {
    fetchProblems();
    fetchStats();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch("/api/problems");
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const filteredProblems = useMemo(() => {
    if (!selectedCategory) return problems;
    return problems.filter((p) => p.category === selectedCategory);
  }, [problems, selectedCategory]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; solved: number }> = {
      all: {
        total: problems.length,
        solved: problems.filter((p) => p.solved).length,
      },
    };

    CATEGORIES.forEach((cat) => {
      const catProblems = problems.filter((p) => p.category === cat);
      stats[cat] = {
        total: catProblems.length,
        solved: catProblems.filter((p) => p.solved).length,
      };
    });

    return stats;
  }, [problems]);

  const handleSave = async (problem: Partial<Problem>) => {
    try {
      if (editingProblem) {
        console.log("[v0] Updating problem:", editingProblem._id);
        const response = await fetch(`/api/problems/${editingProblem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(problem),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("[v0] Problem updated successfully");
          fetchProblems();
          fetchStats();
          setEditingProblem(null);
        } else {
          console.error("[v0] Update failed:", data.error);
          alert("Failed to update problem: " + data.error);
        }
      } else {
        console.log("[v0] Creating new problem");
        const response = await fetch("/api/problems", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(problem),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("[v0] Problem created successfully");
          fetchProblems();
          fetchStats();
        } else {
          console.error("[v0] Create failed:", data.error);
          alert("Failed to create problem: " + data.error);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("[v0] Error saving problem:", error);
      alert("Error saving problem: " + String(error));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      try {
        console.log("[v0] Deleting problem:", id);
        const response = await fetch(`/api/problems/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          console.log("[v0] Problem deleted successfully");
          fetchProblems();
          fetchStats();
        } else {
          console.error("[v0] Delete failed:", data.error);
          alert("Failed to delete problem: " + data.error);
        }
      } catch (error) {
        console.error("[v0] Error deleting problem:", error);
        alert("Error deleting problem: " + String(error));
      }
    }
  };

  const handleToggleSolved = async (id: string, solved: boolean) => {
    try {
      console.log("[v0] Toggling solved status for problem:", id, "to", solved);
      const response = await fetch(`/api/problems/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solved }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[v0] Solved status updated successfully");
        fetchProblems();
        fetchStats();
      } else {
        console.error("[v0] Toggle failed:", data.error);
        alert("Failed to update problem: " + data.error);
      }
    } catch (error) {
      console.error("[v0] Error updating problem:", error);
      alert("Error updating problem: " + String(error));
    }
  };

  const handleEdit = (problem: Problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProblem(null);
    setDefaultCategoryForNew("");
  };

  const handleAddProblem = (category: string) => {
    setDefaultCategoryForNew(category);
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <CategorySidebar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddProblem={handleAddProblem}
        categoryStats={categoryStats}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
          {/* Header with Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  NeetCode 250
                </h1>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                  {selectedCategory
                    ? `${selectedCategory} Problems`
                    : "Track your progress through the NeetCode 250 problems"}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <ThemeToggle />
                <button
                  onClick={() => {
                    setDefaultCategoryForNew("");
                    setEditingProblem(null);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 sm:px-4 md:px-6 py-2.5 font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm md:text-base cursor-pointer"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Problem</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          {stats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 md:mb-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
            >
              <StatsCard label="Total" value={stats.total} />
              {/* <StatsCard
                label="Solved"
                value={stats.solved}
                total={stats.total}
              /> */}
              <StatsCard
                label="Easy"
                value={stats.easySolved}
                total={stats.easy}
              />
              <StatsCard
                label="Medium"
                value={stats.mediumSolved}
                total={stats.medium}
              />
              <StatsCard
                label="Hard"
                value={stats.hardSolved}
                total={stats.hard}
              />
            </motion.div>
          )}

          {/* Problems List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-xl bg-card text-card-foreground p-4 md:p-6 shadow-sm border border-border">
              <h2 className="mb-4 md:mb-6 text-base md:text-lg font-bold text-foreground">
                {selectedCategory ? `${selectedCategory}` : "All Problems"} (
                {filteredProblems.length})
              </h2>
              {filteredProblems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 md:py-12 text-sm md:text-base">
                  {problems.length === 0
                    ? "No problems yet. Add one to get started!"
                    : "No problems in this category."}
                </p>
              ) : (
                <ProblemList
                  problems={filteredProblems}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleSolved={handleToggleSolved}
                />
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      <ProblemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialProblem={editingProblem}
        defaultCategory={defaultCategoryForNew}
      />
    </div>
  );
}
