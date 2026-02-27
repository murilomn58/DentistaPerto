export function AdSlot({
  position,
}: {
  position: "header" | "in-content" | "footer";
}) {
  return (
    <div
      className="w-full bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs"
      style={{ minHeight: position === "in-content" ? 250 : 90 }}
      data-ad-slot={position}
      aria-hidden="true"
    >
      {/* AdSense placeholder — activate when approved */}
    </div>
  );
}
