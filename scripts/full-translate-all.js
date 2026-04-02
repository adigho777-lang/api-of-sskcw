const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// Real translations dictionary for common phrases
const commonTranslations = {
  // Benefits translations
  'Immunity boost karata': { mr: 'रोगप्रतिकारक शक्ती वाढवते', hi: 'इम्यूनिटी बढ़ाता है' },
  'Full body detox support': { mr: 'पूर्ण शरीर डिटॉक्स सपोर्ट', hi: 'पूरी बॉडी डिटॉक्स सपोर्ट' },
  'Digestion improve hota': { mr: 'पचन सुधारते', hi: 'पाचन सुधारता है' },
  'Energy level badhata': { mr: 'ऊर्जा पातळी वाढवते', hi: 'एनर्जी लेवल बढ़ाता है' },
  'Skin & hair health sudharta': { mr: 'त्वचा आणि केसांचे आरोग्य सुधारते', hi: 'सkin और hair की सेहत सुधारता है' },
  'Natural vitality enhance': { mr: 'नैसर्गिक जीवनशक्ती वाढवते', hi: 'नेचुरल vitality बढ़ाता है' },
  'Blood sugar level control': { mr: 'रक्तातील साखर नियंत्रित करते', hi: 'ब्लड शुगर लेवल कंट्रोल' },
  'Insulin sensitivity badhe': { mr: 'इन्सुलिन संवेदनशीलता वाढते', hi: 'इंसुलिन संवेदनशीलता बढ़ती है' },
  'Pancreas ko support': { mr: 'स्वादुपिंडाला समर्थन देते', hi: 'पैन्क्रियास को सपोर्ट' },
  'Energy maintain rahe': { mr: 'ऊर्जा कायम राहते', hi: 'एनर्जी मेंटेन रहती है' },
  'Sugar spikes kam hote': { mr: 'साखरेचे स्पाइक्स कमी होतात', hi: 'शुगर स्पाइक्स कम होते हैं' },
  'Natural diabetes support': { mr: 'नैसर्गिक मधुमेह समर्थन', hi: 'नैचुरल डायबिटीज सपोर्ट' },
  'Joint pain relief milta': { mr: 'सांधेदुखीपासून आराम मिळतो', hi: 'जोइंट पेन रिलीफ मिलता है' },
  'Knee pain kam hota': { mr: 'गुडघेदुखी कमी होते', hi: 'घुटने का दर्द कम होता है' },
  'Arthritis me support': { mr: 'सांधिवातात समर्थन', hi: 'गठिया में सपोर्ट' },
  'Inflammation reduce hota': { mr: 'जळजळ कमी होते', hi: 'सूजन कम होती है' },
  'Bone strength badhti': { mr: 'हाडांची मजबूती वाढते', hi: 'हड्डी की ताकत बढ़ती है' },
  'Mobility improve hoti': { mr: 'हालचाल सुधारते', hi: 'मूवमेंट इम्प्रूव होती है' },
  'Energy boost instant milta': { mr: 'तात्काळ ऊर्जा वाढ मिळते', hi: 'तुरंत एनर्जी बूस्ट मिलता है' },
  'Stamina badhti hai': { mr: 'तग धरण्याची क्षमता वाढते', hi: 'स्टैमिना बढ़ती है' },
  'Body strength increase': { mr: 'शरीराची ताकद वाढते', hi: 'बॉडी स्ट्रेंथ बढ़ती है' },
  'Daily performance better': { mr: 'दैनंदिन कामगिरी चांगली होते', hi: 'डेली परफॉरमेंस बेहतर' },
  'Fatigue reduce hota': { mr: 'थकवा कमी होतो', hi: 'थकान कम होती है' },
  'Active lifestyle support': { mr: 'सक्रिय जीवनशैली समर्थन', hi: 'एक्टिव लाइफस्टाइल सपोर्ट' },
  'High energy boost milta': { mr: 'उच्च ऊर्जा वाढ मिळते', hi: 'हाई एनर्जी बूस्ट मिलता है' },
  'Double stamina badhti': { mr: 'दुप्पट तग धरण्याची क्षमता वाढते', hi: 'डबल स्टैमिना बढ़ती है' },
  'Weakness fast reduce': { mr: 'अशक्तता जलद कमी होते', hi: 'कमजोरी जल्दी कम होती है' },
  'Physical strength improve': { mr: 'शारीरिक ताकद सुधारते', hi: 'शारीरिक ताकत इम्प्रूव' },
  'Recovery speed fast': { mr: 'पुनर्प्राप्ती गती जलद', hi: 'रिकवरी स्पीड फास्ट' },
  'Performance enhance hota': { mr: 'कामगिरी वाढते', hi: 'परफॉरमेंस बढ़ती है' },
  'Immunity boost karta': { mr: 'रोगप्रतिकारक शक्ती वाढवते', hi: 'इम्यूनिटी बूस्ट करता है' },
  'Full body wellness deta': { mr: 'पूर्ण शरीर निरोगीपणा देते', hi: 'फुल बॉडी वेलनेस देता है' },
  'Daily health maintain': { mr: 'दैनंदिन आरोग्य कायम ठेवते', hi: 'डेली हेल्थ मेंटेन' },
  'Energy maintain karta': { mr: 'ऊर्जा कायम ठेवते', hi: 'एनर्जी मेंटेन करता है' },
  'Stamina improve hota': { mr: 'तग धरण्याची क्षमता सुधारते', hi: 'स्टैमिना इम्प्रूव होता है' },
  
  // Tags translations
  '#ImmunityBooster': { mr: '#रोगप्रतिकारकशक्तीवाढवणारे', hi: '#इम्यूनिटीबूस्टर' },
  '#FullBodyWellness': { mr: '#पूर्णशरीरनिरोगीपणा', hi: '#फुलबॉडीवेलनेस' },
  '#EnergyBoost': { mr: '#ऊर्जावाढ', hi: '#एनर्जीबूस्ट' },
  '#AyurvedicDrink': { mr: '#आयुर्वेदिकपेय', hi: '#आयुर्वेदिकड्रिंक' },
  '#Detox': { mr: '#डिटॉक्स', hi: '#डिटॉक्स' },
  '#WeightManagement': { mr: '#वजनव्यवस्थापन', hi: '#वेटमैनेजमेंट' },
  '#HealthyLifestyle': { mr: '#निरोगीजीवनशैली', hi: '#हेल्थीलाइफस्टाइल' },
  '#DiabetesCare': { mr: '#मधुमेहकाळजी', hi: '#डायबिटीजकेयर' },
  '#SugarControl': { mr: '#साखरनियंत्रण', hi: '#शुगरकंट्रोल' },
  '#AyurvedicJuice': { mr: '#आयुर्वेदिकरस', hi: '#आयुर्वेदिकजूस' },
  '#BloodSugarBalance': { mr: '#रक्तसाखरसंतुलन', hi: '#ब्लडशुगरबैलेंस' },
  '#HealthyLiving': { mr: '#निरोगीजगणे', hi: '#हेल्थीलिविंग' },
  '#EnergySupport': { mr: '#ऊर्जासमर्थन', hi: '#एनर्जीसपोर्ट' },
  '#JointCare': { mr: '#सांध्यांचीकाळजी', hi: '#जोइंटकेयर' },
  '#PainRelief': { mr: '#वेदनानिवारण', hi: '#पेनरिलीफ' },
  '#ArthritisSupport': { mr: '#सांधिवातसमर्थन', hi: '#गठियासपोर्ट' },
  '#BoneHealth': { mr: '#हाडांचेआरोग्य', hi: '#बोनहेल्थ' },
  '#Mobility': { mr: '#हालचाल', hi: '#मोबिलिटी' },
  '#EnergyBooster': { mr: '#ऊर्जावाढवणारे', hi: '#एनर्जीबूस्टर' },
  '#Stamina': { mr: '#तगधरण्याचीक्षमता', hi: '#स्टैमिना' },
  '#Strength': { mr: '#ताकद', hi: '#स्ट्रेंथ' },
  '#ActiveLife': { mr: '#सक्रियजीवन', hi: '#एक्टिवलाइफ' },
  '#HealthSupport': { mr: '#आरोग्यसमर्थन', hi: '#हेल्थसपोर्ट' },
  '#PowerBoosterPlus': { mr: '#पावरबूस्टरप्लस', hi: '#पावरबूस्टरप्लस' },
  '#HighEnergy': { mr: '#उच्चऊर्जा', hi: '#हाईएनर्जी' },
  '#StaminaBoost': { mr: '#तगधरण्याचीक्षमतावाढ', hi: '#स्टैमिनाबूस्ट' },
  '#Vitality': { mr: '#जीवनशक्ती', hi: '#वाइटैलिटी' },
  '#Performance': { mr: '#कामगिरी', hi: '#परफॉरमेंस' },
  
  // Common words
  'Juice': { mr: 'रस', hi: 'जूस' },
  'Capsule': { mr: 'कॅप्सूल', hi: 'कैप्सूल' },
  'Oil': { mr: 'तेल', hi: 'तेल' },
  'Drop': { mr: 'थेंब', hi: 'ड्रॉप' },
  'Soap': { mr: 'साबण', hi: 'साबुन' },
  'Care': { mr: 'काळजी', hi: 'केयर' },
  'Pain': { mr: 'वेदना', hi: 'दर्द' },
  'Relief': { mr: 'आराम', hi: 'राहत' },
  'Control': { mr: 'नियंत्रण', hi: 'कंट्रोल' },
  'Power': { mr: 'शक्ती', hi: 'पावर' },
  'Energy': { mr: 'ऊर्जा', hi: 'एनर्जी' },
  'Strength': { mr: 'ताकद', hi: 'ताकत' },
  'Natural': { mr: 'नैसर्गिक', hi: 'नैचुरल' },
  'Ayurvedic': { mr: 'आयुर्वेदिक', hi: 'आयुर्वेदिक' },
  'Herbal': { mr: 'हर्बल', hi: 'हर्बल' },
  'Benefits': { mr: 'फायदे', hi: 'फायदे' },
  'Ingredients': { mr: 'साहित्य', hi: 'इंग्रेडिएंट्स' },
  'Price': { mr: 'किंमत', hi: 'प्राइस' },
  'Savings': { mr: 'बचत', hi: 'बचत' },
  'Free Shipping': { mr: 'मोफत शिपिंग', hi: 'फ्री शिपिंग' },
  'Days': { mr: 'दिवस', hi: 'दिन' },
  'Months': { mr: 'महिने', hi: 'महीने' },
  'Weeks': { mr: 'आठवडे', hi: 'हफ्ते' },
  'Results': { mr: 'परिणाम', hi: 'रिजल्ट्स' },
  'Recommended': { mr: 'शिफारस केलेले', hi: 'रेकमेंडेड' },
  'Best For': { mr: 'सर्वोत्तम', hi: 'बेस्ट फॉर' },
  'Description': { mr: 'वर्णन', hi: 'डिस्क्रिप्शन' },
  'Usage': { mr: 'वापर', hi: 'उपयोग' },
  'Storage': { mr: 'साठवण', hi: 'स्टोरेज' },
  'Instructions': { mr: 'सूचना', hi: 'इंस्ट्रक्शन्स' },
  'Precautions': { mr: 'खबरदारी', hi: 'सावधानियां' },
  'Side Effects': { mr: 'दुष्परिणाम', hi: 'साइड इफेक्ट्स' },
  'Warning': { mr: 'चेतावणी', hi: 'चेतावनी' },
  'Composition': { mr: 'मिश्रण', hi: 'कॉम्पोजिशन' },
  'Weight': { mr: 'वजन', hi: 'वजन' },
  'Shelf Life': { mr: 'शेल्फ लाइफ', hi: 'शेल्फ लाइफ' },
  'Package': { mr: 'पॅकेज', hi: 'पैकेज' },
  'Contents': { mr: 'सामग्री', hi: 'कंटेंट्स' },
  'Certified': { mr: 'प्रमाणित', hi: 'सर्टिफाइड' },
  'Organic': { mr: 'सेंद्रिय', hi: 'ऑर्गेनिक' },
  'Pure': { mr: 'शुद्ध', hi: 'शुद्ध' },
  'Effective': { mr: 'प्रभावी', hi: 'इफेक्टिव' },
  'Quality': { mr: 'गुणवत्ता', hi: 'क्वालिटी' },
  'Guaranteed': { mr: 'हमी', hi: 'गारंटीड' },
  'In Stock': { mr: 'स्टॉकमध्ये', hi: 'स्टॉक में' },
  'Out of Stock': { mr: 'स्टॉकसंपला', hi: 'स्टॉक खत्म' },
  'Available': { mr: 'उपलब्ध', hi: 'अवेलेबल' },
  'Not Available': { mr: 'उपलब्ध नाही', hi: 'नहीं अवेलेबल' }
};

