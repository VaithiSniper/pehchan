export default function fallbackSpinner() {
  return (
    <div class="flex justify-center items-center w-full">
      <div
        class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-gray-300"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
