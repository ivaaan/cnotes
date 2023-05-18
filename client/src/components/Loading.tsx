import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading" data-testid="loadingtest">
      <img
        src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/svg-css/wind-toy.svg"
        alt="Loading"
        style={{
          fill: "white",
        }}
      />
      {/* <img src='https://liveblocks.io/loading.svg' alt='Loading' /> */}
    </div>
  );
};

export default Loading;
