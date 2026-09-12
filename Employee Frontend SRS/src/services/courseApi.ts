import { DEMO_COURSES } from "../data/mockData";
import type { Course } from "../types";

export const courseApi = {
  async getCourses(): Promise<Course[]> {
    await new Promise((r) => setTimeout(r, 700));
    return [...DEMO_COURSES];
  },

  async getCourseById(id: string): Promise<Course> {
    await new Promise((r) => setTimeout(r, 400));
    const course = DEMO_COURSES.find((c) => c.id === id);
    if (!course) throw new Error("Course not found");
    return { ...course };
  },

  async enrollCourse(id: string): Promise<Course> {
    await new Promise((r) => setTimeout(r, 600));
    const course = DEMO_COURSES.find((c) => c.id === id);
    if (!course) throw new Error("Course not found");
    return { ...course, status: "in_progress", progress: 0 };
  },
};
