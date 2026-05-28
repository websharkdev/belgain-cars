function BelgianFlagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <g clipPath="url(#clip0_365_26640)">
        <rect width="20" height="20" fill="#fff" rx="2"></rect>
        <mask
          id="mask0_365_26640"
          width="20"
          height="20"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
        >
          <rect width="20" height="20" fill="#fff" rx="2"></rect>
        </mask>
        <g mask="url(#mask0_365_26640)">
          <path fill="#FF4453" d="M9.523 0h10.476v20H9.523z"></path>
          <path
            fill="#262626"
            fillRule="evenodd"
            d="M0 20h6.667V0H0z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#FFCF3C"
            fillRule="evenodd"
            d="M6.666 20h6.667V0H6.666z"
            clipRule="evenodd"
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_365_26640">
          <rect width="20" height="20" fill="#fff" rx="10"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export { BelgianFlagIcon };
