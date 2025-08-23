# Numbers to Words & Words to Numbers Converter

🔄 A lightweight, multilingual JavaScript converter that transforms numbers into their word representations and vice versa in English (EN), Persian (FA), and Arabic (AR). Perfect for financial documents, educational tools, accessibility features, and form validations.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Languages: 3](https://img.shields.io/badge/Languages-3-green.svg)
![Supports RTL](https://img.shields.io/badge/Supports-RTL-blue.svg)

## Supported Languages
- 🇬🇧 English (e.g., "one hundred twenty-three" ↔️ 123)
- 🇮🇷 Persian (e.g., "یکصد و بیست و سه" ↔️ 123)
- 🇸🇦 Arabic (e.g., "مائة و ثلاثة و عشرون" ↔️ 123)

## Key Features

- Convert numbers (e.g., 123) to their word representation (e.g., "one hundred twenty-three")
- Convert words (e.g., "one hundred twenty-three") back to numbers (e.g., 123)
- Easy to use and integrate into any JavaScript project

## Usage

### Node.js

1. Clone the repository:
   ```sh
   git clone https://github.com/shomalikhashayar/Numbers-to-Words---Words-to-Numbers-Converter.git
   ```
2. Import or require the script in your project:

   ```js
   // Example usage
   const converter = require("./numbers-to-words-words-to-numbers");

   // English
   console.log(converter.numberToWords(123, 'en')); // "one hundred twenty-three"
   console.log(converter.wordsToNumber("one hundred twenty-three", 'en')); // 123

   // Persian
   console.log(converter.numberToWords(123, 'fa')); // "یکصد و بیست و سه"
   console.log(converter.wordsToNumber("یکصد و بیست و سه", 'fa')); // 123

   // Arabic
   console.log(converter.numberToWords(123, 'ar')); // "مائة و ثلاثة و عشرون"
   console.log(converter.wordsToNumber("مائة و ثلاثة و عشرون", 'ar')); // 123
   ```

### React.js

1. Install the package:

   ```sh
   git clone https://github.com/shomalikhashayar/Numbers-to-Words---Words-to-Numbers-Converter.git
   ```

2. Create a new React component:

   ```jsx
   import { useState, useMemo } from 'react';
   import converter from './path-to/numbers-to-words-words-to-numbers';

   const NumberConverter = () => {
     // State for inputs
     const [inputNumber, setInputNumber] = useState(123);
     const [inputWords, setInputWords] = useState('one hundred twenty-three');

     // Memoized conversions
     const numberToWords = useMemo(() => 
       converter.numberToWords(inputNumber), [inputNumber]
     );
     
     const wordsToNumber = useMemo(() => 
       converter.wordsToNumber(inputWords), [inputWords]
     );

     // Event handlers
     const handleNumberInput = (event) => {
       setInputNumber(Number(event.target.value));
     };

     const handleWordsInput = (event) => {
       setInputWords(event.target.value);
     };

     return (
       <div>
         {/* Number to Words conversion */}
         <div className="converter-section">
           <input
             type="number"
             value={inputNumber}
             onChange={handleNumberInput}
             placeholder="Enter a number"
           />
           <p>In Words: {numberToWords}</p>
         </div>

         {/* Words to Number conversion */}
         <div className="converter-section">
           <input
             type="text"
             value={inputWords}
             onChange={handleWordsInput}
             placeholder="Enter words (e.g., one hundred twenty-three)"
           />
           <p>In Numbers: {wordsToNumber}</p>
         </div>

         <style jsx>{`
           .converter-section {
             margin: 1rem 0;
           }
           
           input {
             padding: 0.5rem;
             margin-bottom: 0.5rem;
             width: 100%;
             max-width: 300px;
           }
         `}</style>
       </div>
     );
   };

   export default NumberConverter;
   ```

You can use this component in your app like this:

```jsx
// App.jsx
import NumberConverter from './components/NumberConverter';

function App() {
  return (
    <div>
      <h1>Number Converter</h1>
      <NumberConverter />
    </div>
  );
}

export default App;
```

### Vue.js 3

1. Install the package:

   ```sh
   git clone https://github.com/shomalikhashayar/Numbers-to-Words---Words-to-Numbers-Converter.git
   ```

2. Create a new Vue component using `<script setup>`:

   ```vue
   <script setup>
   import { ref, computed } from "vue";
   import { converter } from "./path-to/numbers-to-words-words-to-numbers";

   // Reactive values
   const inputNumber = ref(123);
   const inputWords = ref("one hundred twenty-three");

   // Computed properties
   const numberToWords = computed(() =>
     converter.numberToWords(inputNumber.value)
   );
   const wordsToNumber = computed(() =>
     converter.wordsToNumber(inputWords.value)
   );

   // Methods
   const handleNumberInput = (event) => {
     inputNumber.value = Number(event.target.value);
   };

   const handleWordsInput = (event) => {
     inputWords.value = event.target.value;
   };
   </script>

   <template>
     <div>
       <!-- Number to Words conversion -->
       <div class="converter-section">
         <input
           type="number"
           :value="inputNumber"
           @input="handleNumberInput"
           placeholder="Enter a number"
         />
         <p>In Words: {{ numberToWords }}</p>
       </div>

       <!-- Words to Number conversion -->
       <div class="converter-section">
         <input
           type="text"
           :value="inputWords"
           @input="handleWordsInput"
           placeholder="Enter words (e.g., one hundred twenty-three)"
         />
         <p>In Numbers: {{ wordsToNumber }}</p>
       </div>
     </div>
   </template>

   <style scoped>
   .converter-section {
     margin: 1rem 0;
   }

   input {
     padding: 0.5rem;
     margin-bottom: 0.5rem;
     width: 100%;
     max-width: 300px;
   }
   </style>
   ```

This example shows:

- Using `<script setup>` for more concise and performant components
- Reactive state management with `ref`
- Computed properties for automatic conversions
- Event handling for inputs
- Basic styling with scoped CSS

You can use this component in your app like this:

```vue
<!-- App.vue -->
<script setup>
import NumberConverter from "./components/NumberConverter.vue";
</script>

<template>
  <div>
    <h1>Number Converter</h1>
    <NumberConverter />
  </div>
</template>
```

## File Structure

- `numbers-to-words-words-to-numbers.js` — Main converter script

## Author

- [Khashayar Shomali](https://github.com/shomalikhashayar)

## License

This project is open source and available under the MIT License.
