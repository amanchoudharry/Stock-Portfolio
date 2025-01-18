package com.amanPortfolioProj.portfolio.services;

import com.amanPortfolioProj.portfolio.Model.Stock;
import com.amanPortfolioProj.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class RandomStock {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    private final List<String> availableStocks = Arrays.asList("IBM", "AAPL", "GOOGL", "MSFT", "TSLA");

    public List<Stock> assignRandomStocks(Long userId) {
        // Shuffle and pick 5 random stocks
        Collections.shuffle(availableStocks);
        List<String> selectedStocks = availableStocks.subList(0, 2);

        // Save selected stocks to the database
        selectedStocks.forEach(ticker -> {
            Stock stock = new Stock();
            stock.setTicker(ticker);
            stock.setName(getCompanyName(ticker)); // Add a helper to fetch the name
            stock.setQuantity(1); // Fixed quantity for assignment
            stock.setCurrPrice(0.0); // Default or calculated current price
            stock.setBuyPrice(stockPriceService.getStockPrice(ticker));
            stock.setCreatedTime(LocalDateTime.now());
            stockRepository.save(stock);
        });

        return stockRepository.findAll(); // Return the user's portfolio
    }

    private String getCompanyName(String ticker) {
        // Map ticker to company name
        switch (ticker) {
            case "IBM": return "IBM";
            case "AAPL": return "Apple";
            case "GOOGL": return "Google";
            case "MSFT": return "Microsoft";
            case "TSLA": return "Tesla";
            case "AMZN": return "Amazon";
            default: return "Unknown";
        }
    }
}

