export default function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-xl px-4 py-6 sm:p-6 md:p-8 ${className || ""}`}>
      {children}
    </div>
  );
}
