const Progress = () => {
  return (
    <div className="w-full" data-testid="progress">
      <div className="h-1 w-full bg-gray-100 overflow-hidden">
        <div className="animate-progress w-full h-full bg-gray-500 origin-left-right"></div>
      </div>
    </div>
  );
};

export { Progress };
