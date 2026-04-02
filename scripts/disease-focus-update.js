/**
 * TAGADA DISEASE FOCUS UPDATE
 * Remove usage/videos, add diseases treated & what product does
 */

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'products.json');
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Disease and condition mapping for each product
const diseaseInfo = {
  "Riyansh Amrit Juice": {
    what_is_it: "Ek powerful Ayurvedic health juice jo 42 natural herbs se bana hai. Ye aapki body ko andar se strong banata hai aur immunity power deta hai.",
    diseases_treated: [
      "Low Immunity / Weak Immune System",
      "Body Detoxification",
      "Poor Digestion",
      "Low Energy / Fatigue",
      "Skin Problems",
      "Hair Fall",
      "General Weakness",
      "Blood Purification"
    ],
    symptoms_relief: [
      "Thakan aur kamzori",
      "Bar bar bimar padna",
      "Skin infection aur pimples",
      "Hair fall aur dry hair",
      "Bad digestion aur gas",
      "Low energy levels",
      "Body mein heaviness",
      "Toxins accumulation"
    ],
    works_for: "Immunity boosting, body detox, digestion improvement, energy enhancement, skin glow, hair health, overall body wellness aur full body rejuvenation ke liye best hai.",
    target_conditions: [
      "Immunity disorders",
      "Digestive issues",
      "Chronic fatigue",
      "Skin ailments",
      "Hair problems",
      "Blood impurities",
      "General debility"
    ],
    health_benefits: "Ye juice aapki body ki natural defense system ko strong karta hai, harmful toxins nikalta hai, digestion smooth karta hai, skin aur hair ko healthy banata hai, aur puri body ko energetic feel karata hai."
  },
  
  "Riyansh Diabo-G": {
    what_is_it: "Diabetes patients ke liye special Ayurvedic juice jo blood sugar levels naturally control karta hai. Pancreas ko healthy rakhta hai.",
    diseases_treated: [
      "Type 2 Diabetes",
      "High Blood Sugar",
      "Insulin Resistance",
      "Prediabetes",
      "Diabetic Neuropathy prevention",
      "Pancreas weakness",
      "Glucose intolerance"
    ],
    symptoms_relief: [
      "High blood sugar levels",
      "Frequent urination (baar baar toilet jaana)",
      "Excessive thirst (zyada pyas lagna)",
      "Sugar cravings",
      "Fatigue despite eating",
      "Blurred vision",
      "Slow wound healing",
      "Numbness in hands/feet"
    ],
    works_for: "Blood sugar control, insulin sensitivity improvement, pancreas support, sugar spike prevention, diabetes management, metabolic health aur long-term sugar balance ke liye effective hai.",
    target_conditions: [
      "Diabetes Mellitus",
      "Hyperglycemia",
      "Insulin deficiency",
      "Metabolic syndrome",
      "Sugar imbalance"
    ],
    health_benefits: "Natural herbs se bana ye juice blood sugar levels ko stable rakhta hai, insulin kaam ko better karta hai, pancreas ki sehat sudharta hai, aur diabetes ke complications se bachata hai."
  },

  "Riyansh Artho-G": {
    what_is_it: "Joint pain, arthritis, aur bone problems ke liye Ayurvedic juice. Ye joints ko lubricate karta hai aur inflammation kam karta hai.",
    diseases_treated: [
      "Osteoarthritis",
      "Rheumatoid Arthritis",
      "Knee Pain / Gonitis",
      "Back Pain",
      "Sciatica",
      "Joint Inflammation",
      "Bone weakness",
      "Stiffness in joints"
    ],
    symptoms_relief: [
      "Joint pain aur stiffness",
      "Knee pain (gutne ka dard)",
      "Back pain (kamar dard)",
      "Shoulder pain",
      "Hip pain",
      "Swelling in joints",
      "Difficulty in walking",
      "Morning stiffness",
      "Cracking sound in joints"
    ],
    works_for: "Joint pain relief, inflammation reduction, bone strength, flexibility improvement, arthritis support, mobility enhancement, cartilage protection, aur purane ghav healing ke liye best hai.",
    target_conditions: [
      "Arthritis",
      "Joint disorders",
      "Bone degeneration",
      "Synovial inflammation",
      "Cartilage damage",
      "Ligament weakness"
    ],
    health_benefits: "Ye juice joints mein natural lubrication deta hai, inflammation aur swelling kam karta hai, bone density badhata hai, movement smooth karta hai, aur joint degeneration ko rokata hai."
  },

  "Riyansh Power Booster": {
    what_is_it: "Low energy, weakness, aur stamina issues ke liye Ayurvedic energy drink. Ye body ki natural power ko boost karta hai.",
    diseases_treated: [
      "Chronic Fatigue Syndrome",
      "Physical Weakness",
      "Low Stamina",
      "Muscle Weakness",
      "General Debility",
      "Poor Performance",
      "Recovery after illness",
      "Stress-induced fatigue"
    ],
    symptoms_relief: [
      "Thakan aur weakness",
      "Kam energy levels",
      "Poor physical performance",
      "Muscle fatigue",
      "Low stamina during work",
      "Difficulty in daily activities",
      "Mental exhaustion",
      "Body ache due to weakness"
    ],
    works_for: "Energy boosting, stamina building, muscle strength, physical performance, recovery acceleration, mental alertness, body vitality, aur active lifestyle support ke liye effective hai.",
    target_conditions: [
      "Fatigue disorders",
      "Physical weakness",
      "Low vitality",
      "Poor endurance",
      "Muscle atrophy",
      "Post-illness recovery"
    ],
    health_benefits: "Ye natural herbs se body ki cells ko energy deta hai, muscle strength badhata hai, stamina improve karta hai, physical aur mental fatigue door karta hai, aur daily activities ke liye power deta hai."
  },

  "Riyansh Power Booster Plus": {
    what_is_it: "Power Booster ka advanced version - double strength formula jo extreme weakness aur high energy needs ke liye hai.",
    diseases_treated: [
      "Severe Fatigue",
      "Extreme Physical Weakness",
      "Athletic Performance Issues",
      "Poor Muscle Mass",
      "Chronic Weakness after surgery",
      "Age-related vitality loss",
      "High-intensity work stress"
    ],
    symptoms_relief: [
      "Severe weakness",
      "Unable to do physical work",
      "Muscle loss",
      "Extreme tiredness",
      "Poor endurance",
      "Quick exhaustion",
      "Low physical capacity",
      "Slow recovery after exertion"
    ],
    works_for: "High energy boost, double stamina, muscle building, athletic performance, heavy work capacity, fast recovery, superior strength, aur maximum vitality ke liye designed hai.",
    target_conditions: [
      "Severe debility",
      "Athletic underperformance",
      "Muscle wasting",
      "Extreme fatigue disorders",
      "Physical incapacity"
    ],
    health_benefits: "Ye advanced formula cells ko double energy deti hai, muscle fibers ko strong karti hai, endurance capacity badhati hai, physical limits ko expand karti hai, aur high-performance lifestyle ko support karti hai."
  },

  "Riyansh Amrit Capsule": {
    what_is_it: "Amrit Juice ka capsule form - same 42 herbs power jo travel aur easy consumption ke liye convenient hai.",
    diseases_treated: [
      "Low Immunity",
      "Frequent Infections",
      "Poor Metabolism",
      "General Weakness",
      "Body Toxicity",
      "Nutritional Deficiency",
      "Recovery after illness"
    ],
    symptoms_relief: [
      "Bar bar thand khana",
      "Body mein infection hona",
      "Weakness aur thakan",
      "Poor appetite",
      "Skin problems",
      "Hair fall",
      "Low resistance to diseases"
    ],
    works_for: "Immunity boosting, health maintenance, body detox, nutritional support, wellness maintenance, disease prevention, aur overall vitality ke liye best hai.",
    target_conditions: [
      "Immune deficiency",
      "Metabolic disorders",
      "General health decline",
      "Nutritional gaps",
      "Chronic weakness"
    ],
    health_benefits: "Ye capsules body ki defense system ko strong karte hain, nutrients provide karte hain, metabolism boost karte hain, aur body ko diseases se fight karne ki power dete hain."
  },

  "Riyansh 18 Herbs Hair Oil": {
    what_is_it: "Hair problems ke liye 18 Ayurvedic herbs se bana natural hair oil. Scalp ko nourish karta hai aur hair roots ko strong banata hai.",
    diseases_treated: [
      "Hair Fall / Hair Loss",
      "Dandruff",
      "Dry and Brittle Hair",
      "Scalp Infections",
      "Premature Graying",
      "Split Ends",
      "Thinning Hair",
      "Scalp dryness",
      "Fungal scalp infections"
    ],
    symptoms_relief: [
      "Hair fall (baal jhadna)",
      "Dandruff (konda)",
      "Dry scalp",
      "Itchy scalp (khujli)",
      "Weak hair roots",
      "Hair breakage",
      "Dull hair",
      "Lice problem",
      "Scalp irritation"
    ],
    works_for: "Hair growth, dandruff control, scalp nourishment, hair strengthening, split end prevention, hair shine, scalp health, hair fall prevention, aur natural hair conditioning ke liye effective hai.",
    target_conditions: [
      "Alopecia",
      "Seborrheic dermatitis",
      "Scalp psoriasis",
      "Hair follicle weakness",
      "Dry scalp syndrome"
    ],
    health_benefits: "Ye oil hair roots tak penetrate karke unko strong karta hai, scalp ki blood circulation badhata hai, dandruff aur infection door karta hai, hair growth stimulate karta hai, aur natural shine deta hai."
  },

  "Riyansh Eye Care Drop": {
    what_is_it: "Eye problems aur eye strain ke liye Ayurvedic eye drops. Eyes ko cooling effect dete hain aur vision support karte hain.",
    diseases_treated: [
      "Eye Strain / Eye Fatigue",
      "Dry Eyes",
      "Eye Redness",
      "Computer Vision Syndrome",
      "Minor Eye Irritations",
      "Eye Burning sensation",
      "Eye Allergies",
      "Conjunctivitis support"
    ],
    symptoms_relief: [
      "Eye strain (aankhon ka tanaav)",
      "Dryness in eyes",
      "Redness in eyes",
      "Burning sensation",
      "Itching in eyes",
      "Watery eyes",
      "Blurred vision",
      "Screen-related eye pain",
      "Eye fatigue from reading"
    ],
    works_for: "Eye cooling, dryness relief, redness reduction, strain relief, vision comfort, screen time protection, daily eye care, aur minor eye irritations ke liye best hai.",
    target_conditions: [
      "Dry eye syndrome",
      "Digital eye strain",
      "Allergic conjunctivitis",
      "Eye fatigue",
      "Minor eye infections"
    ],
    health_benefits: "Ye drops eyes ko natural cooling dete hain, moisture maintain karte hain, irritation kam karte hain, redness door karte hain, aur long screen time se hone wali problems se bachate hain."
  },

  "Riyansh Ear Drop": {
    what_is_it: "Ear hygiene aur ear comfort ke liye Ayurvedic ear drops. Ears ko clean aur healthy rakhte hain.",
    diseases_treated: [
      "Ear Wax Buildup",
      "Minor Ear Infections",
      "Ear Itching",
      "Ear Discomfort",
      "Ear Dryness",
      "Preventive ear care"
    ],
    symptoms_relief: [
      "Ear itching (kaan mein khujli)",
      "Ear wax problem",
      "Mild ear pain",
      "Ear fullness",
      "Dryness in ear",
      "Minor ear irritation"
    ],
    works_for: "Ear cleaning, ear hygiene, wax softening, ear comfort, minor infection prevention, ear moisture balance, aur daily ear care ke liye suitable hai.",
    target_conditions: [
      "Cerumen impaction",
      "Otitis externa (mild)",
      "Ear canal dryness",
      "Preventive ear maintenance"
    ],
    health_benefits: "Ye drops ears ko naturally clean karte hain, wax ko soften karte hain, itching aur irritation door karte hain, infection se bachate hain, aur ear health maintain karte hain."
  },

  "Riyansh Lady Life Care": {
    what_is_it: "Women ki special health needs ke liye Ayurvedic supplement. Hormonal balance aur female wellness ke liye.",
    diseases_treated: [
      "Hormonal Imbalance",
      "Irregular Periods",
      "PCOS/PCOD Support",
      "Menstrual Cramps",
      "Menopausal Symptoms",
      "Female Weakness",
      "UTI Prevention",
      "Reproductive Health Issues"
    ],
    symptoms_relief: [
      "Period pain (mahawari dard)",
      "Irregular periods",
      "Mood swings",
      "Hormonal acne",
      "Weakness during periods",
      "Hot flashes",
      "Vaginal dryness",
      "Low libido",
      "Fatigue in women"
    ],
    works_for: "Hormonal balance, menstrual health, reproductive wellness, menopause support, female vitality, skin health in women, mood stability, aur overall feminine wellness ke liye effective hai.",
    target_conditions: [
      "Menstrual disorders",
      "Hormonal dysfunction",
      "PCOS",
      "Menopausal syndrome",
      "Female reproductive issues"
    ],
    health_benefits: "Ye natural herbs female hormones ko balance karte hain, periods regular karte hain, menstrual discomfort kam karte hain, reproductive health improve karte hain, aur women ki overall vitality badhate hain."
  },

  "Riyansh Pileorhoids Capsule": {
    what_is_it: "Piles (Bawaseer) aur hemorrhoids ke liye Ayurvedic capsules. Rectal health ko support karte hain.",
    diseases_treated: [
      "Piles / Hemorrhoids (Bawaseer)",
      "Bleeding Piles",
      "Fissures",
      "Constipation-related piles",
      "Rectal Inflammation",
      "Anal Fistula support",
      "Chronic Constipation"
    ],
    symptoms_relief: [
      "Piles pain (bawaseer ka dard)",
      "Bleeding during stool",
      "Itching in anal area (guda chhed mein jalan)",
      "Burning sensation",
      "Swelling near anus",
      "Constipation (kabz)",
      "Difficulty passing stool",
      "Mucus discharge"
    ],
    works_for: "Piles pain relief, bleeding control, itching reduction, constipation relief, rectal healing, inflammation reduction, soft stool formation, aur digestive health improvement ke liye best hai.",
    target_conditions: [
      "Hemorrhoids",
      "Anal fissures",
      "Rectal inflammation",
      "Chronic constipation",
      "Anal fistula"
    ],
    health_benefits: "Ye capsules piles ki swelling aur pain ko kam karte hain, bleeding stop karte hain, constipation door karte hain, rectal tissues ko heal karte hain, aur digestive system ko strong banate hain."
  },

  "Riyansh Anti Addication Drop": {
    what_is_it: "Addiction chhodne ke liye Ayurvedic support drops. Alcohol, smoking, tobacco ki cravings kam karte hain.",
    diseases_treated: [
      "Alcohol Addiction",
      "Smoking Addiction",
      "Tobacco Dependence",
      "Nicotine Withdrawal",
      "Substance Cravings",
      "Addictive Behavior",
      "Withdrawal Symptoms"
    ],
    symptoms_relief: [
      "Alcohol cravings",
      "Cigarette cravings",
      "Tobacco cravings",
      "Withdrawal anxiety",
      "Mood swings during quitting",
      "Irritability",
      "Sleep issues",
      "Stress from quitting"
    ],
    works_for: "Addiction quitting support, craving reduction, withdrawal symptom relief, mental calm during de-addiction, stress management, clean lifestyle adoption, aur healthy habits formation ke liye helpful hai.",
    target_conditions: [
      "Alcohol dependence",
      "Nicotine addiction",
      "Substance use disorder",
      "Addictive behavior patterns"
    ],
    health_benefits: "Ye drops body ki addiction cravings ko naturally kam karte hain, withdrawal symptoms manageable banate hain, mind ko calm rakhte hain, detox support dete hain, aur addiction-free life adopt karne mein help karte hain."
  },

  "Riyansh Neem, Tulsi & Aloe Vera Soap": {
    what_is_it: "Skin problems aur infections ke liye Ayurvedic herbal soap. Neem, Tulsi, Aloe Vera se bana natural skin cleanser.",
    diseases_treated: [
      "Acne / Pimples",
      "Skin Infections",
      "Oily Skin",
      "Body Odor",
      "Bacterial Skin Issues",
      "Fungal Skin Infections",
      "Skin Allergies",
      "Rashes"
    ],
    symptoms_relief: [
      "Pimples aur acne",
      "Oily skin",
      "Skin itching",
      "Body odor",
      "Bacterial skin issues",
      "Minor skin infections",
      "Skin rashes",
      "Uneven skin tone"
    ],
    works_for: "Acne control, skin cleansing, bacterial protection, oil control, skin hydration, infection prevention, daily skin care, aur natural skin glow ke liye effective hai.",
    target_conditions: [
      "Acne vulgaris",
      "Seborrhea",
      "Skin infections",
      "Dermatitis",
      "Prickly heat"
    ],
    health_benefits: "Ye soap skin ko deeply clean karta hai, bacteria aur germs se bachata hai, pimples aur acne control karta hai, skin ko natural moisture deta hai, complexion improve karta hai, aur daily freshness maintain karta hai."
  },

  "Riyansh Rose Petal & Milk Soap": {
    what_is_it: "Dry skin aur skin nourishment ke liye luxurious herbal soap. Rose petals aur milk se skin ko soft aur smooth banata hai.",
    diseases_treated: [
      "Dry Skin",
      "Rough Skin",
      "Dull Complexion",
      "Skin Dehydration",
      "Uneven Skin Tone",
      "Skin Aging signs",
      "Sensitive Skin"
    ],
    symptoms_relief: [
      "Dry and rough skin",
      "Skin tightness after bath",
      "Dull complexion",
      "Lack of skin glow",
      "Flaky skin",
      "Skin dehydration",
      "Fine lines"
    ],
    works_for: "Skin moisturizing, complexion brightening, skin softening, anti-aging, skin nourishment, dry skin relief, sensitive skin care, aur natural glow ke liye best hai.",
    target_conditions: [
      "Xerosis (dry skin)",
      "Skin dehydration",
      "Premature aging",
      "Sensitive skin syndrome"
    ],
    health_benefits: "Ye soap skin ko deep moisturize karta hai, rose petals se natural glow deta hai, milk proteins se skin ko nourish karta hai, aging signs ko kam karta hai, skin texture smooth karta hai, aur 24-hour hydration maintain karta hai."
  },

  "Riyansh Ortho-G Anti Pain Oil": {
    what_is_it: "Joint pain, muscle pain, aur body pain ke liye Ayurvedic pain relief oil. Deep penetration ke saath pain door karta hai.",
    diseases_treated: [
      "Joint Pain",
      "Muscle Pain",
      "Back Pain",
      "Knee Pain",
      "Shoulder Pain",
      "Neck Pain",
      "Sprains",
      "Muscular Stiffness",
      "Sports Injuries"
    ],
    symptoms_relief: [
      "Joint pain (sande ka dard)",
      "Muscle pain",
      "Back pain (kamar dard)",
      "Knee pain (ghutne ka dard)",
      "Neck stiffness",
      "Shoulder pain",
      "Muscle cramps",
      "Sprain pain",
      "Body stiffness"
    ],
    works_for: "Pain relief, inflammation reduction, muscle relaxation, blood circulation improvement, joint mobility, stiffness removal, sports recovery, aur chronic pain management ke liye effective hai.",
    target_conditions: [
      "Musculoskeletal pain",
      "Myalgia",
      "Sprains and strains",
      "Arthralgia",
      "Soft tissue injuries"
    ],
    health_benefits: "Ye oil skin mein deep penetrate karke pain receptors ko calm karta hai, inflammation kam karta hai, blood flow badhata hai, muscles ko relax karta hai, joint flexibility restore karta hai, aur long-lasting pain relief deta hai."
  },

  "Riyansh Alkaline Drop": {
    what_is_it: "Body ka pH level balance karne ke liye Ayurvedic drops. Acidity door karke body ko alkaline banate hain.",
    diseases_treated: [
      "Acidity / Acid Reflux",
      "Heartburn",
      "GERD Support",
      "Body pH Imbalance",
      "Acidic Body Constitution",
      "Toxin Accumulation",
      "Poor Metabolism"
    ],
    symptoms_relief: [
      "Chest burning (seene mein jalan)",
      "Acid reflux",
      "Sour burps",
      "Stomach acidity",
      "Indigestion",
      "Bloating",
      "Nausea from acidity",
      "Morning acidity"
    ],
    works_for: "pH balance, acidity neutralization, detox support, metabolism boost, acid reflux relief, digestion improvement, energy level enhancement, aur body alkalization ke liye effective hai.",
    target_conditions: [
      "Acidosis",
      "GERD",
      "Hyperacidity",
      "Metabolic acidosis",
      "Chronic acidity"
    ],
    health_benefits: "Ye drops body ke acid levels ko neutralize karte hain, pH balance restore karte hain, digestion smooth karte hain, toxins eliminate karte hain, cells ko alkaline environment dete hain, aur overall metabolic health improve karte hain."
  },

  "Riyansh Acidity Care Drop": {
    what_is_it: "Gas, acidity, aur digestive problems ke liye fast-acting Ayurvedic drops. Pet ki problems ko quickly relief dete hain.",
    diseases_treated: [
      "Acidity",
      "Gas / Flatulence",
      "Indigestion",
      "Bloating",
      "Stomach Cramps",
      "Nausea",
      "Dyspepsia",
      "Acid Reflux"
    ],
    symptoms_relief: [
      "Gas trouble (gas ki problem)",
      "Acidity",
      "Stomach bloating (pet fulna)",
      "Stomach pain",
      "Indigestion (apach)",
      "Burning in chest",
      "Sour taste in mouth",
      "Belching (dakar)"
    ],
    works_for: "Quick acidity relief, gas expulsion, bloating reduction, stomach comfort, digestion improvement, heartburn relief, stomach pain relief, aur digestive wellness ke liye fast-acting solution hai.",
    target_conditions: [
      "Dyspepsia",
      "Flatulence",
      "Gastritis",
      "Acid reflux",
      "Functional dyspepsia"
    ],
    health_benefits: "Ye drops quickly acidity neutralize karte hain, gas expel karte hain, bloating door karte hain, stomach lining soothe karte hain, digestion speed up karte hain, aur instant stomach comfort dete hain."
  },

  "Riyansh 3 in 1 Face Wash": {
    what_is_it: "Face ki 3 problems ek sahi - Cleanser, Scrub, aur Glow ke liye multi-action face wash. Daily skin care ke liye best.",
    diseases_treated: [
      "Acne / Pimples",
      "Blackheads",
      "Whiteheads",
      "Dull Skin",
      "Uneven Skin Texture",
      "Tanning",
      "Dead Skin",
      "Clogged Pores"
    ],
    symptoms_relief: [
      "Face pimples",
      "Blackheads on nose",
      "Dull face complexion",
      "Oily face",
      "Dry face patches",
      "Uneven skin tone",
      "Face tanning",
      "Dirty pores",
      "Rough skin texture"
    ],
    works_for: "Deep face cleansing, blackhead removal, scrubbing, dead skin removal, tan reduction, pimple control, pore cleaning, skin brightening, glow enhancement, aur daily face care ke liye effective hai.",
    target_conditions: [
      "Acne vulgaris",
      "Comedonal acne",
      "Hyperpigmentation",
      "Skin dullness",
      "Clogged pores"
    ],
    health_benefits: "Ye face wash deep clean karta hai, dead cells remove karta hai, blackheads aur whiteheads clear karta hai, tan gradually reduce karta hai, skin ko brighten karta hai, natural glow deta hai, aur skin texture smooth karta hai."
  }
};

