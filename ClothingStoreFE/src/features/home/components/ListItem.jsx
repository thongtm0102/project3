import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {colors, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import cartSilce from "src/features/Cart/cartSilce";

const Item = (props) => {
  const data = props.item;
  const dataCart = useSelector(state => state.cart.dataCart)
  const datafull = {
    ...data ,
    quantity : 1 ,
  }
  const dispatch = useDispatch()
  const handleAddCart = () => {
    console.log(datafull);
    if(dataCart.some(obj => obj.id === datafull.id)){
      dispatch(cartSilce.actions.upQuantity(datafull.id))
    }else{
    dispatch(cartSilce.actions.addCard(datafull))
    }
  }

  return (
    <Card sx={{width: 330, backgroundColor: colors.grey[200], m: 1}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={data.imgUrl}
      />
      <CardContent>
        <Stack direction={'row'} justifyContent={"space-between"}>
          <Typography gutterBottom variant="h6" component="div">
            {data.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {data.price} VND
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions onClick={handleAddCart}>
        <Button size="small">Thêm Vào Giỏ hàng</Button>
      </CardActions>
    </Card>
  );
}

export default function ListItem() {

  const data = useSelector(state => state.product.dataProduct)
  return (
    <>
      {
        data.map(item => (
          <Item item={item} key={item.id}/>
        ))
      }
    </>
  )
}
