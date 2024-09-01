import React from 'react'
import Layout from '../Components/Layout'
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
      <h1>Real time price</h1>
    </Layout>
  </>//dont change the name of function while building
  )
}

export default Realtimeprice;