// Process all products
products = products.map(product => {
  const title = product.title;
  const info = diseaseInfo[title] || {};
  
  // Remove unwanted fields
  delete product.usage;
  delete product.how_to_use;
  delete product.detailed_usage;
  delete product.dosage;
  delete product.video_url;
  delete product.video_thumbnail;
  
  // Add disease-focused fields
  return {
    ...product,
    
    // What the product is
    what_is_it: info.what_is_it || `${product.title} ek Ayurvedic health product hai jo natural herbs se bana hai.`,
    
    // Diseases and conditions
    diseases_treated: info.diseases_treated || [product.sub_category],
    
    // Symptoms it relieves
    symptoms_relief: info.symptoms_relief || product.benefits || [],
    
    // How it works
    works_for: info.works_for || "General wellness ke liye effective hai.",
    
    // Target health conditions
    target_conditions: info.target_conditions || [product.category],
    
    // Detailed health benefits
    health_benefits: info.health_benefits || product.description_en,
    
    // Medical categories (for filtering)
    medical_categories: info.diseases_treated || [],
    
    // Body parts affected
    body_parts_affected: getBodyParts(title, info.diseases_treated),
    
    // Treatment duration
    treatment_duration: "Regular use for 2-3 months recommended",
    
    // Effectiveness
    effectiveness: "100% natural Ayurvedic formula, no side effects",
    
    // When to see results
    when_to_expect_results: "2-4 weeks mein relief start, 2-3 months for full benefits",
    
    // Who can benefit
    who_can_benefit: info.what_is_it ? info.what_is_it.split("ke liye")[0] : "Adults seeking wellness",
    
    // Updated timestamp
    updated_at: new Date().toISOString(),
    focus: "disease_treatment"
  };
});

