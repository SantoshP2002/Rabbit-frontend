export const TopGradient = ({ className }) => {
  return (
    <div
      className={`w-full absolute top-0 pointer-events-none h-24 z-[1] bg-gradient-to-b from-black to-transparent dark:from-white ${className}`}
    />
  );
};

export const BottomGradient = ({ className }) => {
  return (
    <div
      className={`w-full absolute bottom-0 pointer-events-none h-20 z-[1] bg-gradient-to-t from-black to-transparent dark:from-gray-300  ${className}`}
    />
  );
};

export const LeftGradient = ({ className }) => {
  return (
    <div
      className={`w-full absolute left-0 top-0 pointer-events-none h-24 z-[1] bg-gradient-to-r from-primary-inverted to-transparent ${className}`}
    />
  );
};

export const RightGradient = ({ className }) => {
  return (
    <div
      className={`w-full absolute right-0 top-0 pointer-events-none h-24 z-[1] bg-gradient-to-l from-primary-inverted to-transparent ${className}`}
    />
  );
};
