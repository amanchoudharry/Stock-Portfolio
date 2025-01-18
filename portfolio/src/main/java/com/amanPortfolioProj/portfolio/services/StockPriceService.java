package com.amanPortfolioProj.portfolio.services;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StockPriceService {

    private static final String API_KEY = "BO0USN8IOH8QB6XN"; // Replace with your Alpha Vantage API key
    private static final String BASE_URL = "https://www.alphavantage.co/query";

    public Double getStockPrice(String ticker) {
        RestTemplate restTemplate = new RestTemplate();

        // Build the URL for the API request
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("function", "GLOBAL_QUOTE")
                .queryParam("symbol", ticker)
                .queryParam("apikey", API_KEY)
                .toUriString();
        System.out.println(url);

        try {
            // Call the API and parse the response
            var response = restTemplate.getForObject(url, StockPriceResponse.class);
            if (response != null && response.getGlobalQuote() != null) {
                return response.getGlobalQuote().getPriceAsDouble();
            }
        } catch (Exception e) {
            System.err.println("Error fetching stock price for ticker " + ticker + ": " + e.getMessage());
        }

        return null; // Return null if unable to fetch price
    }

    public static class StockPriceResponse {
        private GlobalQuote globalQuote;

        // Map "Global Quote" to this field
        @JsonProperty("Global Quote")
        public GlobalQuote getGlobalQuote() {
            return globalQuote;
        }

        public void setGlobalQuote(GlobalQuote globalQuote) {
            this.globalQuote = globalQuote;
        }
    }

    public static class GlobalQuote {
        private String symbol;
        private String price;

        // Map "01. symbol" to the symbol field
        @JsonProperty("01. symbol")
        public String getSymbol() {
            return symbol;
        }

        public void setSymbol(String symbol) {
            this.symbol = symbol;
        }

        @JsonProperty("05. price")
        public String getPrice() {
            return price;
        }

        public Double getPriceAsDouble() {
            try {
                return price != null ? Double.parseDouble(price) : null;
            } catch (NumberFormatException e) {
                System.err.println("Error parsing price: " + price);
                return null;
            }
        }

        public void setPrice(String price) {
            this.price = price;
        }
    }

}

