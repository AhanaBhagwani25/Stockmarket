import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, TrendingDown, Calculator, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface TradingInterfaceProps {
  stocks: Stock[];
}

export const TradingInterface = ({ stocks }: TradingInterfaceProps) => {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("market");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const { toast } = useToast();

  const selectedStockData = stocks.find(stock => stock.symbol === selectedStock);
  const estimatedTotal = selectedStockData && quantity ? 
    selectedStockData.price * parseFloat(quantity) : 0;

  const handleTrade = (action: 'buy' | 'sell') => {
    if (!selectedStock || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please select a stock and enter quantity",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `${action === 'buy' ? 'Purchase' : 'Sale'} Simulated`,
      description: `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${selectedStock} for $${estimatedTotal.toFixed(2)}`,
    });

    // Reset form
    setQuantity("");
    setLimitPrice("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span>Trade Stocks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stock-select">Select Stock</Label>
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger id="stock-select">
                <SelectValue placeholder="Choose a stock to trade" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <span>{stock.symbol} - {stock.name}</span>
                      <span className={`ml-2 ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        ${stock.price.toFixed(2)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStockData && (
            <div className="p-3 rounded-lg bg-accent/10 border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{selectedStockData.symbol}</h4>
                  <p className="text-sm text-muted-foreground">{selectedStockData.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${selectedStockData.price.toFixed(2)}</p>
                  <Badge 
                    variant={selectedStockData.change >= 0 ? "default" : "destructive"}
                    className={selectedStockData.change >= 0 ? 'bg-success/20 text-success border-success/50' : 'bg-danger/20 text-danger border-danger/50'}
                  >
                    {selectedStockData.change >= 0 ? '+' : ''}${selectedStockData.change.toFixed(2)} ({selectedStockData.changePercent.toFixed(2)}%)
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-type">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger id="order-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {orderType === 'limit' && (
            <div className="space-y-2">
              <Label htmlFor="limit-price">Limit Price</Label>
              <Input
                id="limit-price"
                type="number"
                placeholder="0.00"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                step="0.01"
              />
            </div>
          )}

          {estimatedTotal > 0 && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="font-medium">Order Summary</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Total:</span>
                  <span className="font-semibold">${estimatedTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Buying Power:</span>
                  <span className="text-success">$24,350.75</span>
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy" className="text-success">Buy</TabsTrigger>
              <TabsTrigger value="sell" className="text-danger">Sell</TabsTrigger>
            </TabsList>
            <TabsContent value="buy" className="mt-4">
              <Button 
                className="w-full gradient-success text-success-foreground"
                onClick={() => handleTrade('buy')}
                disabled={!selectedStock || !quantity}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy {selectedStock || 'Stock'}
              </Button>
            </TabsContent>
            <TabsContent value="sell" className="mt-4">
              <Button 
                className="w-full gradient-danger text-danger-foreground"
                onClick={() => handleTrade('sell')}
                disabled={!selectedStock || !quantity}
                variant="destructive"
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Sell {selectedStock || 'Stock'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { symbol: "AAPL", action: "BUY", quantity: 10, price: 173.28, time: "2 hours ago", status: "Filled" },
              { symbol: "MSFT", action: "SELL", quantity: 5, price: 333.29, time: "1 day ago", status: "Filled" },
              { symbol: "GOOGL", action: "BUY", quantity: 2, price: 2862.90, time: "2 days ago", status: "Filled" },
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-border/30">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={order.action === "BUY" ? "default" : "destructive"}
                    className={order.action === "BUY" ? 'bg-success/20 text-success border-success/50' : 'bg-danger/20 text-danger border-danger/50'}
                  >
                    {order.action}
                  </Badge>
                  <div>
                    <p className="font-semibold">{order.symbol}</p>
                    <p className="text-sm text-muted-foreground">{order.quantity} shares @ ${order.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-success/50 text-success">
                    {order.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};