import { colors } from '../../utils/colors';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-[${colors.text.secondary}] mb-2`}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
          ${error 
            ? `border-[${colors.error.main}] focus:ring-[${colors.error.light}]` 
            : `border-[${colors.secondary.light}] focus:ring-[${colors.primary.main}]`
          }
          focus:outline-none focus:ring-2 focus:border-transparent`}
        {...props}
      />
      {error && (
        <p className={`mt-1 text-sm text-[${colors.error.main}]`}>{error}</p>
      )}
    </div>
  );
};

export default Input; 