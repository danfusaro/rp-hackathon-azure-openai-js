const Spinner = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#002857" />
            <stop offset="100%" stop-color="#6bb6e8" />
          </linearGradient>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke-width="4"
          stroke="url(#gradient)"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke-width="4"
          stroke-dasharray="1, 100"
          stroke-linecap="round"
          stroke="white"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0;-180"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      {text && <span>{text}</span>}
    </div>
  );
};

export default Spinner;
