
export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary-deep flex flex-col items-center py-6 px-4 overflow-y-auto">
      <div className="w-full flex-1 flex flex-col">{children}</div>
    </div>
  );
}
