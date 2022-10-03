import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, changeQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { addProduct, updateProduct } from '../store/productsSlice';
import Box from '@mui/material/Box';

function ProductList() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async function () {
      const response = await fetch('https://fakestoreapi.com/products');
      const productsData = await response.json();
      // dispatch(resetProduct());
      dispatch(
        addProduct(
          productsData
            .map((product) => ({ ...product, quantityInStock: 15 }))
            .slice(0, 14)
        )
      );
      console.log('useeffect called');
    };

    fetchProducts();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(resetProduct());
  // }, [dispatch]);

  const handleAddItemToCart = function (product) {
    if (cart.some((item) => item.id === product.id)) {
      const payload = { id: product.id, change: 1 };

      product.quantityInStock > 0 ? dispatch(changeQuantity(payload)) : pass();
    } else {
      const payload = { ...product, quantity: 1 };
      dispatch(addItem(payload));
    }

    dispatch(updateProduct({ id: product.id, change: -1 }));
  };

  const pass = function () {};

  const handleInputChange = function (e) {
    setQuery(e.target.value);
  };

  const handleCategoryChange = function (event) {
    setCategory(event.target.value);
  };

  return (
    <div className="products">
      <h1 style={{ textAlign: 'center' }}> Products </h1>
      <div className="search">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-category"> Category </InputLabel>
            <Select
              autoWidth
              labelId="select-category"
              id="select-category"
              label="Category"
              value={category}
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>None</em>{' '}
              </MenuItem>
              {[...new Set(products.map((product) => product.category))].map(
                (category) => (
                  <MenuItem value={category}> {category} </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>

        <TextField
          variant="outlined"
          label="Search Product"
          onChange={handleInputChange}
        />
      </div>
      <Box
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderLeft: 1,
          borderRight: 1,
          borderColor: '#e5e5e5',
        }}
      >
        <List>
          {products
            .filter(
              (product) =>
                product.title?.toLowerCase().startsWith(query.toLowerCase()) &&
                product.category
                  ?.toLowerCase()
                  .startsWith(category.toLowerCase())
            )

            .map((product) => (
              <ListItem key={product.id} alignItems="flex-start" divider>
                <ListItemAvatar>
                  <a href={product.image}>
                    <Avatar alt={product.title} src={product.image} />
                  </a>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span className="title block bold ">
                      {' '}
                      <Link to={`product/${product.id}`}>
                        {' '}
                        {product.title}{' '}
                      </Link>{' '}
                    </span>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {product.category}
                      </Typography>
                      <div className="product-price bold">
                        {' '}
                        ৳ {product.price}
                      </div>
                    </React.Fragment>
                  }
                />
                <span className="product-quantity bold">
                  {' '}
                  {product.quantityInStock}{' '}
                </span>
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleAddItemToCart(product);
                  }}
                  disabled={!product.quantityInStock}
                >
                  {' '}
                  <AddIcon />{' '}
                </IconButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );
}

export default ProductList;
