import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
  isActive?: boolean;
}

export const StockCard = ({ stock, onClick, isActive }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  return (
    <Card 
      className={cn(
        "gradient-card border-border/50 cursor-pointer transition-smooth hover:shadow-glow hover:scale-[1.02]",
        isActive && "ring-2 ring-primary shadow-glow"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"} 
            className={cn(
              "transition-smooth",
              isPositive ? "bg-success/20 text-success border-success/50" : "bg-danger/20 text-danger border-danger/50"
            )}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(stock.changePercent).toFixed(2)}%
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            ${stock.price.toFixed(2)}
          </div>
          <div className={cn(
            "text-sm font-medium transition-smooth",
            isPositive ? "text-success" : "text-danger",
            isPositive ? "price-up" : "price-down"
          )}>
            {isPositive ? "+" : ""}${stock.change.toFixed(2)} ({isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%)
          </div>
        </div>

        {/* Mini Chart Visualization */}
        <div className="mt-4 flex items-end space-x-1 h-8">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-t transition-smooth",
                isPositive ? "bg-success/40" : "bg-danger/40"
              )}
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};