import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

const portfolioHoldings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, value: 8771.50, allocation: 28.5, gainLoss: 543.20, gainLossPercent: 6.6 },
  { symbol: "MSFT", name: "Microsoft", shares: 25, value: 8452.75, allocation: 27.4, gainLoss: 432.15, gainLossPercent: 5.4 },
  { symbol: "GOOGL", name: "Alphabet", shares: 10, value: 28476.30, allocation: 22.7, gainLoss: -152.75, gainLossPercent: -0.5 },
  { symbol: "TSLA", name: "Tesla", shares: 15, value: 3727.50, allocation: 12.1, gainLoss: -48.15, gainLossPercent: -1.3 },
  { symbol: "NVDA", name: "NVIDIA", shares: 8, value: 6315.60, allocation: 9.3, gainLoss: 789.45, gainLossPercent: 14.3 },
];

export const PortfolioOverview = () => {
  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <span>Portfolio Holdings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {portfolioHoldings.map((holding) => (
          <div key={holding.symbol} className="space-y-2 p-3 rounded-lg bg-accent/10 border border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-semibold">{holding.symbol}</h4>
                  <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${holding.value.toLocaleString()}</p>
                <div className="flex items-center space-x-1">
                  {holding.gainLoss >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-danger" />
                  )}
                  <span className={`text-sm ${holding.gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                    {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toFixed(2)}
                  </span>
                  <Badge 
                    variant={holding.gainLoss >= 0 ? "default" : "destructive"}
                    className={`ml-1 ${holding.gainLoss >= 0 ? 'bg-success/20 text-success border-success/50' : 'bg-danger/20 text-danger border-danger/50'}`}
                  >
                    {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Allocation</span>
                <span>{holding.allocation}%</span>
              </div>
              <Progress 
                value={holding.allocation} 
                className="h-2"
              />
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Diversification Score</span>
            <Badge variant="outline" className="border-success/50 text-success">
              Excellent
            </Badge>
          </div>
          <Progress value={87} className="mt-2 h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Well-diversified across sectors
          </p>
        </div>
      </CardContent>
    </Card>
  );
};