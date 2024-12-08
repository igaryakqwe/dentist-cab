export const getDateOfBirth = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('uk-UA', options).format(date);
};

export const calculateEndTime = (startDate: Date, duration: number): Date => {
  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + duration);

  return endDate;
};

export const getTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('uk-UA', options).format(date);
};
