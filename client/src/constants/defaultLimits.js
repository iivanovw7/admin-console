
/*
Defines time period within witch queried data should have been created
Used for statistics, query period 12 months
should return only data created not earlier than 12 months from now (current date)

Units: months
 */
export const statsQueryTimeLimits = [
  6, 12, 24, 36, 48
];