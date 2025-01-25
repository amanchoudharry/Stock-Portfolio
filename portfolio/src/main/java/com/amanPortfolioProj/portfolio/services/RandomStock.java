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

    private final List<String> availableStocks = Arrays.asList(
            "AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META",
            "NFLX", "NVDA", "ORCL", "INTC", "ADBE", "CSCO",
            "PYPL", "SNAP", "KO"
    );


    public List<Stock> assignRandomStocks(Long userId) {
        // Shuffle and pick 5 random stocks
        Collections.shuffle(availableStocks);
        List<String> selectedStocks = availableStocks.subList(0, 5);

        // Save selected stocks to the database
        selectedStocks.forEach(ticker -> {
            Stock stock = new Stock();
            Double fetchedPrice = stockPriceService.getStockPrice(ticker); //calculated current price
            stock.setTicker(ticker);
            stock.setName(getCompanyName(ticker)); // Added a helper to fetch the name
            stock.setQuantity(1); // Fixed quantity for assignment
            stock.setCurrPrice(fetchedPrice);
            stock.setBuyPrice(fetchedPrice);
            stock.setCreatedTime(LocalDateTime.now());
            stock.setLastUpdated(LocalDateTime.now());
            stockRepository.save(stock);
        });

        return stockRepository.findAll(); // Return the user's portfolio
    }

    private String getCompanyName(String ticker) {
        // Map ticker to company name
        switch (ticker) {
            case "AAPL": return "Apple Inc.";
            case "GOOGL": return "Alphabet Inc. (Google)";
            case "MSFT": return "Microsoft Corporation";
            case "TSLA": return "Tesla, Inc.";
            case "AMZN": return "Amazon.com, Inc.";
            case "META": return "Meta Platforms, Inc. (Facebook)";
            case "NFLX": return "Netflix, Inc.";
            case "NVDA": return "NVIDIA Corporation";
            case "ORCL": return "Oracle Corporation";
            case "INTC": return "Intel Corporation";
            case "ADBE": return "Adobe Inc.";
            case "CSCO": return "Cisco Systems, Inc.";
            case "PYPL": return "PayPal Holdings, Inc.";
            case "SNAP": return "Snap Inc.";
            case "KO": return "The Coca-Cola Company";
            default: return "Unknown";
        }
    }
}

