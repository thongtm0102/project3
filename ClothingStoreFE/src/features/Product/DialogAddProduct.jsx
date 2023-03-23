import React, {useEffect, useRef} from 'react'
import {
  Button,
  Dialog, Divider, Stack, Typography, TextField, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {fetchAdd} from "src/features/Product/productSlice";


const validationSchema = yup.object({

});


const DialogAddProduct = NiceModal.create(({onAlert}) => {
  const modal = useModal();
  const resetFormRef = useRef();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
      dirs: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      // resetFormRef.current = resetForm
      const dataFetch = {
        title : values.name ,
        description : values.dirs,
        imgUrl : values.image,
        price : values.price,
      }
      // console.log(dataFetch)
      dispatch(fetchAdd(dataFetch)) ;
      modal.hide();
    },

  });

  // useEffect(() => {
  //   if (data.status === "ok") {
  //     modal.hide();
  //     onAlert();
  //     if (resetFormRef.current) {
  //       resetFormRef.current();
  //     }
  //   }
  // }, [data])
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Stack width={600}>
        <Typography fontSize={28} fontWeight={600} py={1.5} align="center">
          Thêm sản phẩm
        </Typography>
        <Divider/>
        <form onSubmit={formik.handleSubmit}>
          <Stack px={2} pt={1}>
            <TextField
              margin="normal"
              fullWidth
              label="Tên sản phẩm"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Giá sản phẩm"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Ảnh mẫu"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Mô tả"
              name="dirs"
              value={formik.values.dirs}
              onChange={formik.handleChange}
              error={formik.touched.dirs && Boolean(formik.errors.dirs)}
              helperText={formik.touched.dirs && formik.errors.dirs}
            />
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained">
                Thêm sản phẩm
              </Button>
              <Button
                onClick={() => modal.hide()}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>

      </Stack>


    </Dialog>

  )
})

export default DialogAddProduct
