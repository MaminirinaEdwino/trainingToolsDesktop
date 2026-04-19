import Chart from "react-apexcharts";

const TrainingChart = ({ data }) => {
  // data serait un tableau d'objets venant de ton backend Go : [{value: 10, date: "..."}, ...]

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit', // Utilise la police de FlyonUI
    },
    colors: ['#5a67d8'], // Couleur primaire de ton thème
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: data.map(d => new Intl.DateTimeFormat('fr-FR').format(new Date(d.date))),
      labels: { style: { colors: '#9ca3af' } }
    },
    yaxis: {
      labels: { style: { colors: '#9ca3af' } }
    },
    grid: { borderColor: '#374151' }, // Couleur adaptée au mode sombre
  };

  const chartSeries = [
    {
      name: "Reps",
      data: data.map(d => d.value)
    }
  ];

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h2 className="card-title text-base-content">Progression</h2>
        <Chart 
          options={chartOptions} 
          series={chartSeries} 
          type="line" 
          height={300} 
        />
      </div>
    </div>
  );
};

export default TrainingChart;