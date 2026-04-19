const TrainingTable = ({ data, deleteFunction }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-header flex justify-between items-center p-4">
        <h3 className="card-title">Historique des Entraînements</h3>
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="input input-sm input-secondary w-full max-w-xs" 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Value</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover">
                <td>{row.id}</td>
                <td>
                  <span className="badge badge-soft badge-primary">{row.value} reps</span>
                </td>
                <td>{new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'short'
}).format(new Date(row.date))}</td>
                <td className="text-right">
                  <button className="" onClick={() => deleteFunction(row.id)}> <span className="icon-[tabler--backspace-filled] size-5 text-red-500 p-1"></span> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Style FlyonUI */}
      <div className="card-footer flex justify-between items-center p-4">
        <span className="text-sm text-base-content/50">Affichage de 1 à 10 sur 50</span>
        <div className="join">
          <button className="join-item btn btn-sm">Précédent</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">Suivant</button>
        </div>
      </div>
    </div>
  );
};
export default TrainingTable;