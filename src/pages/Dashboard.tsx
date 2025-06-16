const { user } = useAuth();
const { data: medications } = useMedications(user?.id);
const markTaken = useMarkTaken();

return (
  <>
    <AddMedicationForm userId={user.id} />
    <ul>
      {medications?.map((m) => (
        <li key={m.id}>
          {m.name} - {m.dosage}
          <button onClick={() => markTaken.mutate({ id: m.id, date: new Date().toISOString().split('T')[0] })}>
            Mark Taken Today
          </button>
        </li>
      ))}
    </ul>
  </>
);
