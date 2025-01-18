package com.amanPortfolioProj.portfolio.repository;

import com.amanPortfolioProj.portfolio.Model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
}
