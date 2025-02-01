package com.amanPortfolioProj.portfolio.services;

import com.amanPortfolioProj.portfolio.Model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amanPortfolioProj.portfolio.repository.StockRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    private static final long PRICE_REFRESH_INTERVAL_HOURS = 1; // Refresh prices every 1 hour

    // Add a new stock
    public Stock addStock(Stock stock) {
        System.out.println(stock);
//        Double fetchedPrice = stockPriceService.getStockPrice(stock.ticker);
        stock.setCreatedTime(LocalDateTime.now());
        stock.setLastUpdated(LocalDateTime.now());
//        stock.setCurrPrice(fetchedPrice);
        return stockRepository.save(stock);
    }

    // Fetch all stocks and update prices if necessary
    public List<Stock> getAllStocks() {
        // Fetch all stocks from the database
        List<Stock> stocks = stockRepository.findAll();

        // Update price only if needed
        return stocks.stream().map(this::fetchAndUpdatePriceIfNecessary).collect(Collectors.toList());
    }

    // Update stock details
    public Stock updateStock(Long id, Stock updatedStock) {
        Optional<Stock> stockOptional = stockRepository.findById(id);
        if (stockOptional.isEmpty()) {
            throw new RuntimeException("Stock not found with ID: " + id);
        }
        Stock existingStock = stockOptional.get();
        existingStock.setName(updatedStock.getName());
        existingStock.setTicker(updatedStock.getTicker());
        existingStock.setQuantity(updatedStock.getQuantity());
        existingStock.setBuyPrice(updatedStock.getBuyPrice());
        existingStock.setLastUpdated(LocalDateTime.now());
        return stockRepository.save(existingStock);
    }

    // Delete a stock
    public void deleteStock(Long id) {
        if (!stockRepository.existsById(id)) {
            throw new RuntimeException("Stock not found with ID: " + id);
        }
        stockRepository.deleteById(id);
    }

    // Calculate total portfolio value
    public Double calculatePortfolioValue(Long userId) {
        // Fetch all stocks for the user (Update this logic to filter by user if needed)
        List<Stock> stocks = stockRepository.findAll();

        // Calculate the total value based on cached prices
        return stocks.stream()
                .mapToDouble(stock -> {
                    Stock updatedStock = fetchAndUpdatePriceIfNecessary(stock);
                    return updatedStock.getCurrPrice() * updatedStock.getQuantity();
                })
                .sum();
    }

    // Check if the price needs to be updated, and fetch it if necessary
    private Stock fetchAndUpdatePriceIfNecessary(Stock stock) {
        if (shouldFetchPrice(stock)) {
            Double fetchedPrice = stockPriceService.getStockPrice(stock.getTicker());
            if (fetchedPrice != null) {
                stock.setCurrPrice(fetchedPrice);
                stock.setLastUpdated(LocalDateTime.now());
                stockRepository.save(stock); // Save the updated stock to the database
            }
        }
        return stock;
    }

    // Determine if the price needs to be refreshed
    private boolean shouldFetchPrice(Stock stock) {
        // Refresh if the price is null or the last updated time exceeds the refresh interval
        return stock.getCurrPrice() == null ||
                stock.getLastUpdated() == null ||
                ChronoUnit.HOURS.between(stock.getLastUpdated(), LocalDateTime.now()) >= PRICE_REFRESH_INTERVAL_HOURS;
    }
}
