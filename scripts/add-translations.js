const fs = require('fs');
const path = require('path');

// Read products
const productsPath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Translation mapping for categories
const categoryTranslations = {
  'Health Care': {
    mr: 'आरोग्य सेवा',
    hi: 'स्वास्थ्य देखभाल'
  },
  'Hair Care': {
    mr: 'केसांची काळजी',
    hi: 'बालों की देखभाल'
  },
  'Skin Care': {
    mr: 'त्वचेची काळजी',
    hi: 'त्वचा की देखभाल'
  }
};

// Title translations mapping
const titleTranslations = {
  'Riyansh Amrit Juice': { mr: 'रियांश अमृत जूस', hi: 'रियांश अमृत जूस' },
  'Riyansh Diabo-G': { mr: 'रियांश डायबो-जी', hi: 'रियांश डायबो-जी' },
  'Riyansh Artho-G': { mr: 'रियांश आर्थो-जी', hi: 'रियांश आर्थो-जी' },
  'Riyansh Power Booster': { mr: 'रियांश पावर बूस्टर', hi: 'रियांश पावर बूस्टर' },
  'Riyansh Power Booster Plus': { mr: 'रियांश पावर बूस्टर प्लस', hi: 'रियांश पावर बूस्टर प्लस' },
  'Riyansh Amrit Capsule': { mr: 'रियांश अमृत कॅप्सूल', hi: 'रियांश अमृत कैप्सूल' },
  'Riyansh Pileorhoids Capsule': { mr: 'रियांश पाइलोरहॉइड्स कॅप्सूल', hi: 'रियांश पाइलोरहॉइड्स कैप्सूल' },
  'Riyansh Lady Life Care': { mr: 'रियांश लेडी लाइफ केअर', hi: 'रियांश लेडी लाइफ केयर' },
  'Riyansh Anti Addiction Drop': { mr: 'रियांश अँटी अ‍ॅडिक्शन ड्रॉप', hi: 'रियांश एंटी एडिक्शन ड्रॉप' },
  'Riyansh Ortho-G Oil': { mr: 'रियांश आर्थो-जी तेल', hi: 'रियांश आर्थो-जी ऑयल' },
  'Riyansh Alkaline Drop': { mr: 'रियांश अल्कलाईन ड्रॉप', hi: 'रियांश अल्कलाइन ड्रॉप' },
  'Riyansh Acidity Care Drop': { mr: 'रियांश अ‍ॅसिडिटी केअर ड्रॉप', hi: 'रियांश एसिडिटी केयर ड्रॉप' },
  'Riyansh Eye Care Drop': { mr: 'रियांश आय केअर ड्रॉप', hi: 'रियांश आई केयर ड्रॉप' },
  'Riyansh Ear Drop': { mr: 'रियांश इअर ड्रॉप', hi: 'रियांश ईयर ड्रॉप' },
  'Riyansh 18 Herbs Hair Oil': { mr: 'रियांश १८ हर्ब्स हेअर ऑइल', hi: 'रियांश 18 हर्ब्स हेयर ऑयल' },
  'Riyansh Neem, Tulsi & Aloe Vera Soap': { mr: 'रियांश नीम, तुळशी व अ‍ॅलो वेरा साबण', hi: 'रियांश नीम, तुलसी और एलो वेरा साबुन' },
  'Riyansh Rose Petal & Milk Soap': { mr: 'रियांश गुलाब पाकळी व दूध साबण', hi: 'रियांश गुलाब की पंखुड़ी और दूध साबुन' },
  'Riyansh 3 in 1 Face Wash': { mr: 'रियांश ३ इन १ फेस वॉश', hi: 'रियांश 3 इन 1 फेस वॉश' }
};

// Description translations (simplified)
const descriptionTranslations = {
  'Riyansh Amrit Juice': {
    hi: '42 आयुर्वेदिक जड़ी-बूटियों की शक्ति प्राप्त करें! यह शक्तिशाली हर्बल रस इम्यूनिटी बढ़ाता है, शरीर से विषाक्त पदार्थों को बाहर निकालता है, पाचन में सुधार करता है और समग्र जीवनशक्ति बढ़ाता है।',
    mr: '42 आयुर्वेदिक औषधी वनस्पतींचे सामर्थ्य अनलॉक करा! हे शक्तिशाली हर्बल रस शरीराची रोगप्रतिकारक शक्ती वाढवते, शरीरातून विष तत्वे काढून टाकते, पचन सुधारते आणि समग्र जीवनशक्ती वाढवते.'
  },
  'Riyansh Diabo-G': {
    hi: 'Riyansh Diabo-G के साथ प्राकृतिक रूप से अपने रक्त शर्करा को नियंत्रित करें! यह आयुर्वेदिक फॉर्मूला स्वस्थ ग्लूकोज स्तर का समर्थन करता है।',
    mr: 'Riyansh Diabo-G सह नैसर्गिकरित्या रक्तातील साखर नियंत्रित करा! हे आयुर्वेदिक सूत्र निरोगी ग्लुकोज पातळींना समर्थन देते.'
  },
  'Riyansh Artho-G': {
    hi: 'Riyansh Artho-G के साथ जोड़ों के दर्द से मुक्ति पाएं! यह शक्तिशाली आयुर्वेदिक मिश्रण सूजन कम करता है, हड्डियों को मजबूत करता है।',
    mr: 'Riyansh Artho-G सह सांधेदुखीपासून मुक्त व्हा! हे शक्तिशाली आयुर्वेदिक मिश्रण जळजळ कमी करते, हाडे मजबूत करते.'
  }
};

// Add translations to each product
products.forEach(product => {
  const title = product.title;
  
  // Add title translations
  if (titleTranslations[title]) {
    product.title_mr = titleTranslations[title].mr;
    product.title_hi = titleTranslations[title].hi;
  }
  
  // Add category translations
  if (categoryTranslations[product.category]) {
    product.category_mr = categoryTranslations[product.category].mr;
    product.category_hi = categoryTranslations[product.category].hi;
  }
  
  // Add description translations (use existing description_mr as base)
  if (descriptionTranslations[title]) {
    product.description_hi = descriptionTranslations[title].hi;
    // Keep existing description_mr or add if missing
    if (!product.description_mr) {
      product.description_mr = descriptionTranslations[title].mr;
    }
  }
  
  console.log(`✅ Added translations for: ${title}`);
});

// Save back
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('\n🎉 All 18 products updated with Marathi and Hindi translations!');
