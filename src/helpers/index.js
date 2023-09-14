export const capitalizePathname = (pathname) => {
  // Decode the pathname to replace %20 with space
  const decodedPath = decodeURIComponent(pathname);

  // Split the decoded path into words and capitalize the first letter of each word
  const capitalized = decodedPath.split(' ').map(word => 
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
