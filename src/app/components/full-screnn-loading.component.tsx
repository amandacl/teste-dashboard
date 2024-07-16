import React from "react";
interface IProps {
  isLoading: boolean;
}

export const FullScreenLoading = ({ isLoading }: IProps) => {
  return (
    <div
      className={`fixed top-0 w-full z-[1000] transition-[height_0s,background_0.25s_ease-in-out] overflow-hidden",
        ${isLoading ? "h-screen bg-white/40" : "h-0 bg-white/0"}
      `}
    >
      <div className="relative h-[2px]">
        <div className="absolute transform -translate-x-1/2 left-1/2 inline-block w-0 h-full border-b border-white/40 bg-primary-base text-center animate-loading"></div>
      </div>
    </div>
  );
};