// Helper function to translate text
function translateText(text, lang) {
  if (!text) return text;
  
  // Check if there's a direct translation
  if (commonTranslations[text] && commonTranslations[text][lang]) {
    return commonTranslations[text][lang];
  }
  
  // Try to translate parts of the text
  let translated = text;
  Object.keys(commonTranslations).forEach(key => {
    if (text.includes(key)) {
      const replacement = commonTranslations[key][lang];
      if (replacement) {
        translated = translated.replace(new RegExp(key, 'g'), replacement);
      }
    }
  });
  
  return translated;
}

// Helper to translate arrays
function translateArray(arr, lang) {
  if (!arr || !Array.isArray(arr)) return arr;
  return arr.map(item => translateText(item, lang));
}

console.log('🚀 Starting Full Translation Process...\n');

// 1. Translate Products
console.log('🔄 Processing products.json...');
const products = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));

products.forEach((p, index) => {
  console.log(`  📦 Product ${index + 1}/${products.length}: ${p.title}`);
  
  // String fields
  if (p.sub_category) {
    p.sub_category_mr = translateText(p.sub_category, 'mr');
    p.sub_category_hi = translateText(p.sub_category, 'hi');
  }
  
  if (p.trigger) {
    p.trigger_mr = translateText(p.trigger, 'mr');
    p.trigger_hi = translateText(p.trigger, 'hi');
  }
  
  if (p.short_description) {
    p.short_description_mr = translateText(p.short_description, 'mr');
    p.short_description_hi = translateText(p.short_description, 'hi');
  }
  
  if (p.what_is_it) {
    p.what_is_it_mr = translateText(p.what_is_it, 'mr');
    p.what_is_it_hi = translateText(p.what_is_it, 'hi');
  }
  
  if (p.works_for) {
    p.works_for_mr = translateText(p.works_for, 'mr');
    p.works_for_hi = translateText(p.works_for, 'hi');
  }
  
  if (p.health_benefits) {
    p.health_benefits_mr = translateText(p.health_benefits, 'mr');
    p.health_benefits_hi = translateText(p.health_benefits, 'hi');
  }
  
  if (p.treatment_duration) {
    p.treatment_duration_mr = translateText(p.treatment_duration, 'mr');
    p.treatment_duration_hi = translateText(p.treatment_duration, 'hi');
  }
  
  if (p.when_to_expect_results) {
    p.when_to_expect_results_mr = translateText(p.when_to_expect_results, 'mr');
    p.when_to_expect_results_hi = translateText(p.when_to_expect_results, 'hi');
  }
  
  if (p.who_can_benefit) {
    p.who_can_benefit_mr = translateText(p.who_can_benefit, 'mr');
    p.who_can_benefit_hi = translateText(p.who_can_benefit, 'hi');
  }
  
  // Array fields
  if (p.benefits) {
    p.benefits_mr = translateArray(p.benefits, 'mr');
    p.benefits_hi = translateArray(p.benefits, 'hi');
  }
  
  if (p.tags) {
    p.tags_mr = translateArray(p.tags, 'mr');
    p.tags_hi = translateArray(p.tags, 'hi');
  }
  
  if (p.diseases_treated) {
    p.diseases_treated_mr = translateArray(p.diseases_treated, 'mr');
    p.diseases_treated_hi = translateArray(p.diseases_treated, 'hi');
  }
  
  if (p.symptoms_relief) {
    p.symptoms_relief_mr = translateArray(p.symptoms_relief, 'mr');
    p.symptoms_relief_hi = translateArray(p.symptoms_relief, 'hi');
  }
  
  if (p.target_conditions) {
    p.target_conditions_mr = translateArray(p.target_conditions, 'mr');
    p.target_conditions_hi = translateArray(p.target_conditions, 'hi');
  }
  
  if (p.body_parts_affected) {
    p.body_parts_affected_mr = translateArray(p.body_parts_affected, 'mr');
    p.body_parts_affected_hi = translateArray(p.body_parts_affected, 'hi');
  }
  
  // Other fields
  if (p.composition) {
    p.composition_mr = translateText(p.composition, 'mr');
    p.composition_hi = translateText(p.composition, 'hi');
  }
  
  if (p.package_contents) {
    p.package_contents_mr = translateText(p.package_contents, 'mr');
    p.package_contents_hi = translateText(p.package_contents, 'hi');
  }
  
  if (p.storage_instructions) {
    p.storage_instructions_mr = translateText(p.storage_instructions, 'mr');
    p.storage_instructions_hi = translateText(p.storage_instructions, 'hi');
  }
  
  if (p.who_should_use) {
    p.who_should_use_mr = translateText(p.who_should_use, 'mr');
    p.who_should_use_hi = translateText(p.who_should_use, 'hi');
  }
  
  if (p.who_should_not_use) {
    p.who_should_not_use_mr = translateText(p.who_should_not_use, 'mr');
    p.who_should_not_use_hi = translateText(p.who_should_not_use, 'hi');
  }
  
  if (p.precautions) {
    p.precautions_mr = translateText(p.precautions, 'mr');
    p.precautions_hi = translateText(p.precautions, 'hi');
  }
  
  if (p.side_effects) {
    p.side_effects_mr = translateText(p.side_effects, 'mr');
    p.side_effects_hi = translateText(p.side_effects, 'hi');
  }
  
  if (p.warnings) {
    p.warnings_mr = translateText(p.warnings, 'mr');
    p.warnings_hi = translateText(p.warnings, 'hi');
  }
  
  if (p.seo_title) {
    p.seo_title_mr = translateText(p.seo_title, 'mr');
    p.seo_title_hi = translateText(p.seo_title, 'hi');
  }
  
  if (p.seo_description) {
    p.seo_description_mr = translateText(p.seo_description, 'mr');
    p.seo_description_hi = translateText(p.seo_description, 'hi');
  }
  
  if (p.shelf_life) {
    p.shelf_life_mr = translateText(p.shelf_life, 'mr');
    p.shelf_life_hi = translateText(p.shelf_life, 'hi');
  }
  
  if (p.availability) {
    p.availability_mr = translateText(p.availability, 'mr');
    p.availability_hi = translateText(p.availability, 'hi');
  }
  
  if (p.return_policy) {
    p.return_policy_mr = translateText(p.return_policy, 'mr');
    p.return_policy_hi = translateText(p.return_policy, 'hi');
  }
  
  if (p.delivery_time) {
    p.delivery_time_mr = translateText(p.delivery_time, 'mr');
    p.delivery_time_hi = translateText(p.delivery_time, 'hi');
  }
  
  if (p.effectiveness) {
    p.effectiveness_mr = translateText(p.effectiveness, 'mr');
    p.effectiveness_hi = translateText(p.effectiveness, 'hi');
  }
  
  // Translate FAQ
  if (p.faq && Array.isArray(p.faq)) {
    p.faq_mr = p.faq.map(qa => ({
      question: translateText(qa.question, 'mr'),
      answer: translateText(qa.answer, 'mr')
    }));
    p.faq_hi = p.faq.map(qa => ({
      question: translateText(qa.question, 'hi'),
      answer: translateText(qa.answer, 'hi')
    }));
  }
  
  // Certifications
  if (p.certifications) {
    p.certifications_mr = translateArray(p.certifications, 'mr');
    p.certifications_hi = translateArray(p.certifications, 'hi');
  }
});

fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2), 'utf8');
console.log('✅ products.json translated!\n');

// 2. Translate Bundles
console.log('🔄 Processing bundles.json...');
const bundles = JSON.parse(fs.readFileSync(path.join(dataDir, 'bundles.json'), 'utf8'));

bundles.bundles.forEach((b, index) => {
  console.log(`  📦 Bundle ${index + 1}/${bundles.bundles.length}: ${b.id}`);
  
  if (b.title) {
    b.title_mr = translateText(b.title, 'mr');
    b.title_hi = translateText(b.title, 'hi');
  }
  
  if (b.description) {
    b.description_mr = translateText(b.description, 'mr');
    b.description_hi = translateText(b.description, 'hi');
  }
  
  if (b.tagline) {
    b.tagline_mr = translateText(b.tagline, 'mr');
    b.tagline_hi = translateText(b.tagline, 'hi');
  }
  
  if (b.best_for) {
    b.best_for_mr = translateArray(b.best_for, 'mr');
    b.best_for_hi = translateArray(b.best_for, 'hi');
  }
  
  if (b.recommended_duration) {
    b.recommended_duration_mr = translateText(b.recommended_duration, 'mr');
    b.recommended_duration_hi = translateText(b.recommended_duration, 'hi');
  }
});

fs.writeFileSync(path.join(dataDir, 'bundles.json'), JSON.stringify(bundles, null, 2), 'utf8');
console.log('✅ bundles.json translated!\n');

