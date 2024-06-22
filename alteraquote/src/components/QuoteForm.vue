<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Number of Layers</label>
          <input type="number" v-model="formData.layers" required />
        </div>
        <div>
          <label>Thickness (mm)</label>
          <input type="number" v-model="formData.thickness" required />
        </div>
        <div>
          <label>Solder Mask Color</label>
          <input type="text" v-model="formData.solderMaskColor" required />
        </div>
        <div>
          <label>Surface Finish</label>
          <input type="text" v-model="formData.surfaceFinish" required />
        </div>
        <div>
          <label>Board Dimensions (mm)</label>
          <input type="text" v-model="formData.boardDimensions" required />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" v-model="formData.quantity" required />
        </div>
        <div>
          <label>Delivery Time (days)</label>
          <input type="number" v-model="formData.deliveryTime" required />
        </div>
        <div>
          <label>Upload Gerber File</label>
          <input type="file" @change="handleFileChange" required />
        </div>
        <button type="submit">Get Quote</button>
      </form>
      <div v-if="quote !== null">
        <h3>Quote: {{ quote }}</h3>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          layers: '',
          thickness: '',
          solderMaskColor: '',
          surfaceFinish: '',
          boardDimensions: '',
          quantity: '',
          deliveryTime: '',
          gerberFile: null,
        },
        quote: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.formData.gerberFile = event.target.files[0];
      },
      async handleSubmit() {
        const data = new FormData();
        Object.keys(this.formData).forEach((key) => {
          data.append(key, this.formData[key]);
        });
  
        try {
          const response = await fetch('http://localhost:3000/api/get-quote', {
            method: 'POST',
            body: data,
          });
          const result = await response.json();
          this.quote = result.price;
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  