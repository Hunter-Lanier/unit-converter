<template>
  <div
    class="card h-full w-full bg-slate-100 flex justify-center items-center flex-col text-sm gap-10 p-8 shadow-lg rounded-lg">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Unit Converter</h1>
    <div class="flex flex-wrap w-full text-lg justify-center gap-2 md:gap-4 mb-6">
      <button @click="handleClick('length')" :class="getButtonClass('length')">Length</button>
      <button @click="handleClick('temperature')" :class="getButtonClass('temperature')">Temperature</button>
      <button @click="handleClick('area')" :class="getButtonClass('area')">Area</button>
      <button @click="handleClick('volume')" :class="getButtonClass('volume')">Volume</button>
      <button @click="handleClick('weight')" :class="getButtonClass('weight')">Weight</button>
    </div>

    <div class="flex flex-col md:flex-row w-full justify-around items-center gap-6">
      <div class="flex flex-col gap-4 w-full md:w-auto">
        <input list="units-datalist" v-model="inputType" placeholder="From..."
          :class="errorMessages ? 'border-2 border-red-500' : 'border-2 border-blue-500'"
          class="p-2 rounded-md shadow-md">
        <input v-model="inputValue" type="number" placeholder="0"
          class="rounded-md p-2 border-2 border-blue-500 shadow-md">
      </div>
      <div
        class="flex flex-col w-auto h-max p-2 justify-center items-center rounded-full bg-blue-600 text-white shadow-md transition-all duration-300 active:bg-blue-700 cursor-pointer"
        @click="handleReverse()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </div>
      <div class="flex flex-col gap-4 w-full md:w-auto">
        <input list="units-datalist" v-model="resultType" placeholder="To..."
          :class="errorMessages ? 'border-2 border-red-500' : 'border-2 border-blue-500'"
          class="p-2 rounded-md shadow-md">
        <input v-model="convertedValue" type="number" placeholder="0"
          class="rounded-md p-2 border-2 border-blue-500 shadow-md">
      </div>
      <datalist id="units-datalist">
        <option v-for="unitName in unitNames" :key="unitName" :value="unitName">{{ unitName }}</option>
      </datalist>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 700px;
  margin: auto;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #357ab8;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}

input {
  width: 100%;
  transition: border-color 0.3s ease;
}

@media (min-width: 768px) {
  input {
    width: 200px;
  }
}
</style>



<script>
import Conversion from '@/assets/Conversion'
import { errorMessages } from 'vue/compiler-sfc';

export default {
  name: 'CardFormComponent',
  data() {
    return {
      typeIdentifier: ['length', 'temperature', 'area', 'volume', 'weight'],
      inputValue: null,
      selectedType: null,
      unitNames: [],
      inputType: '',
      resultType: '',
      conversion: new Conversion(),
      errorMessages: null,
    }
  },
  methods: {
    handleClick(type) {
      this.inputType = null;
      this.resultType = null;
      this.inputValue = null;
      this.resultValue = null;
      this.selectedType = type;
      this.unitNames = Object.keys(this.conversion.units[type] || {});
    },
    handleReverse() {
      if (!this.inputType || !this.resultType) {
        return;
      }
      [this.inputType, this.resultType] = [this.resultType, this.inputType];
    },
    validateTypes() {
      if (!this.isValidTypes) {
        this.errorMessages = 'Invalid type';
      } else {
        this.errorMessages = null;
      }
    },
  },
  computed: {
    convertedValue() {
      if (!this.inputValue || !this.inputType || !this.resultType || isNaN(this.inputValue)) {
        console.log('Please fill in all fields');
        return null;
      }
      const resultValue = this.conversion.convert(this.inputValue, this.inputType, this.resultType, this.selectedType);
      console.log(resultValue);
      return resultValue;
    },
    isValidTypes() {
      // Check if both inputType and resultType are either valid or empty
      const isValidInputType = !this.inputType || this.unitNames.includes(this.inputType);
      const isValidResultType = !this.resultType || this.unitNames.includes(this.resultType);
      return isValidInputType && isValidResultType;
    },
    getButtonClass() {
      return (type) => {
        return [
          'border-2',
          'border-blue-500',
          'bg-blue-50',
          'p-1',
          this.selectedType === type ? ['bg-blue-500', 'text-blue-50'] : ''
        ];
      };
    },

  },
  watch: {
    inputType: {
      handler() {
        this.validateTypes();
      },
      immediate: true, // To run the validation immediately after component initialization
    },
    resultType: {
      handler() {
        this.validateTypes();
      },
      immediate: true,
    },
  }
}
</script>