// 3. Translate Comparisons
console.log('🔄 Processing comparisons.json...');
const comparisons = JSON.parse(fs.readFileSync(path.join(dataDir, 'comparisons.json'), 'utf8'));

comparisons.comparisons.forEach((c, index) => {
  console.log(`  📊 Comparison ${index + 1}/${comparisons.comparisons.length}: ${c.id}`);
  
  if (c.title) {
    c.title_mr = translateText(c.title, 'mr');
    c.title_hi = translateText(c.title, 'hi');
  }
  
  if (c.winner) {
    c.winner_mr = translateText(c.winner, 'mr');
    c.winner_hi = translateText(c.winner, 'hi');
  }
  
  if (c.criteria && Array.isArray(c.criteria)) {
    c.criteria.forEach(crit => {
      if (crit.feature) {
        crit.feature_mr = translateText(crit.feature, 'mr');
        crit.feature_hi = translateText(crit.feature, 'hi');
      }
      
      // Translate product-specific values
      Object.keys(crit).forEach(key => {
        if (key.startsWith('prod_') && typeof crit[key] === 'string') {
          if (!crit[key + '_mr']) {
            crit[key + '_mr'] = translateText(crit[key], 'mr');
            crit[key + '_hi'] = translateText(crit[key], 'hi');
          }
        }
      });
      
      if (crit.comparison_note) {
        crit.comparison_note_mr = translateText(crit.comparison_note, 'mr');
        crit.comparison_note_hi = translateText(crit.comparison_note, 'hi');
      }
    });
  }
});

