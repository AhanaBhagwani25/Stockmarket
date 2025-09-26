import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

// Mock chart data - in a real app, this would come from a charting library like Recharts
const generateMockData = (days: number) => {
  const data = [];
  let value = 100000; // Starting portfolio value
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * 2000; // Slight upward bias
    value += change;
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: value,
      change: change
    });
  }
  
  return data;
};

const chartData = {
  "1D": generateMockData(1),
  "1W": generateMockData(7),
  "1M": generateMockData(30),
  "3M": generateMockData(90),
  "1Y": generateMockData(365),
};

export const PerformanceChart = () => {
  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <span>Portfolio Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1M" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-accent/50">
              <TabsTrigger value="1D">1D</TabsTrigger>
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
              <TabsTrigger value="3M">3M</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-success/50 text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +7.29%
              </Badge>
            </div>
          </div>

          {Object.entries(chartData).map(([period, data]) => (
            <TabsContent key={period} value={period}>
              <div className="space-y-4">
                {/* Simplified Chart Visualization */}
                <div className="h-48 flex items-end space-x-1 bg-accent/10 rounded-lg p-4">
                  {data.slice(-20).map((point, index) => {
                    const maxValue = Math.max(...data.map(d => d.value));
                    const minValue = Math.min(...data.map(d => d.value));
                    const height = ((point.value - minValue) / (maxValue - minValue)) * 100;
                    const isPositive = index === 0 ? true : point.value > data[data.indexOf(point) - 1]?.value;
                    
                    return (
                      <div
                        key={index}
                        className={`flex-1 rounded-t transition-smooth ${
                          isPositive ? 'bg-success/60 hover:bg-success' : 'bg-danger/60 hover:bg-danger'
                        }`}
                        style={{ height: `${height}%` }}
                        title={`$${point.value.toLocaleString()}`}
                      />
                    );
                  })}
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-border/30">
                    <p className="text-xs text-muted-foreground">High</p>
                    <p className="font-semibold text-success">
                      ${Math.max(...data.map(d => d.value)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-border/30">
                    <p className="text-xs text-muted-foreground">Low</p>
                    <p className="font-semibold text-danger">
                      ${Math.min(...data.map(d => d.value)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-border/30">
                    <p className="text-xs text-muted-foreground">Volatility</p>
                    <p className="font-semibold">12.4%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-border/30">
                    <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                    <p className="font-semibold">1.42</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Period Summary</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Return:</span>
                      <span className="font-semibold text-success">+$8,543.20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Day:</span>
                      <span className="font-semibold text-success">+$1,247.32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Worst Day:</span>
                      <span className="font-semibold text-danger">-$892.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate:</span>
                      <span className="font-semibold">64.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};