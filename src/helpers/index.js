export const capitalizePathname = (pathname) => {
  // Decode the pathname to replace %20 with space
  const decodedPath = decodeURIComponent(pathname);

  // Replace underscores with spaces
  const noUnderscores = decodedPath.replace(/_/g, ' ');

  // Split the path without underscores into words and capitalize the first letter of each word
  const capitalized = noUnderscores.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return capitalized;
}

export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return "";
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertUnixToReadableDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);

  // Format date to YYYY-MM-DD
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Add leading 0 if necessary
  const day = ("0" + date.getDate()).slice(-2);           // Add leading 0 if necessary

  return `${year}-${month}-${day}`;
}

export const convertDatabaseDateToReadableDate = (databaseDate) => {
  const date = new Date(databaseDate);

  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}
  