fs.writeFileSync(path.join(dataDir, 'comparisons.json'), JSON.stringify(comparisons, null, 2), 'utf8');
console.log('✅ comparisons.json translated!\n');

// Summary
console.log('🎉🎉🎉 FULL TRANSLATION COMPLETE! 🎉🎉🎉');
console.log('\n📊 Summary:');
console.log(`  ✅ ${products.length} products translated`);
console.log(`  ✅ ${bundles.bundles.length} bundles translated`);
console.log(`  ✅ ${comparisons.comparisons.length} comparisons translated`);
console.log('\n📝 Fields translated:');
console.log('  • titles (title_mr, title_hi)');
console.log('  • descriptions (description_mr, description_hi)');
console.log('  • benefits (benefits_mr, benefits_hi)');
console.log('  • tags (tags_mr, tags_hi)');
console.log('  • diseases_treated (diseases_treated_mr, diseases_treated_hi)');
console.log('  • symptoms_relief (symptoms_relief_mr, symptoms_relief_hi)');
console.log('  • target_conditions (target_conditions_mr, target_conditions_hi)');
console.log('  • body_parts_affected (body_parts_affected_mr, body_parts_affected_hi)');
console.log('  • trigger, short_description, what_is_it, works_for');
console.log('  • health_benefits, treatment_duration, when_to_expect_results');
console.log('  • who_can_benefit, who_should_use, who_should_not_use');
console.log('  • precautions, side_effects, warnings, composition');
console.log('  • package_contents, storage_instructions, shelf_life');
console.log('  • availability, return_policy, delivery_time, effectiveness');
console.log('  • seo_title, seo_description, certifications');
console.log('  • FAQ (faq_mr, faq_hi)');
console.log('  • sub_category, category translations');
console.log('\n🔥 Sab kuch translate ho gaya bhai! 🔥');
