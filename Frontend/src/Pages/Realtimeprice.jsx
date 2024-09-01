import React from 'react';
import Layout from '../Components/Layout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './csspages/Realtime.css';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Realtimeprice = () => {
  const data = {
    labels: ['Paddy (Common)', 'Paddy (Grade A)', 'Jowar (Hybrid)', 'Jowar (Maldandi)', 'Bajra', 'Maize', 'Ragi', 'Arhar (Tur)', 'Moong', 'Urad', 'Cotton (Medium Staple)', 'Cotton (Long Staple)', 'Groundnut in shell', 'Sunflower seed', 'Soyabeen (Yellow)', 'Sesamum', 'Nigerseed'],
    datasets: [
      {
        label: 'MSP for 2023-2024 (Rs per quintal)',
        data: [2183, 2203, 3180, 3225, 2500, 2090, 3846, 7000, 8558, 6950, 6620, 7020, 6377, 6760, 4600, 8635, 7734],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'MSP for 2024-2025 (Rs per quintal)',
        data: [2300, 2320, 3371, 3421, 2625, 2225, 4290, 7550, 8682, 7400, 7121, 7521, 6783, 7280, 4892, 9267, 8717],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Minimum Support Price (MSP) for Various Commodities (2023-2025)',
      },
    },
  }
  return (
    <>
      <Layout>
        {/* Graph Section */}
        <div className="graph-container">
          <Bar data={data} options={options} />
        </div>
      <h1 className="form-title">RealTime-Price</h1>

        {/* Kharif Crops */}
        <h1 className="form-title">Kharif crops</h1>
        <table className="price-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Variety</th>
              <th>MSP for 2023-2024 (Rs per quintal)</th>
              <th>MSP for 2024-2025 (Rs per quintal)</th>
              <th>Increase over previous year (Rs per quintal)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paddy</td>
              <td>Common</td>
              <td>2183</td>
              <td>2300</td>
              <td>117</td>
            </tr>
            <tr>
              <td>Paddy</td>
              <td>Grade 'A'</td>
              <td>2203</td>
              <td>2320</td>
              <td>117</td>
            </tr>
            <tr>
              <td>Jowar</td>
              <td>Hybrid</td>
              <td>3180</td>
              <td>3371</td>
              <td>191</td>
            </tr>
            <tr>
              <td>Jowar</td>
              <td>Maldandi</td>
              <td>3225</td>
              <td>3421</td>
              <td>196</td>
            </tr>
            <tr>
              <td>Bajra</td>
              <td>-</td>
              <td>2500</td>
              <td>2625</td>
              <td>125</td>
            </tr>
            <tr>
              <td>Maize</td>
              <td>-</td>
              <td>2090</td>
              <td>2225</td>
              <td>135</td>
            </tr>
            <tr>
              <td>Ragi</td>
              <td>-</td>
              <td>3846</td>
              <td>4290</td>
              <td>444</td>
            </tr>
            <tr>
              <td>Arhar (Tur)</td>
              <td>-</td>
              <td>7000</td>
              <td>7550</td>
              <td>550</td>
            </tr>
            <tr>
              <td>Moong</td>
              <td>-</td>
              <td>8558</td>
              <td>8682</td>
              <td>124</td>
            </tr>
            <tr>
              <td>Urad</td>
              <td>-</td>
              <td>6950</td>
              <td>7400</td>
              <td>450</td>
            </tr>
          </tbody>
        </table>

        {/* Rabi Crops */}
        <h1 className="form-title">Rabi crops</h1>
        <table className="price-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Variety</th>
              <th>MSP for 2023-2024 (Rs per quintal)</th>
              <th>MSP for 2024-2025 (Rs per quintal)</th>
              <th>Increase over previous year (Rs per quintal)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cotton</td>
              <td>Medium Staple</td>
              <td>6620</td>
              <td>7121</td>
              <td>501</td>
            </tr>
            <tr>
              <td>Cotton</td>
              <td>Long Staple</td>
              <td>7020</td>
              <td>7521</td>
              <td>501</td>
            </tr>
            <tr>
              <td>Groundnut in shell</td>
              <td>-</td>
              <td>6377</td>
              <td>6783</td>
              <td>406</td>
            </tr>
            <tr>
              <td>Sunflower seed</td>
              <td>-</td>
              <td>6760</td>
              <td>7280</td>
              <td>520</td>
            </tr>
            <tr>
              <td>Soyabeen</td>
              <td>Yellow</td>
              <td>4600</td>
              <td>4892</td>
              <td>292</td>
            </tr>
            <tr>
              <td>Sesamum</td>
              <td>-</td>
              <td>8635</td>
              <td>9267</td>
              <td>632</td>
            </tr>
            <tr>
              <td>Nigerseed</td>
              <td>-</td>
              <td>7734</td>
              <td>8717</td>
              <td>983</td>
            </tr>
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Realtimeprice;
