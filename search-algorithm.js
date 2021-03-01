const search = (event, objectData = [], setReturnedData, combinations = []) => {
  // prevent page refresh
  event.preventDefault();

  // sniff out user input/search values and convert to lower-case
  const input = event.target.value.toLowerCase();

  // store the filtered results in : "const result"
  const result = objectData.filter((data) => {
    // initialize a variable to store combos in : "let combinationQueries = ""
    let combinationQueries = "";

    // loop over the combo values paseed by users
    combinations.forEach((arg) => {
      // first check if the current combo value exists in the object then ...
      // add them together
      combinationQueries +=
        data.hasOwnProperty(arg) && data[arg].toLowerCase().trim() + " ";
    });
    /*
        loop over current "Object keys" and return the first
        successful search match (".some()" at work here)
         */
    return Object.keys(data).some((key) => {
      /**
       * return first successful search query match but...
       * do not return if value is "undefined", "null", false, true,  and...
       * trim values to remove trailing whitespaces
       */
      return (
        (data[key] !== undefined &&
          data[key] !== null &&
          /**
           * activate/uncomment the feature/code below if you don't wanna filter by boolean values
           * e.g isActive fields, or isActivated fields
           */
          // data[key] !== false && data[key] !== true &&
          JSON.stringify(data[key]).toLowerCase().trim().includes(input)) ||
        combinationQueries.trim().includes(input)
      );
    });
  });
  // function to recieve the result of the search query data
  setReturnedData(result);
};

export default search;
