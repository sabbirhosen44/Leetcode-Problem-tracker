"use client";
import type { Problem } from "@/lib/types";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Edit2,
  ExternalLink,
  Trash2,
  Video,
} from "lucide-react";

interface ProblemListProps {
  problems: Problem[];
  onEdit: (problem: Problem) => void;
  onDelete: (id: string) => void;
  onToggleSolved: (id: string, solved: boolean) => void;
}

export function ProblemList({
  problems,
  onEdit,
  onDelete,
  onToggleSolved,
}: ProblemListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900";
      case "Hard":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  return (
    <div className="space-y-2 md:space-y-3">
      {problems.map((problem, index) => (
        <motion.div
          key={problem._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col sm:flex-row  cursor-pointer sm:items-center gap-3 sm:gap-4 rounded-lg border border-border bg-card p-3 md:p-4 hover:shadow-md hover:border-primary/50 transition-all group"
        >
          <button
            onClick={() => onToggleSolved(problem._id, !problem.solved)}
            className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {problem.solved ? (
              <CheckCircle2 className="h-6 w-6 text-primary" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3
                className={`text-sm md:text-base font-semibold 
                }`}
              >
                {problem.problemName}
              </h3>
              {problem.leetcodeNumber && (
                <span className="text-xs text-muted-foreground">
                  #{problem.leetcodeNumber}
                </span>
              )}
            </div>
            {problem.summaryNotes.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {problem.summaryNotes[0].content}
              </p>
            )}
          </div>

          <span
            className={`flex-shrink-0 rounded-full px-2.5 md:px-3 py-1 text-xs font-semibold ${getDifficultyColor(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>

          <div className="flex gap-1 md:gap-2 flex-shrink-0  transition-opacity">
            {problem.problemUrl && (
              <a
                href={problem.problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                title="Watch video"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {problem.videoUrl && (
              <a
                href={problem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                title="Watch video"
              >
                <Video className="h-4 w-4" />
              </a>
            )}
            <button
              onClick={() => onEdit(problem)}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors cursor-pointer"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(problem._id)}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
