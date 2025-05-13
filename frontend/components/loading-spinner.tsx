export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-sky-100"></div>
        <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent"></div>
      </div>
    </div>
  )
}
