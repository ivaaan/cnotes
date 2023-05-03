export const getCalendarEvents = async () => {
  try {
    const response = await fetch("http://localhost:4200/");
    return response;
  } catch (e) {
    console.log(e);
  }
};

// module.exports = { getCalendarEvents };
