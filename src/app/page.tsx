"use client";
import dynamic from "next/dynamic";

const TaskTrackerList = dynamic(() => import("@/features/tracker"), {
  ssr: false,
});

export default TaskTrackerList;
