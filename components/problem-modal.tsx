"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Problem, Category, Difficulty } from "@/lib/types";

interface ProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (problem: Partial<Problem>) => void;
  initialProblem?: Problem | null;
  defaultCategory?: string;
}

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

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

export function ProblemModal({
  isOpen,
  onClose,
  onSave,
  initialProblem,
  defaultCategory,
}: ProblemModalProps) {
  const [formData, setFormData] = useState({
    category: "" as Category,
    problemName: "",
    difficulty: "Medium" as Difficulty,
    leetcodeNumber: "",
    videoUrl: "",
    problemUrl: "",
    summaryNotes: [] as Array<{ id: string; content?: string }>,
  });

  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    if (initialProblem) {
      setFormData({
        category: initialProblem.category,
        problemName: initialProblem.problemName,
        difficulty: initialProblem.difficulty,
        leetcodeNumber: initialProblem.leetcodeNumber || "",
        videoUrl: initialProblem.videoUrl || "",
        problemUrl: initialProblem.problemUrl || "",
        summaryNotes: initialProblem.summaryNotes || "",
      });
      setNotesText(
        initialProblem.summaryNotes.map((n) => n.content).join("\n")
      );
    } else {
      setFormData({
        category: (defaultCategory as Category) || CATEGORIES[0],
        problemName: "",
        difficulty: "Medium",
        leetcodeNumber: "",
        videoUrl: "",
        problemUrl: "",
        summaryNotes: [],
      });
      setNotesText("");
    }
  }, [initialProblem, isOpen, defaultCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.problemName && formData.category) {
      const notes = notesText
        .split("\n")
        .filter((line) => line.trim())
        .map((content, index) => ({
          id: `${Date.now()}-${index}`,
          content: content.trim(),
        }));

      console.log(formData);

      onSave({
        ...formData,
        summaryNotes: notes,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card text-card-foreground shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-border px-4 md:px-6 py-4 sticky top-0 bg-card">
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {initialProblem ? "Edit Problem" : "Add New Problem"}
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-6 p-4 md:p-6"
            >
              {/* Problem Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Problem Name *
                </label>
                <input
                  type="text"
                  value={formData.problemName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      problemName: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground "
                  placeholder="e.g., Two Sum"
                  required
                />
              </div>

              {/* Category and Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 ">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as Category,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer"
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="cursor-pointer">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 ">
                    Difficulty *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: e.target.value as Difficulty,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer"
                    required
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LeetCode Number */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  LeetCode Number
                </label>
                <input
                  type="text"
                  value={formData.leetcodeNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      leetcodeNumber: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="e.g., 1"
                />
              </div>

              {/* Problem URL */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Problem URL
                </label>
                <input
                  type="url"
                  value={formData.problemUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      problemUrl: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="https://leetcode.com/..."
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      videoUrl: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="https://youtube.com/..."
                />
              </div>

              {/* Summary Notes */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Summary Notes
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Enter each note on a new line
                </p>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none placeholder:text-muted-foreground"
                  placeholder="Line 1: First note&#10;Line 2: Second note&#10;Line 3: Third note"
                  rows={5}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {initialProblem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
