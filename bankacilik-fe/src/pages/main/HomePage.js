import React from 'react';
import CurrencyCard from '../../components/card/CurrencyCard';
import ChartCard from '../../components/card/ChartCard';
import AreaChart from '../../components/card/AreaChart';
import LineChart from '../../components/card/LineChart';

const Home = () => {
  return (
    <div className="container-fluid mx-auto px-6 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* CurrencyCard */}
        <div className="flex flex-col h-80 col-span-1">
          <CurrencyCard />
        </div>
        
        {/* Diğer 3 kart */}
        <div className="flex flex-col col-span-3 gap-8">
          <div className="flex flex-col-2 gap-8">
            <div className="flex-1 h-80">
              <ChartCard />
            </div>
            <div className="flex-1 h-80">
              <AreaChart />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Home;
