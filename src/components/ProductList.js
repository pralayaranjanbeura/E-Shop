import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, MenuItem, Select, Grid2,Pagination } from "@mui/material";
import { useCart } from "./CartContext";
import "../styles/App.css";



const products = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQGaofdUGX6Wcsrrtz6n03c9yNDqZud_j8hxsWkNl_4fLRv_sQIZ03Ose8JusDir5imrXQW52T8SvQi4DuXGA-gfxUPc1XEVnM-1IGVDLXXhLIAZoogpLsICQ" },
  { id: 2, name: "Phone", price: 509, category: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeLVWOzWla8Zy87cK4a2GlNrHkJ3S6s2w4w&s" },
  { id: 3, name: "MacBook", price: 550, category: "Electronics", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQGaofdUGX6Wcsrrtz6n03c9yNDqZud_j8hxsWkNl_4fLRv_sQIZ03Ose8JusDir5imrXQW52T8SvQi4DuXGA-gfxUPc1XEVnM-1IGVDLXXhLIAZoogpLsICQ" },
  { id: 4, name: "Phone", price: 5000, category: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAnV8y0YoX0_ps0diGjoV7Hn206gKgbXQ_-Q&s" },
  { id: 5, name: "HeadPhones", price: 500, category: "Accessories", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTT04qx_ncQuovtoIRMEoTZBF-WQ8rjH9JS4ZM6c907pdmq14sDlF2cHQAqT5CRnyBgxk6dt6GUUFXnMQIqClJhD9bZXc4HqaETQBfpsb99c6HbiKu9uKYmxA" },
  { id: 6, name: "Vehicles", price: 600, category: "Vehicles", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSLTzNx0Gjf4xI4g6smTjQKoq__ah13M_pcjusYGlT4QE6Ey_8SPAdJXxreRv3OqjMOzL3LqqF1tRJlGtzvfFMDZO_kwTnbajh7cCr1HCGHVFOnoF0baPiy" },
  { id: 7, name: "Programming", price: 190, category: "Books", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRced_AvUiSzcPpkDGuDs1Nna0tfwufW8IZc1jMc-457uGZyi98dmNmFzveydMVZ5jWbteQBQbtNCZj8P9OfDuJF-NcgRNmt3JDIekrikM" },
  { id: 8, name: "Headphones", price: 180, category: "Accessories", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQkbSCaHxdRuAJVk0cYOdE2h8pJkyBp48KiQpzWXbXOeOtrKNVD2EsdJzysUhTxrRclkUEwhEdx6YYrg5c_53pWbDTVsKiASxUDAkaeioppPHwCxGjArk-Q" },
  { id: 9, name: "Laptop", price: 1700, category: "Electronics", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTD5xT3nzHGGFchPLD-0k1bW1CNwrW0zI2tzFcDKdjcNfZWqs-iOFnogJevN_Y4X50Q9JjDUeUv-8gUAiBqiyyBoMH9ldlKe5Ib627hC26l7eF55sCN0PWKCw" },
  { id: 10, name: "Python", price: 100, category: "Books", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTcXAiNeT49iYTAwlLv2c3RtHjceCDaNBy9kHp-Qj-98NYPUDtlVw_AVA6jaU9ld2cqhxX3qyFBcTSnkaoWwDq43WUv3pCdOcnehciYecBS0jFgXERN2Se6pA" },
  { id: 11, name: "Cars", price: 10000, category: "Vehicles", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRPhtDKkZuYRH-3thsL_KjqzU5sxYIDcrrDag1ngAQK-yZXzJ-11rZvh9TUSxUFgtlVzdb1akL_TvaGjYod7e6n33xIJD6eBalIZfCBCIg5ccfyBHTp8kjyyg" },
  { id: 12, name: "Headphones", price: 180, category: "Accessories", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRjh1cR2Vis4n8tULC-HG5j0TgW8GowtXzBCcf3Bh-77JkGPV-DruJrV5ZtODJoutZipWo-Rzd8Tu8XjA7wyEjia4eIfMpFvZdkDds8Ow0" },
  { id: 13, name: "Toys", price: 110, category: "Toys & Games", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSq-FUWG21o0-WnZHsQrmp06cHolBZmW0X8KYHwhI7ETir7XGpEAHbzQC1dxktYBuCoB1-ALIzcjuD5WZcVhpqA535hshTC5J4w_ESG6-lWiNFu-CCYziosBA" },
  { id: 14, name: "Laptops HP", price: 1500, category: "Electronics", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ3iynFebWEHnZ3-wDhIBfSyNwQp8Cy_PsC9gnLoQw4RRzTrxdaVbUwe2z4bcqoa5ULKTSW-aIFow2bjK3CTCAiJ5-qOzxCBFatUP9wdUwmWcyKp9Ie2hpinA" },
  { id: 15, name:"C++", price: 60, category: "Books", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6WWOhytN68lQ2Aqf23mAMIQC2PQsFJrosoqfn7EcHgFi-iH6vt58qr36rSCq84NDZfyS7g-C9GQR9zSQXWMKpgl6QubE8JNCgy23eALGtuD67W1Eq7-MA4g" },
  { id: 16, name: "BMW", price: 15000, category: "Vehicles", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRPhtDKkZuYRH-3thsL_KjqzU5sxYIDcrrDag1ngAQK-yZXzJ-11rZvh9TUSxUFgtlVzdb1akL_TvaGjYod7e6n33xIJD6eBalIZfCBCIg5ccfyBHTp8kjyyg" },
  { id: 17, name: "Lenovo", price: 1800, category: "Electronics", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcThGYHtxaYxZp9c3_QxX45A-Izqzhk7cSXGTlvOn5htxeHPULjo8tGvOl1JKfbkZ2PgU_wADSqOFomTrt9ddtoHnY7EnKzuZRONdyUDCZ7WdL2QCU7pttqgtA" },
  { id: 18, name: "OOPS", price: 100, category: "Books", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQyparE4lWeriNHh2ML5CZCp7LZeuJhSqFumsZDgb4jiUw6EbcbKXCQ0kIwMCvhuZB50nQPlfZVwWxouJE14VSR5e0T2ZBg_9ROJ3T8QBVi" },
  { id: 19, name: "Ninja", price: 15080, category: "Vehicles", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRs59_9X7lFHoQsRIF0Sy_23jNSsnskQHy6F1OGsVe9p2A3RBBiQxdpzh8GIqiLLaZxpVa3MKze3SMclnn-pucfTW7YNIH-q60xlubHNCU" },
  { id: 20, name: "Cricket", price: 1569, category: "Toys & Games", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQwgntzQIg3iSEs8o662LOK6BWDA_OCpbofYvzHeinYHBTMZzKNEQTUMISjitbOBDx6KEQkvI2kYhYt08_rrk21MBvXEZGrSlefb2hEjZMi-5mb-rFIRGMy" },
  { id: 21, name: "Headphones", price: 155, category: "Accessories", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRVrXSA3oLIbEYmglG87fYQ-KdfT0Zo99CfNHX6fHOLGEPq-yaG1ZwPqsjgjgIfn9mgcQvcuI4lWSJ9oCBwlpin_puo0dT-1L0fPZ-j6gkhq-C7ifwtNAOo" },
  { id: 22, name: "Headphones", price: 140, category: "Accessories", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcryHRe4KWUgwLNh3nQceezS_romYVvj_ywiQTxlOfqBIIGysqNAQHEt1P2Zn0f-9MzMqr2IpTXZe9Sg-d0az1hTHtCC9HGnfYS3C9KWOIDKugbVrFH5OmSA" },
  { id: 23, name: "Games", price: 1500, category: "Toys & Games", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXfxrY8jZPdoHiqC_F21jA2ZRhrqKXqQr3dmfWfm6mMLV81X38pkxSlMvV6QBxI7_75U3FS1mj7Ot2nbHNbT4ooluT-6noUJEwV1SHczL5" },
  { id: 24, name: "Laptop", price: 1020, category: "Electronics", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWyHTu7BiiUFJIfJDekgm62N8qojgyq6zHMJkz41c6tgQ9FohO5djrT4Awo9A48RP8qt6TG4bztmAiq_pnoTyg-p-fSZda-6Hhea7JWm0" },
  { id: 25, name: "Programming", price: 1100, category: "Books", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDvSvtUpSaBjaH_bpWBquzP0t6op0ScmvQxYTBSD0c8dhBlDQr30EtJg0HWYDjoiojrz2FpAR2c1YZIYXUNsFrkFBuA6-pcCeK6-kL04UMec-DbOnNCQqP" },
];

const ProductList = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setFilteredProducts(
      category === "All" ? products : products.filter(product => product.category === category)
    );
  }, [category]);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const displayedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <>
      <Select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Accessories">Accessories</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="Vehicles">Vehicles</MenuItem>
        <MenuItem value="Toys & Games">Toys & Games</MenuItem>
      </Select>
      <Grid2 container spacing={3} className="product-grid">
        {displayedProducts.map((product) => (
          <Grid2 item xs={12} sm={4} key={product.id}>
            <Card className="product-card"  
              raised
              sx={{
                width: { xs: "95%", sm: "90%", md: "280px" },
                margin: "2 auto",
                padding: "2em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: "10px",}}
            >
              <CardMedia component="img"  image={product.image} alt={product.name} className="product-image"   
              sx={{
                objectFit: "cover", 
                width: "100%", 
                height: "230px",
            }} 
            />                           
              <CardContent>
                <Typography variant="h6" className="product-name">{product.name}</Typography>
                <Typography variant="body1" className="product-price">${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)} className="add-to-cart">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </>
  );
};

export default ProductList;
