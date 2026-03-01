import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from "@/lib/utils";
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';

const TaskCard = ({task, index, handleTaskChanged}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Task deleted successfully!");
            handleTaskChanged();
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task. Please try again later.");
        }
    }

    const updateTask = async () => {
        try {
            setIsEditing(false);
            await api.put(`/tasks/${task._id}`, { 
                title: updateTaskTitle,
            });
            toast.success(`Task "${updateTaskTitle}" updated successfully!`);
            handleTaskChanged();
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task. Please try again later.");
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, { 
                    status: "complete",
                    completedAt: new Date().toISOString()
                });
                toast.success(`Task "${task.title}" marked as complete!`);
            } else {
                await api.put(`/tasks/${task._id}`, { 
                    status: "active",
                    completedAt: null
                });
                toast.success(`Task "${task.title}" marked as active!`);
            }
            handleTaskChanged();
        } catch (error) {
            console.error("Error updating task status:", error);
            toast.error("Failed to update task status. Please try again later.");
        }
    }    

    const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    } else if (e.key === "Escape") {
      setUpdateTaskTitle(task.title);
      setIsEditing(false);
    }
  };

    return (
        <Card className = {cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "complete" && 'opacity-75'
        )}
            style={{animationDelay: `${index * 50}ms`}}
        >
            <div className="flex items-center gap-4">
                {/* Cirle button */}
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "complete" ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === 'complete' ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                {/* Display and edit task title */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            type="text"
                            placeholder="Edit task title"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title);
                            }}
                            autoFocus
                        />
                    ) : (
                        <p 
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === "complete" 
                                    ? "line-through text-muted-foreground" 
                                    : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )}

                    {/* Created Date and Completed Date */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}        
                    </div>
                </div>

                {/* Edit and Delete buttons */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* Edit button */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditing(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                        >
                            <SquarePen className="size-4" />
                    </Button>

                    {/* Delete button */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>

            </div>

        </Card>
    )
}

export default TaskCard
