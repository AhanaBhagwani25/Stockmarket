import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, BarChart3 } from "lucide-react";
import { StockCard } from "./StockCard";
import { PortfolioOverview } from "./PortfolioOverview";
import { TradingInterface } from "./TradingInterface";
import { PerformanceChart } from "./PerformanceChart";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Portfolio {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

const mockStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.63, change: -15.27, changePercent: -0.53 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 338.11, change: 4.82, changePercent: 1.45 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -3.21, changePercent: -1.27 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 127.74, change: 1.89, changePercent: 1.50 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 789.45, change: 12.34, changePercent: 1.59 },
];

const mockPortfolio: Portfolio = {
  totalValue: 125680.50,
  dayChange: 1247.32,
  dayChangePercent: 1.00,
  totalGainLoss: 8543.20,
  totalGainLossPercent: 7.29,
};

export const Dashboard = () => {
  const [activeStock, setActiveStock] = useState<Stock | null>(null);
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2; // -1 to 1
          const newPrice = stock.price + randomChange;
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Stock Market Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your investments and trade with confidence
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-success border-success/50">
            <Activity className="w-3 h-3 mr-1" />
            Market Open
          </Badge>
          <Button variant="default" className="gradient-primary">
            <DollarSign className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockPortfolio.totalValue.toLocaleString()}</div>
            <div className={`text-sm flex items-center ${mockPortfolio.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>
              {mockPortfolio.dayChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              ${Math.abs(mockPortfolio.dayChange).toFixed(2)} ({mockPortfolio.dayChangePercent.toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${mockPortfolio.totalGainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
              ${mockPortfolio.totalGainLoss.toLocaleString()}
            </div>
            <div className={`text-sm ${mockPortfolio.totalGainLossPercent >= 0 ? 'text-success' : 'text-danger'}`}>
              {mockPortfolio.totalGainLossPercent.toFixed(2)}% all time
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">8 profitable</div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Buying Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$24,350.75</div>
            <div className="text-sm text-muted-foreground">Available to trade</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <PieChart className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Watchlist</span>
          </TabsTrigger>
          <TabsTrigger value="trading" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Trading</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PortfolioOverview />
            <PerformanceChart />
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onClick={() => setActiveStock(stock)}
                isActive={activeStock?.symbol === stock.symbol}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <TradingInterface stocks={stocks} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart />
            <PortfolioOverview />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};