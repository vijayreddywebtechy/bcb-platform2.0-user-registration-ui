interface AuthActionsProps {
  primaryText?: string;
  primaryAction?: () => void;
  secondaryText?: string;
  secondaryAction?: () => void;
  loading?: boolean;
}

export default function AuthActions({
  primaryText = "Continue",
  primaryAction,
  secondaryText,
  secondaryAction,
  loading = false
}: AuthActionsProps) {
  return (
    <div className="space-y-3 mt-6">
      <button
        onClick={primaryAction}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : primaryText}
      </button>
      
      {secondaryText && secondaryAction && (
        <button
          onClick={secondaryAction}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
        >
          {secondaryText}
        </button>
      )}
    </div>
  );
}