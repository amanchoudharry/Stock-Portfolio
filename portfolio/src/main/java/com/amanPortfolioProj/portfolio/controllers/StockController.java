package com.amanPortfolioProj.portfolio.controllers;

import com.amanPortfolioProj.portfolio.Model.Stock;
import com.amanPortfolioProj.portfolio.services.RandomStock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.amanPortfolioProj.portfolio.services.StockService;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @Autowired
    private RandomStock randomStock;

    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.addStock(stock));
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.updateStock(id, stock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/value")
    public Double getPortfolioValue() {
        // Replace userId with actual user logic
        return stockService.calculatePortfolioValue(1L);
    }
    @GetMapping("/random")
    public ResponseEntity<List<Stock>> assignRandomStocks() {
        // Replace 1L with actual user ID logic if required
        List<Stock> randomStocks = randomStock.assignRandomStocks(1L);
        return ResponseEntity.ok(randomStocks);
    }
}
