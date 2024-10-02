export const SVG = ({
  children,
  viewBox,
}: {
  children: JSX.Element;
  viewBox: string;
}) => {
  return (
    <svg
      className="w-4 h-4 me-2 text-gray-500 dark:text-gray-200"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
};

export const Tab = ({
  children,

  onClick,
  isActive,
}: {
  children: JSX.Element | string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <li
        onClick={onClick}
        className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer my-3 ${
          isActive
            ? "text-white bg-blue-700 dark:bg-blue-600"
            : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </li>
    </>
  );
};

export const TabNested = ({
  children,
  onClick,
  isActive,
}: {
  children: JSX.Element | string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex justify-end">
      <li
        onClick={onClick}
        className={`inline-flex items-center px-4 py-3 rounded-lg w-[80%] cursor-pointer mb-2 ${
          isActive
            ? "text-white bg-gray-400 shadow-lg dark:bg-blue-600"
            : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </li>
    </div>
  );
};

export const Accordion = ({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div>
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      {title}
    </div>
    {isOpen && <div className="pl-4 pt-2">{children}</div>}
  </div>
);

export const PropertiesListFallback = () => {
  return (
    <div className="container">
      <div className="flex flex-wrap -mx-4 my-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={`w-full g:w-full xl:w-1/3 px-4 mb-8`} key={index}>
            <div key={index} className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-48"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-16 bg-gray-200 w-full"></div>
                  <div className="space-x-2 flex">
                    <div className="h-8 bg-gray-200 w-full"></div>
                    <div className="h-8 bg-gray-200 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Input = ({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  error: any;
  type?: string;
  onChange: (e: any) => void;
}) => {
  return (
    <>
      <div>
        <label className="block font-semibold">{label}</label>
        <input
          type={type}
          name="name"
          value={value}
          onChange={onChange}
          className="p-3 border border-gray-300 rounded w-full"
        />
        {error.length > 0 && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export const OpenIcon = () => (
  <SVG viewBox="0 0 20 20">
    <path d="M5 9l5 5 5-5H5z" />
  </SVG>
);

export const CloseIcon = () => (
  <SVG viewBox="0 0 20 20">
    <path d="M15 11l-5-5-5 5h10z" />
  </SVG>
);
