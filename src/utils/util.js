export const getTodayDate = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedToday = today.toLocaleDateString('en-GB', options);
    return formattedToday;
}

  export const isTaskLate = (deadlineDate, completedDate,todo) => {
    if ((deadlineDate >= completedDate) && todo.completed) {
        // everything fine
      return 1; 
    } else if (!todo.completed) {
        //not completed
      return -1; 
    } else if (deadlineDate < completedDate && todo.completed) {
        //late
      return 0; 
    }
  };

  export const formatDateToISOString = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = new Date(year, month - 1, day);
    const isoString = formattedDate.toISOString();
    return isoString;
}