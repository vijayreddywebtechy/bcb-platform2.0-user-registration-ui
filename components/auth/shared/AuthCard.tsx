export default function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-xl p-8 ${className || ""}`}>
      {children}
    </div>
  );
}
