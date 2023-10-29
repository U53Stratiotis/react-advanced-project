// formValidation.js

export function validateForm(
  title,
  description,
  image,
  categoryIds,
  createdBy,
  location,
  startTime,
  endTime,
  toast
) {
  let isValid = true;

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  switch (true) {
    case title.length < 3:
      toast({
        title: "Invalid Title",
        description: "Minimum title of 3 characters is required.",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case description.length < 15:
      toast({
        title: "Invalid description",
        description: "Minimum description of 15 characters is required.",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case image.length === 0 || !isValidURL(image):
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL for the image.",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case categoryIds.length < 1:
      toast({
        title: "Insufficient categories",
        description: "Please select at least one category.",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case createdBy.length === 0:
      toast({
        title: "No author",
        description: "Please select an author",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case location.length < 3:
      toast({
        title: "Unknown location",
        description: "Please enter an address with the city.",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case startTime.length === 0:
      toast({
        title: "Start time",
        description: "Please enter a date and time",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    case endTime.length === 0:
      toast({
        title: "End time",
        description: "Please enter a date and time",
        status: "warning",
        position: "top",
      });
      isValid = false;
      break;

    default:
      // If none of the cases are met, the form is valid.
      isValid = true;
  }

  return isValid;
}
