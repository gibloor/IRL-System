import styles from './styles.module.css'

const Home = () => {
  const main_goal = 'Become a moneybag'

  const secondary_goals = [
    {
      title: 'Upgrade english to strong B2',
      active_tasks: [],
      daily_tasks: [
        {
          title: 'Repeat words',
          progress: 0,
          goal: 2,
        },
        {
          title: 'Sing a Tom Cardy song on english',
          progress: 0,
          goal: 1,
        },
      ],
      weekly_tasks: [
        {
          title: 'Stream on english',
          progress: 4,
          goal: 4,
          weeklyProgress: 1,
          weeklyGoal: 3,
        },
      ]
    },
    {
      title: 'Upgrade Web-developer skills',
      active_tasks: [
        {
          title: 'Read about React.memo',
          complited: false,
        }
      ],
      daily_tasks: [],
      weekly_tasks: [
        {
          title: 'Add HR to your contacts on LinkedIn',
          progress: 0,
          goal: 0,
          weeklyProgress: 0,
          weeklyGoal: 1,
        },
        {
          title: 'Review options on upwork',
          progress: 0,
          goal: 1,
          weeklyProgress: 0,
          weeklyGoal: 3,
        },
        {
          title: 'Work on own project',
          progress: 0,
          goal: 4,
          weeklyProgress: 0,
          weeklyGoal: 3,
        },
      ]
    },
    {
      title: 'Grow in game development',
      active_tasks: [],
      daily_tasks: [],
      weekly_tasks: [
        {
          title: 'Work on own game',
          progress: 0,
          goal: 4,
          weeklyProgress: 0,
          weeklyGoal: 3,
        },
      ]
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {main_goal}
        </h1>

        <div className={styles.goals}>
          {secondary_goals.map((goal, index) => (
            <div key={index} className={styles.goalCard}>
              <h2 className={styles.goalTitle}>
                {goal.title}
              </h2>

              {goal.active_tasks.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Active Tasks</h3>
                  <div>
                    {goal.active_tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className={styles.taskItem}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={task.complited ? styles.statusSuccess : styles.statusFail}>
                          {task.complited ? '✓' : '×'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {goal.daily_tasks.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Daily Tasks</h3>
                  <div>
                    {goal.daily_tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className={styles.taskItem}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={styles.taskProgress}>
                          {task.progress}/{task.goal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {goal.weekly_tasks.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Weekly Tasks</h3>
                  <div>
                    {goal.weekly_tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className={styles.taskItem}>
                        <div className={styles.taskTitle}>{task.title}</div>
                        <span className={styles.taskProgress}>
                          {task.progress}/{task.goal}
                        </span>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${(task.weeklyProgress / task.weeklyGoal) * 100}%` }}
                          />
                        </div>
                        <div className={styles.weeklyProgress}>
                          {task.weeklyProgress}/{task.weeklyGoal} this week
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Home