import {Task} from '../types/custom'
export const dummyTasks: Task[] = [
  {
    id: "e52c34c5-5555-4422-92a1-8d2b7c6d1a10",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    title: "Complete project setup",
    is_completed: true,
    created_at: "2023-10-25T09:00:00.000Z", // ISO 8601 format
    description: "Initialize the repo, install node modules, and configure ESLint.",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    title: "Integrate Supabase Auth",
    is_completed: false,
    created_at: "2023-10-26T14:30:00.000Z",
    // description is undefined here to test optional handling
  },
  {
    id: "c84d291a-77ff-4113-9800-2f1e5a8b9c00",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    title: "Fix responsive layout on mobile",
    is_completed: false,
    created_at: "2023-10-27T11:15:00.000Z",
    description: "The navigation bar overlaps the hero section on screens smaller than 640px.",
  }
];