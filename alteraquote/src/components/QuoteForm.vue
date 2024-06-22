<template>
    <div class="quote-form-container">
      <form @submit.prevent="handleSubmit" class="quote-form">
        <div class="form-group">
          <label>Number of Layers</label>
          <input type="number" v-model="formData.layers" required />
        </div>
        <div class="form-group">
          <label>Thickness (mm)</label>
          <input type="number" v-model="formData.thickness" required />
        </div>
        <div class="form-group">
          <label>Solder Mask Color</label>
          <input type="text" v-model="formData.solderMaskColor" required />
        </div>
        <div class="form-group">
          <label>Surface Finish</label>
          <input type="text" v-model="formData.surfaceFinish" required />
        </div>
        <div class="form-group">
          <label>Board Dimensions (mm)</label>
          <input type="text" v-model="formData.boardDimensions" required />
        </div>
        <div class="form-group">
          <label>Quantity</label>
          <input type="number" v-model="formData.quantity" required />
        </div>
        <div class="form-group">
          <label>Delivery Time (days)</label>
          <input type="number" v-model="formData.deliveryTime" required />
        </div>
        <div class="form-group">
          <label>Upload Gerber File</label>
          <input type="file" @change="handleFileChange" />
        </div>
        <button type="submit" class="submit-button">Get Quote</button>
      </form>
      <div v-if="quote !== null" class="quote-result">
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
  
  <style scoped>
  .quote-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .quote-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-button {
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .quote-result {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #e9ecef;
    border-radius: 4px;
    text-align: center;
  }
  </style>
  