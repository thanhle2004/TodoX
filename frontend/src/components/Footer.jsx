import React from 'react'

const Footer = ({completeTasksCount, activeTasksCount}) => {
  return (
    <>
      {completeTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {
              completeTasksCount > 0 && (
                <>
                  🎉 Congratulation! You have done {completeTasksCount} {completeTasksCount === 1 ? "task" : "tasks"}
                  {
                    activeTasksCount > 0 && ` and have ${activeTasksCount} ${activeTasksCount === 1 ? "task" : "tasks"} left to complete! Keep going!`
                  }
                </>
              )
            }

            {
              completeTasksCount === 0 && activeTasksCount > 0 && (
                <>
                  You have {activeTasksCount} active tasks. Let's get them done! 💪
                </>
              )
            }
          </p>
        </div>
      )}
    </>
  );
};

export default Footer
