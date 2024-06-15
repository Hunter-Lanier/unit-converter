<template>
  <!-- Container -->
  <div class="Card h-full w-full bg-blue-100 flex justify-center items-center flex-col text-sm gap-10">
    <!-- Type Selection -->
    <div class=" flex w-screen text-lg justify-center">
      <button @click="handleClick('length')"
        :class="[[this.selectedType == 'length' ? ['bg-blue-500', 'text-blue-50'] : ''], ' border-2 border-blue-500 bg-blue-50 p-1 rounded-l-md']">Length</button>
      <button @click="handleClick('temperature')"
        :class="[[this.selectedType == 'temperature' ? ['bg-blue-500', 'text-blue-50'] : ''], ' border-2 border-blue-500 bg-blue-50 p-1 ']">Temperature</button>
      <button @click="handleClick('area')"
        :class="[[this.selectedType == 'area' ? ['bg-blue-500', 'text-blue-50'] : ''], ' border-2 border-blue-500 bg-blue-50 p-1']">Area</button>
      <button @click="handleClick('volume')"
        :class="[[this.selectedType == 'volume' ? ['bg-blue-500', 'text-blue-50'] : ''], ' border-2 border-blue-500 bg-blue-50 p-1']">Volume</button>
      <button @click="handleClick('weight')"
        :class="[[this.selectedType == 'weight' ? ['bg-blue-500', 'text-blue-50'] : ''], ' border-2 border-blue-500 bg-blue-50 p-1 rounded-r-md']">Weight</button>
    </div>

    <div class="flex flex-row h-1/4 w-full justify-around items-center">
      <!-- Input Form -->
      <div class=" flex flex-col gap-4 justify-around ">
        <input list="units-datalist" v-model="inputType" placeholder="From..." class="rounded-md">
        <input v-model="inputValue" type="number" placeholder="0" class="rounded-md">
      </div>
      <div
        :class="['flex flex-col w-auto h-max p-1 justify-center items-center rounded-md transition-all duration-300 active:bg-blue-500 active:text-blue-50 cursor-pointer']"
        @click="handleReverse()">
        <!-- reverse icon-->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
          </path>
        </svg>
        <!-- Mirror of prior Svg -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
          </path>
        </svg>


      </div>
      <div class=" flex flex-col gap-4 justify-around ">
        <input list="units-datalist" v-model="resultType" placeholder="To..." class="rounded-md">
        <input v-model="this.convertedValue" type="number" placeholder="0" class="rounded-md">
      </div>
      <!-- Datalist for units -->
      <datalist id="units-datalist">
        <!-- Iterate over unitNames to display unit names -->
        <option v-for="unitName in unitNames" :key="unitName" :value="unitName">{{ unitName }}</option>
      </datalist>

    </div>


  </div>
</template>
<script>
import Conversion from '@/assets/Conversion'
export default {
  name: 'CardFormComponent',
  data() {
    return {
      typeIdentifier: [
        'length',
        'temperature',
        'area',
        'volume',
        'weight'
      ],
      inputValue: null,
      selectedType: null,
      unitNames: [],
      inputType: null,
      resultType: null,
      conversion: new Conversion(),
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
      const temp = this.inputType;
      this.inputType = this.resultType;
      this.resultType = temp;
      return;

    }
  },
  computed: {
    convertedValue() {
      if (!this.inputValue || !this.inputType || !this.resultType && this.inputValue !== NaN) {
        console.log('Please fill in all fields');
        return;
      }
      this.resultValue = this.conversion.convert(this.inputValue, this.inputType, this.resultType, this.selectedType)
      console.log(this.resultValue)
      return this.resultValue
    }
  }
}
</script>