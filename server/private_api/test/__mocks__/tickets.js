export function createTickets(length) {

  let tickets = [];

  for (let i = 0; i < length; i ++) {
    tickets.push({ id: i});
  }

  return tickets;

}