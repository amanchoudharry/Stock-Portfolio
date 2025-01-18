package com.amanPortfolioProj.portfolio.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String ticker;
    private int quantity;
    private Double currPrice;
    private Double buyPrice;

    private LocalDateTime lastUpdated;
    private LocalDateTime createdTime;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Double getCurrPrice() { return currPrice; }
    public void setCurrPrice(double buyPrice) { this.currPrice = buyPrice; }

    public LocalDateTime getLastUpdated() {return lastUpdated;}

    public void setLastUpdated(LocalDateTime lastUpdated) {this.lastUpdated = lastUpdated;}

    public LocalDateTime getCreatedTime() {return createdTime;}

    public void setCreatedTime(LocalDateTime createdTime) {this.createdTime = createdTime;}
    public void setBuyPrice(Double stockPrice) {this.buyPrice=stockPrice;}

    public Double getBuyPrice() {return buyPrice;}

}