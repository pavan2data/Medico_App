const adherence = (m: Medication) => {
  const taken = m.taken_on?.length || 0;
  const expected = // calculate based on frequency
  return Math.round((taken / expected) * 100);
};
