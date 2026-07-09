/* ============================================================
   PROJECT DATA
   Single source of truth. Every page (home, category pages,
   skills page) renders from this array — edit here, it updates
   everywhere.
   ============================================================ */

const SITE = {
  name: "Ifeatu Anazonwu",
  role: "Data Analyst & Data Scientist",
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
};

const PROJECTS = [

  /* ---------------- DATA SCIENCE ---------------- */

  {
    id: "loan-default-risk",
    category: "data-science",
    title: "Loan Default Risk Prediction",
    tagline: "Catching risky borrowers before the money goes out the door",
    problem: "A portfolio of 874 loans had no systematic way to flag who was likely to default. Lenders were extending credit across multiple banks, employment types, and account categories with no shared view of where the real risk was concentrated.",
    method: "Merged loan performance, demographic, and prior-loan history into a single modeling table, then engineered features like loan-to-income ratio, risk bands, and a payment-behavior score. Benchmarked Logistic Regression, Random Forest, XGBoost, and LightGBM — using SMOTE to correct class imbalance and SHAP to explain individual predictions — then ran a cost-sensitive threshold search before shipping results to a two-page Power BI dashboard.",
    impact: "Logistic Regression was selected for production: it caught 100% of real defaults (recall) at 78% precision. Unemployed (90% default rate) and self-employed (85%) borrowers came out as the highest-risk segments, with a recommendation to raise the decision threshold to reduce false alarms without letting risk back in.",
    impactPending: false,
    metrics: [
      { label: "Recall", value: "100%" },
      { label: "Precision", value: "78%" },
      { label: "F1 score", value: "0.88" },
      { label: "Loans scored", value: "874" }
    ],
    skills: ["Python", "Pandas", "scikit-learn", "XGBoost", "LightGBM", "SMOTE", "SHAP", "Power BI", "DAX"],
    screenshots: [
      { src: "assets/screenshots/loan_dashboard_page1.png", caption: "Power BI dashboard — risk scoring, threshold control, and cohort risk by employment status" },
      { src: "assets/screenshots/loan_shap_feature_importance.png", caption: "SHAP feature importance — what drives each prediction" },
      { src: "assets/screenshots/loan_confusion_matrix_pr_curve.png", caption: "Confusion matrix & precision–recall curve" },
      { src: "assets/screenshots/loan_eda_boxplots.png", caption: "EDA — distribution of numeric features" }
    ],
    files: [
      { name: "Project_Report.docx", path: "assets/files/Loan_Default_Risk_Report.docx", ext: "DOCX" },
      { name: "Model_Notebook.ipynb", path: "assets/files/Loan_Default_Risk_Model.ipynb", ext: "IPYNB" },
      { name: "Dashboard.pbix", path: "assets/files/Loan_Default_Risk_Dashboard.pbix", ext: "PBIX" }
    ]
  },

  {
    id: "canada-income",
    category: "data-science",
    title: "Canada Per Capita Income Forecast",
    tagline: "A 47-year income trend, distilled into one number for 2020",
    problem: "Given decades of per-capita income data for Canada, the task was to answer one concrete question: what should per-capita income look like in 2020 if the existing trend held?",
    method: "Fit a simple linear regression (scikit-learn) on 47 years of per-capita income data (1970–2016), using year as the sole predictor, then plotted the fitted line against the historical scatter before extrapolating forward.",
    impact: "The model predicted a 2020 per-capita income of $41,288.69 (slope ≈ $828/year). It's a clean illustration of how far a single-variable model can responsibly be pushed — and a visible reminder of its limits, given the flattening trend in the most recent years of actual data.",
    impactPending: false,
    metrics: [
      { label: "2020 prediction", value: "$41,288.69" },
      { label: "Years of data", value: "47" },
      { label: "Model", value: "Linear Reg." }
    ],
    skills: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Linear Regression"],
    screenshots: [
      { src: "assets/screenshots/canada_income_regression.png", caption: "Per-capita income vs. year, with fitted regression line and 2020 prediction" }
    ],
    files: [
      { name: "income_regression.py", path: "assets/files/Canada_Per_Capita_Income_Regression.py", ext: "PY" }
    ]
  },

  {
    id: "female-births-arima",
    category: "data-science",
    title: "Daily Female Births — Time Series Forecasting",
    tagline: "Finding the signal in a year of daily noise",
    problem: "Daily birth counts are noisy day to day. The goal was to determine whether the series had any real structure worth modeling — and if so, use it to forecast the next month.",
    method: "Tested for stationarity with an Augmented Dickey-Fuller test, examined ACF/PACF plots to choose model order, fit an ARIMA(2,0,1) model, then validated it with residual diagnostics (Q-Q plot, ACF of residuals, histogram) before producing a 30-day forecast with confidence intervals.",
    impact: "The ADF test rejected non-stationarity decisively (p ≈ 0.00005), confirming the series didn't need differencing. The ARIMA(2,0,1) fit converged cleanly and produced a stable 30-day forecast holding around 43–44 births/day — a textbook case of a series that looks chaotic daily but is well-behaved on average.",
    impactPending: false,
    metrics: [
      { label: "ADF p-value", value: "0.00005" },
      { label: "Model", value: "ARIMA(2,0,1)" },
      { label: "Forecast horizon", value: "30 days" }
    ],
    skills: ["Python", "statsmodels", "ARIMA", "Time Series", "Seaborn"],
    screenshots: [
      { src: "assets/screenshots/female_births_timeseries.png", caption: "Daily female births, California 1959 — the raw series" },
      { src: "assets/screenshots/female_births_arima_forecast.png", caption: "ARIMA(2,0,1) 30-day forecast with confidence interval" }
    ],
    files: [
      { name: "births_arima.py", path: "assets/files/Female_Births_ARIMA_Forecast.py", ext: "PY" }
    ]
  },

  /* ---------------- DATA ANALYSIS ---------------- */

  {
    id: "sales-dashboard",
    category: "data-analysis",
    title: "Sales Dashboard — Performance & Customer Analysis",
    tagline: "68K products sold, 57.8M profit — who bought, through which channel, and why",
    problem: "The business wanted to know which customer profiles actually convert into a sale — not just total revenue, but who says yes and who doesn't, across income, commute distance, age, and education.",
    method: "Built a Power BI report with slicers for marital status, region, and education, then visualized purchase behavior from four angles: average income per purchase by gender, customer distance by commute bucket, age-bracket distribution, and purchase trend by exact age — each split by Purchased (Yes/No).",
    impact: "68K products sold, £155M in total sales, £57.8M profit across three channels. Wholesale, Distributor, and Export show diverging profit margins — Export leads on margin while Wholesale drives volume. Christchurch is the top city at 22.29% of sales. On the customer side, higher-income male buyers had the widest gap between buyers and non-buyers, and middle-aged customers drove the largest share of conversions.",
    impactPending: false,
    metrics: [
      { label: "Total sales", value: "£155M" },
      { label: "Profit", value: "£57.8M" },
      { label: "Products sold", value: "68K" },
      { label: "Top city", value: "Christchurch" }
    ],
    skills: ["Power BI", "DAX", "Data Modeling"],
    screenshots: [
      { src: "assets/screenshots/sales_dashboard_cy_py_enhanced.png", caption: "Sales Dashboard — CY vs LY revenue, profit margin by channel, top cities" },
      { src: "assets/screenshots/sales_dashboard_bike_buyers_enhanced.png", caption: "Customer segmentation — purchase rates by income, commute, age bracket" }
    ],
    files: [
      { name: "Sales_Dashboard.pbix", path: "assets/files/Sales_Dashboard.pbix", ext: "PBIX" }
    ]
  },

  {
    id: "vrinda-store",
    category: "data-analysis",
    title: "Vrinda Store — Customer & Sales Analysis",
    tagline: "Who's buying what, on which platform, and when",
    problem: "Raw, order-level e-commerce data spread across multiple sales channels (Amazon, Myntra, Flipkart, Ajio, Meesho, and more) needed to be turned into something a business could actually act on: who the customers are, where sales come from, and how demand moves month to month.",
    method: "Cleaned and typed order-level data (orders, customers, age, gender, channel, SKU, category, status), then built pivot tables and charts breaking sales down by sales channel, age group, gender, and month.",
    impact: "Amazon and Myntra came out as the dominant channels, women drove the larger share of sales across every age group, and order volume climbed steadily from December through March.",
    impactPending: false,
    metrics: [
      { label: "Top channel", value: "Amazon" },
      { label: "Sales channels", value: "6+" }
    ],
    skills: ["Excel", "Pivot Tables", "Data Cleaning", "Data Visualization"],
    screenshots: [
      { src: "assets/screenshots/vrinda_channel_vs_sales.png", caption: "Sales by channel — Amazon and Myntra lead" },
      { src: "assets/screenshots/vrinda_age_vs_sales.png", caption: "Sales by age group and gender" },
      { src: "assets/screenshots/vrinda_order_vs_sales.png", caption: "Monthly order volume, Dec–Jan" }
    ],
    files: [
      { name: "Vrinda_Store_Data.xlsx", path: "assets/files/Vrinda_Store_Data.xlsx", ext: "XLSX" }
    ]
  },

  {
    id: "ultra-marathon",
    category: "data-analysis",
    title: "Two Centuries of Ultra-Marathons — Race Analysis",
    tagline: "Who's actually fastest at 50 miles?",
    problem: "A two-centuries-of-ultra-marathons dataset needed to be cut down to something answerable: how do age, gender, and season actually affect performance in U.S. 50km/50mi races?",
    method: "Filtered the global dataset to U.S. 50km and 50mi races run in 2018, cleaned and renamed columns, converted types, and removed duplicates/nulls. Explored the result with seaborn — distributions, a gender-split histogram, and an age-vs-speed regression — then grouped by age, gender, and season to answer specific questions.",
    impact: "50km races drew roughly 3× more finishers than 50mi. Men held a higher average speed across most age groups, but the gap narrowed in the 50mi events. Runners were measurably slower in summer than winter — a counterintuitive result worth digging into further.",
    impactPending: false,
    metrics: [
      { label: "Race distances", value: "50km / 50mi" },
      { label: "Year analyzed", value: "2018" },
      { label: "Scope", value: "U.S. races" }
    ],
    skills: ["Python", "Pandas", "Seaborn", "EDA", "Data Cleaning"],
    screenshots: [
      { src: "assets/screenshots/ultra_marathon_race_length_distribution.png", caption: "Finisher counts: 50km vs 50mi" },
      { src: "assets/screenshots/ultra_marathon_race_length_by_gender.png", caption: "Race length distribution by gender" },
      { src: "assets/screenshots/ultra_marathon_speed_distribution_50mi.png", caption: "Average speed distribution, 50mi" },
      { src: "assets/screenshots/ultra_marathon_age_vs_speed_by_gender.png", caption: "Age vs. average speed, by gender" }
    ],
    files: [
      { name: "Ultra_Marathon_Analysis.ipynb", path: "assets/files/Ultra_Marathon_Race_Analysis.ipynb", ext: "IPYNB" }
    ]
  },

  {
    id: "wikipedia-scraping",
    category: "data-analysis",
    title: "World's Largest Companies — Web Scraping",
    tagline: "Pulling Fortune Global 500-caliber data straight from the source",
    problem: "Wanted a self-updating view of the world's largest companies by revenue, instead of relying on a static, possibly outdated copy of a list.",
    method: "Used BeautifulSoup and requests to pull the live table directly from Wikipedia, parsed headers and rows into a pandas DataFrame, cleaned revenue/profit/employee figures into proper numeric types, and visualized the top companies and their headquarters countries.",
    impact: "Walmart leads the world at $680.99B in revenue, followed by Amazon ($637.96B) and State Grid Corporation of China ($545.95B). Of the 30 largest companies, the U.S. and China together account for the clear majority.",
    impactPending: false,
    metrics: [
      { label: "Top company", value: "Walmart" },
      { label: "Top revenue", value: "$680.99B" },
      { label: "Companies analyzed", value: "30" }
    ],
    skills: ["Python", "BeautifulSoup", "Web Scraping", "Pandas", "Matplotlib"],
    screenshots: [
      { src: "assets/screenshots/wikipedia_top15_companies_revenue.png", caption: "World's 15 largest companies by revenue" },
      { src: "assets/screenshots/wikipedia_companies_by_country.png", caption: "Largest companies by headquarters country" }
    ],
    files: [
      { name: "Webscraping_Completed.ipynb", path: "assets/files/Wikipedia_Largest_Companies_Scraping.ipynb", ext: "IPYNB" }
    ]
  },

  {
    id: "nigerian-fuel-price",
    category: "data-analysis",
    title: "Nigerian Fuel Price Analysis",
    tagline: "From NBS data buried in PDFs to a live state-by-state price map",
    problem: "Fuel prices across Nigeria's 36 states swing wildly — sometimes by over 600% — but the National Bureau of Statistics (NBS) buries the data in dense PDF reports with no visual summary. The public and policymakers had no quick way to see which states were being hit hardest or how the national trend was moving.",
    method: "Scraped monthly PMS fuel price data directly from the NBS website, cleaned and structured it in Excel, then built a Power BI dashboard covering: state-level price volatility rankings, a national monthly average trend chart, top 5 highest and lowest priced states, and a filled choropleth map of Nigeria showing price distribution by state.",
    impact: "Sokoto recorded the highest volatility at +643%, followed by Lagos (+400%). The national average sits at ₦1,246. Ekiti is the most affordable state at ₦957 per litre; Jigawa the most expensive at ₦1,730 — a ₦773 gap within the same country. This dashboard was built as a civic tool to make public economic data genuinely accessible.",
    impactPending: false,
    metrics: [
      { label: "National avg", value: "₦1,246" },
      { label: "Highest volatility", value: "Sokoto +643%" },
      { label: "Lowest price", value: "Ekiti ₦957" },
      { label: "Highest price", value: "Jigawa ₦1,730" }
    ],
    skills: ["Power BI", "Excel", "Web Scraping", "DAX", "Data Cleaning", "Civic Data"],
    screenshots: [
      { src: "assets/screenshots/fuel_price_dashboard.png", caption: "Nigerian Fuel Price Analysis — state volatility, monthly trend, choropleth map" }
    ],
    files: [
      { name: "Fuel_Price_Project.xlsx", path: "assets/files/Nigerian_Fuel_Price_Analysis.xlsx", ext: "XLSX" }
    ]
  },

  {
    id: "car-company-visuals",
    category: "data-analysis",
    title: "Global Car Brand Market Analysis",
    tagline: "1.3 million cars, 7 brands, one dashboard",
    problem: "With 7 major automotive brands, 146 model variants, and over 1.3 million units of sales data, the challenge was building a single view that lets a decision-maker instantly compare brand-level market value, model-level revenue, and volume share — without getting lost in a spreadsheet.",
    method: "Built a Power BI report using brand logos as interactive visual selectors, with four analytical layers: total sales KPIs (1,347K units, 146 variants), a market share pie by brand, brand market value ranked bar chart, top 5 models by revenue, and a volume breakdown by make.",
    impact: "Volkswagen leads on brand market value at £255M, closely followed by BMW (£245M) and Audi (£244M). The Golf is the top single model by revenue. VW also leads in units sold at 0.21M. The equal market-share pie (14.29% each) reveals the dataset is balanced by design — making it ideal for head-to-head brand comparisons.",
    impactPending: false,
    metrics: [
      { label: "Total sales", value: "1,347K" },
      { label: "Top brand", value: "Volkswagen" },
      { label: "Brand value leader", value: "£255M" },
      { label: "Top model", value: "Golf" }
    ],
    skills: ["Power BI", "DAX", "Data Modeling", "Data Visualization"],
    screenshots: [
      { src: "assets/screenshots/car_company_dashboard.png", caption: "Car brand dashboard — market share, brand value, top models by revenue" }
    ],
    files: [
      { name: "Car_Company_Visuals.pbix", path: "assets/files/Car_Company_Visuals.pbix", ext: "PBIX" }
    ]
  }

];

/* Real findings used by the homepage ticker — keep short, factual, sourced from PROJECTS above. */
const TICKER_FACTS = [
  "874 loans scored — 100% of defaults caught",
  "$41,288.69 — predicted 2020 Canada per-capita income",
  "ADF p ≈ 0.00005 — births series confirmed stationary",
  "Walmart: $680.99B — world's largest company by revenue",
  "50km races draw ~3× more finishers than 50mi",
  "Amazon & Myntra lead Vrinda Store's sales channels",
  "Unemployed borrowers: 90% default rate — highest-risk segment",
  "Higher income, higher bike-purchase rate — clearest signal in the sales dashboard",
  "Sokoto fuel price volatility: +643% — highest in Nigeria",
  "Ekiti ₦957 vs Jigawa ₦1,730 — same country, ₦773 gap in fuel price",
  "Volkswagen leads: £255M brand value across 0.21M units sold",
  "VW Golf: top car model by revenue across 7 global brands"
];
