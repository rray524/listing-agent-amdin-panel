export const Feature = ({
  iconColor,
  featureName,
  value,
  Icon,
}: {
  iconColor: string;
  featureName: string;
  value: string;
  Icon: React.ElementType;
}) => (
  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
    <svg
      className={`h-4 w-4 ${iconColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <Icon />
    </svg>
    <div className="mt-1.5 sm:mt-0">
      <p className="text-gray-500">{featureName}</p>
      <p className="font-medium dark:text-teal-600">{value}</p>
    </div>
  </div>
);
