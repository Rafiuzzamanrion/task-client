
import Card from "../../Components/Card";

const Home = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 overflow-hidden">
      <div className="flex overflow-x-auto h-full px-5 space-x-5">
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-red-400"} title={"Incomplete"} />
        </div>
        {/* to do */}
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-blue-400"} title={"To Do"} />
        </div>
        {/* doing */}
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-yellow-400"} title={"Doing"} />
        </div>
        {/* under review */}
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-orange-400"} title={"Under Review"} />
        </div>
        {/* completed */}
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-green-400"} title={"Complete"} />
        </div>
        {/* overdue */}
        <div className="flex-shrink-0 w-[380px] h-full overflow-y-auto p-4 rounded-lg">
          <Card color={"bg-violet-400"} title={"Overdue"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
