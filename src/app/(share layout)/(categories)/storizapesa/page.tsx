import UserPostCard from "@/components/UserPostCard";
import { getTasks } from "../../../../../actions/getTasks";
import TaskOneCard from "@/components/TaskOneCard";

export default async function StoriZaPesa() {
  const tasks = await getTasks();

  return (
    <div className="container  p-6 mb-8 ">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-tl-xl rounded-tr-xl p-6 mb-6 text-center font-bold text-2xl text-white">
        {" "}
        Stori Za Pesa
        <p className="text-sm text-white font-normal">
          Fedha na bima (loans and insurance){" "}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 ">
        <div className="lg:col-span-12 col-span-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
            {/* {tasks.map((task, index) => (
              <TaskOneCard
                key={index}
                videoURL={task.videoURL}
                thumbnailURL={task.thumbnailURL}
                points={task.points}
                taskId={""}
                userId={""}
                isTaskCompleted={false}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
