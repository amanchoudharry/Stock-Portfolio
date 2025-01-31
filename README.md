# **Portfolio Tracker Application**

## **Overview**
The Portfolio Tracker is a full-stack web application that helps users manage and monitor their stock portfolios. Users can add, edit, delete, and view their stock holdings. The application dynamically fetches stock prices using the Alpha Vantage API and calculates total portfolio value.

---

## **Features**
- Add, edit, and delete stocks.
- Display current stock holdings in a tabular format.
- Calculate the total portfolio value dynamically using real-time stock prices.
- Integrates with the Alpha Vantage API for stock price updates.

---

## **Steps to Run the Project Locally**

### **1. Prerequisites**
- Install [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html)
- Install [Node.js](https://nodejs.org/) (for the frontend)
- Install [MySQL](https://dev.mysql.com/downloads/installer/)
- Install [Maven](https://maven.apache.org/install.html)
- Install [Git](https://git-scm.com/)

### **2. Backend Setup**
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/portfolio-tracker.git](https://github.com/amanchoudharry/Stock-Portfolio.git)
   cd Stock-Portfolio/portfolio
   ```

2. Create a database in MySQL:
   ```sql
   CREATE DATABASE stock;
   ```

3. Configure `application.properties`:
   Update the file according to your local DB in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/stock
   spring.datasource.username=root
   spring.datasource.password=root
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   alpha.api.key=YOUR_ALPHA_VANTAGE_API_KEY
   ```

4. Open project in any IDE and Run java main file :
   
   ```bash
   PortfolioApplication.java
   ```
   The backend will be accessible at:
   ```
   http://localhost:8080
   ```

### **3. Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd Stock-Portfolio/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at:
   ```
   http://localhost:5173
   ```

---

## **Deployed Links**
- **Frontend**: Will update soon...
- **Backend**: Will update soon...
- **API Documentation**: [Alpha Vantage](https://www.alphavantage.co/documentation/#latestprice)

---

## **APIs**
Below are the key API endpoints:

| Method | Endpoint                       | Description                      |
|--------|--------------------------------|----------------------------------|
| GET    | `/api/stocks`                 | Get all stocks                  |
| POST   | `/api/stocks`                 | Add a new stock                 |
| PUT    | `/api/stocks/{id}`            | Update a stock                  |
| DELETE | `/api/stocks/{id}`            | Delete a stock                  |
| GET    | `/api/stocks/value`           | Get total portfolio value       |
| GET    | `/api/stocks/random`          | Assign random stocks to the user|

---

## **Assumptions & Limitations**
1. **Assumptions**:
   - Each stock added to the portfolio represents 1 unit by default .
   - The stock price updates dynamically but may have a slight delay due to the API's rate limits.

2. **Limitations**:
   - **API Limit**: The Alpha Vantage API allows only 25 requests per day. Frequent refreshes may exhaust this limit; But you can use VPN to Adress this limitation.
   - **Authentication**: The application currently lacks user authentication and multi-user support.

---

## **Future Enhancements**
- Add user authentication to support multiple users.
- Implement pagination for stock lists.
- Integrate with a more robust API for stock data.
- Add charts to visualize portfolio performance.

---

Feel free to reach out for any assistance! 🚀
