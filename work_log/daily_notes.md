today (12/27) i restarted the project from setup, as tailwind css was broken. 

I will first make components/task.txs, to return a li of task.
i will make a type of task, following supabase table format.


I created custom hook to add task to the unordered list and toggle individual tasks by their unique id.

Currently the "task-list" is a dummy list of tasks. I'll change it to actually use supabse. 


today (12/28) i copied example code from supabase doc to add task, toggle task and delete task. 

refactor add/toggletask from client-side to server-side.

now the form that adds task is client-side, and it internally calls server-side action to add task. The supabse RLS is disabled currently, and a test user is created. 
