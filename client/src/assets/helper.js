export function convertToReadableDate(dateTimeString) {
  const date = new Date(dateTimeString);

  const optionsDate = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate}`;
}
export function preventScrollInNumber(e) {
  e.target.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
}
