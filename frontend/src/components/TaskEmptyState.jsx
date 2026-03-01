import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
        className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >

        <div className="space-y-3">
            <Circle className="size-12 mx-auto text-muted-foreground" />
    
            <div>
                <h3 className="font-medium text-foreground">
                    {
                        filter === "active" ? "No active tasks" :
                        filter === "completed" ? "No completed tasks" :
                        "No tasks found"
                    }
                </h3>
                <p className="text-sm text-muted-foreground">
                    {
                        filter === "all" ? "You don't have any tasks yet. Start by adding a new task!" :
                        `Switch to "All" filter to see ${filter === "active" ? "completed" : "active"} tasks or create new ones!`
                    }
                </p>
            </div> 
        </div>

    </Card>
  )
}

export default TaskEmptyState
