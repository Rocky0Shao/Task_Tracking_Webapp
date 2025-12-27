export interface Task {
  id: string;          // UUID
  user_id: string;     // Foreign Key to auth.users
  title: string;       // "name" is fine, "title" is more semantic for tasks
  is_completed: boolean; 
  created_at: string;  // Essential for sorting! Supabase returns this as a string
  description?: string; // Optional: Good to have for later
}
