import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-[50vh] relative">
      <div className="absolute left-1/2 top-1/2 transform translate-[-50%]">
        <FadeLoader
          color="#2effaf"
          height={16}
          loading
          radius={33}
          speedMultiplier={3}
          width={8}
        />
      </div>
    </div>
  );
};

export default Loading;
