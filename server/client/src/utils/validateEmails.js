// Function to validate inputted emails
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  // split string 
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false); // return true inside filter => value will be KEPT

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails.join().replace(/,/g, ', ')}`;
  }

  return;
};