// Mandi Market Prices & 7-Day Trend Analysis Page
import { MarketCard } from '../components/MarketCard.jsx';
import { ChartCard } from '../components/ChartCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { marketPricesList, mandiStateOptions, mandiDistrictOptions } from '../data/marketData.js';

export function MarketPrices() {
  const [searchCrop, setSearchCrop] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('All States');
  const [selectedDistrict, setSelectedDistrict] = React.useState('All Districts');
  const [selectedMarketForTrend, setSelectedMarketForTrend] = React.useState(marketPricesList[0]);

  const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } = window.Recharts || {};

  // Filtered List
  const filteredMarkets = React.useMemo(() => {
    return marketPricesList.filter(mkt => {
      const matchesSearch = mkt.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
                            mkt.mandi.toLowerCase().includes(searchCrop.toLowerCase());
      const matchesState = selectedState === 'All States' || mkt.state === selectedState;
      const matchesDistrict = selectedDistrict === 'All Districts' || mkt.district === selectedDistrict;

      return matchesSearch && matchesState && matchesDistrict;
    });
  }, [searchCrop, selectedState, selectedDistrict]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-borderEarth">
        <h1 className="text-2xl font-bold font-heading text-wood">
          📈 Live Mandi Market Prices
        </h1>
        <p className="text-xs text-mutedEarth mt-1">
          Track real-time crop rates, minimum/modal/maximum price ranges across regional mandis in Indian Rupees (₹).
        </p>
      </div>

      {/* FILTERS & SEARCH TOOLBAR */}
      <div className="krishi-card p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search crop name or Mandi location..."
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs"
          >
            {mandiStateOptions.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs"
          >
            {mandiDistrictOptions.map(dt => (
              <option key={dt} value={dt}>{dt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 7-DAY PRICE TREND RECHARTS HIGHLIGHT */}
      {selectedMarketForTrend && (
        <ChartCard
          title={`7-Day Mandi Price Trend: ${selectedMarketForTrend.crop}`}
          subtitle={`Location: ${selectedMarketForTrend.mandi} (${selectedMarketForTrend.state}) • Modal Price: ₹${selectedMarketForTrend.modalPrice}/quintal`}
        >
          {ResponsiveContainer ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={selectedMarketForTrend.trend7Days} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DAC8" />
                <XAxis dataKey="day" stroke="#6E655F" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6E655F" tick={{ fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2DAC8', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value) => [`₹ ${value.toLocaleString('en-IN')}`, 'Modal Price/q']}
                />
                <Line type="monotone" dataKey="price" stroke="#55703B" strokeWidth={3} dot={{ r: 5, fill: "#C9942F" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="p-8 text-center text-xs text-mutedEarth">Chart loading...</div>
          )}
        </ChartCard>
      )}

      {/* MANDI MARKET LISTINGS GRID */}
      {filteredMarkets.length === 0 ? (
        <EmptyState
          title="No Mandi Market Prices Match"
          message="Try selecting 'All States' or clearing your search term."
          onAction={() => {
            setSearchCrop('');
            setSelectedState('All States');
            setSelectedDistrict('All Districts');
          }}
          actionLabel="Reset Search Filters"
        />
      ) : (
        <div>
          <h3 className="text-lg font-bold font-heading text-wood mb-3">
            Mandi Price Cards (Click any to view 7-Day Graph)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map(mkt => (
              <MarketCard
                key={mkt.id}
                market={mkt}
                onSelect={(m) => setSelectedMarketForTrend(m)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
