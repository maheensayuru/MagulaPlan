export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-blush-200 border-t-maroon-700 animate-spin" />
      <p className="text-sm text-charcoal/50 tracking-wide">Preparing your wedding plans...</p>
    </div>
  )
}