function getBodyParts(title, diseases) {
  const parts = [];
  if (title.includes("Hair")) parts.push("Hair", "Scalp");
  if (title.includes("Eye")) parts.push("Eyes");
  if (title.includes("Ear")) parts.push("Ears");
  if (title.includes("Joint") || title.includes("Ortho") || title.includes("Artho")) parts.push("Joints", "Bones", "Muscles");
  if (title.includes("Face") || title.includes("Skin") || title.includes("Soap")) parts.push("Skin", "Face");
  if (title.includes("Lady") || title.includes("Women")) parts.push("Reproductive System", "Hormonal System");
  if (title.includes("Pile") || title.includes("Acidity") || title.includes("Alkaline")) parts.push("Digestive System", "Stomach");
  if (title.includes("Diabo") || title.includes("Sugar")) parts.push("Pancreas", "Blood System");
  if (title.includes("Power") || title.includes("Energy")) parts.push("Muscles", "Cells", "Energy System");
  if (title.includes("Amrit") || title.includes("Immunity")) parts.push("Immune System", "Full Body");
  if (parts.length === 0) parts.push("Full Body", "General Health");
  return parts;
}

// Save
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log('💪 TAGADA UPDATE COMPLETE! 💪');
console.log(`✅ ${products.length} products updated with disease focus!`);
console.log('\n🚫 Removed Fields:');
console.log('   ✗ Usage instructions');
console.log('   ✗ Dosage information');
console.log('   ✗ Video URLs');
console.log('   ✗ How to use details');
console.log('\n✨ New Disease-Focused Fields Added:');
console.log('   ✓ what_is_it - Product kya hai');
console.log('   ✓ diseases_treated - Konsi bimari thik hoti hai');
console.log('   ✓ symptoms_relief - Kaunse symptoms door hote hain');
console.log('   ✓ works_for - Kis kaam aata hai');
console.log('   ✓ target_conditions - Target health issues');
console.log('   ✓ health_benefits - Health benefits explanation');
console.log('   ✓ body_parts_affected - Kaunse body parts par asar');
console.log('   ✓ treatment_duration - Kitne din mein asar');
console.log('   ✓ when_to_expect_results - Results kab milenge');
console.log('   ✓ who_can_benefit - Kis ko fayda hoga');
console.log('\n🎯 Now focused on: Diseases Treated & What Product Does!');
console.log('📁 File saved: products.json');
