// Error message translations for 12 Indian languages
const errorTranslations = {
  // English
  en: {
    'State and district required': 'State and district are required',
    'Invalid format. Use csv or pdf.': 'Invalid format. Please use CSV or PDF',
    'No data found for specified state/district': 'No data found for the specified state and district',
    'Failed to generate report': 'Failed to generate the report. Please try again',
    'Invalid state parameter': 'Invalid state parameter provided',
    'Invalid district parameter': 'Invalid district parameter provided',
    'Invalid date range': 'Invalid date range provided',
    'Too many requests from this IP, please try again later.': 'Too many requests. Please wait before trying again',
    'Internal server error': 'Internal server error. Please try again later',
    'Could not detect state from coordinates': 'Could not detect your state from the provided coordinates',
    'Could not detect district from coordinates': 'Could not detect your district from the provided coordinates'
  },
  
  // Hindi (ह‍ि)
  hi: {
    'State and district required': 'राज्य और जिला आवश्यक हैं',
    'Invalid format. Use csv or pdf.': 'अमान्य प्रारूप। कृपया CSV या PDF का उपयोग करें',
    'No data found for specified state/district': 'निर्दिष्ट राज्य और जिले के लिए कोई डेटा नहीं मिला',
    'Failed to generate report': 'रिपोर्ट जनरेट करने में विफल। कृपया फिर से प्रयास करें',
    'Invalid state parameter': 'अमान्य राज्य पैरामीटर प्रदान किया गया',
    'Invalid district parameter': 'अमान्य जिला पैरामीटर प्रदान किया गया',
    'Invalid date range': 'अमान्य तारीख सीमा प्रदान की गई',
    'Too many requests from this IP, please try again later.': 'बहुत अधिक अनुरोध। कृपया फिर से प्रयास करने से पहले प्रतीक्षा करें',
    'Internal server error': 'आंतरिक सर्वर त्रुटि। कृपया बाद में फिर से प्रयास करें',
    'Could not detect state from coordinates': 'प्रदान किए गए निर्देशांक से आपके राज्य का पता नहीं लगा सके',
    'Could not detect district from coordinates': 'प्रदान किए गए निर्देशांक से आपके जिले का पता नहीं लगा सके'
  },

  // Tamil (த‍மி‍ழ‍)
  ta: {
    'State and district required': 'மாநிலம் மற்றும் மாவட்டம் தேவை',
    'Invalid format. Use csv or pdf.': 'செல்லாத வடிவம். CSV அல்லது PDF ஐப் பயன்படுத்தவும்',
    'No data found for specified state/district': 'குறிப்பிட்ட மாநிலத்திற்கும் மாவட்டத்திற்கும் எந்த தரவும் கிடைக்கவில்லை',
    'Failed to generate report': 'அறிக்கை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்',
    'Invalid state parameter': 'செல்லாத மாநில அளவுரு வழங்கப்பட்டது',
    'Invalid district parameter': 'செல்லாத மாவட்ட அளவுரு வழங்கப்பட்டது',
    'Invalid date range': 'செல்லாத தேதி வரம்பு வழங்கப்பட்டது',
    'Too many requests from this IP, please try again later.': 'அதிக கோரிக்கைகள். மீண்டும் முயற்சிக்குமுன் காத்திருக்கவும்',
    'Internal server error': 'உள் சர்வர் பிழை. பின்னர் மீண்டும் முயற்சிக்கவும்',
    'Could not detect state from coordinates': 'வழங்கிய ஆயங்களிலிருந்து உங்கள் மாநிலத்தைக் கண்டுபிடிக்க முடியவில்லை',
    'Could not detect district from coordinates': 'வழங்கிய ஆயங்களிலிருந்து உங்கள் மாவட்டத்தைக் கண்டுபிடிக்க முடியவில்லை'
  },

  // Bengali (বাঙ্গালি)
  bn: {
    'State and district required': 'রাজ্য এবং জেলা প্রয়োজন',
    'Invalid format. Use csv or pdf.': 'অবৈধ বিন্যাস। CSV বা PDF ব্যবহার করুন',
    'No data found for specified state/district': 'নির্দিষ্ট রাজ্য এবং জেলার জন্য কোনও ডেটা পাওয়া যায়নি',
    'Failed to generate report': 'রিপোর্ট তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন',
    'Invalid state parameter': 'অবৈধ রাজ্য পরামিতি প্রদান করা হয়েছে',
    'Invalid district parameter': 'অবৈধ জেলা পরামিতি প্রদান করা হয়েছে',
    'Invalid date range': 'অবৈধ তারিখ পরিসীমা প্রদান করা হয়েছে',
    'Too many requests from this IP, please try again later.': 'অনেক বেশি অনুরোধ। পুনরায় চেষ্টা করার আগে অপেক্ষা করুন',
    'Internal server error': 'অভ্যন্তরীণ সার্ভার ত্রুটি। পরে আবার চেষ্টা করুন',
    'Could not detect state from coordinates': 'প্রদত্ত স্থানাঙ্ক থেকে আপনার রাজ্য সনাক্ত করতে পারেনি',
    'Could not detect district from coordinates': 'প্রদত্ত স্থানাঙ্ক থেকে আপনার জেলা সনাক্ত করতে পারেনি'
  },

  // Marathi (मराठी)
  mr: {
    'State and district required': 'राज्य आणि जिल्हा आवश्यक आहेत',
    'Invalid format. Use csv or pdf.': 'अमान्य स्वरूप. CSV किंवा PDF वापरा',
    'No data found for specified state/district': 'निर्दिष्ट राज्य आणि जिल्ह्यासाठी कोणताही डेटा आढळला नाही',
    'Failed to generate report': 'अहवाल तयार करण्यात अयशस्वी. पुन्हा प्रयत्न करा',
    'Invalid state parameter': 'अमान्य राज्य पॅरामीटर प्रदान केला गेला',
    'Invalid district parameter': 'अमान्य जिल्हा पॅरामीटर प्रदान केला गेला',
    'Invalid date range': 'अमान्य तारीख श्रेणी प्रदान केली गेली',
    'Too many requests from this IP, please try again later.': 'बर्‍यापैकी विनंत्या. पुन्हा प्रयत्न करण्यापूर्वी प्रतीक्षा करा',
    'Internal server error': 'अंतर्गत सर्व्हर त्रुटी. नंतर पुन्हा प्रयत्न करा',
    'Could not detect state from coordinates': 'दिलेल्या निर्देशांकांपासून आपले राज्य शोधू शकले नाही',
    'Could not detect district from coordinates': 'दिलेल्या निर्देशांकांपासून आपला जिल्हा शोधू शकले नाही'
  },

  // Gujarati (ગુજરાતી)
  gu: {
    'State and district required': 'રાજ્ય અને જિલ્લો આવશ્યક છે',
    'Invalid format. Use csv or pdf.': 'અમાન્ય ફોર્મેટ. CSV અથવા PDF નો ઉપયોગ કરો',
    'No data found for specified state/district': 'ચોક્કસ રાજ્ય અને જિલ્લા માટે કોઈ ડેટા મળ્યો નથી',
    'Failed to generate report': 'રિપોર્ટ જનરેટ કરવામાં નિષ્ફળ. ફરી પ્રયાસ કરો',
    'Invalid state parameter': 'અમાન્ય રાજ્ય પરિમાણ પ્રદાન કર્યું',
    'Invalid district parameter': 'અમાન્ય જિલ્લા પરિમાણ પ્રદાન કર્યું',
    'Invalid date range': 'અમાન્ય તારીખ શ્રેણી પ્રદાન કર્યું',
    'Too many requests from this IP, please try again later.': 'ઘણાં બધા વિનંતીઓ. ફરીથી પ્રયાસ કરતા પહેલા રાહ જુઓ',
    'Internal server error': 'આંતરિક સર્વર ભૂલ. પાછળથી ફરી પ્રયાસ કરો',
    'Could not detect state from coordinates': 'પ્રદાન કરેલા સંકલનથી તમારું રાજ્ય શોધી શક્યું નથી',
    'Could not detect district from coordinates': 'પ્રદાન કરેલા સંકલનથી તમારો જિલ્લો શોધી શક્યું નથી'
  },

  // Punjabi (ਪੰਜਾਬੀ)
  pa: {
    'State and district required': 'ਰਾਜ ਅਤੇ ਜਿਲ੍ਹਾ ਲਾਜ਼ਮੀ ਹਨ',
    'Invalid format. Use csv or pdf.': 'ਅਮਾਨਤ ਫ਼ਾਰਮੈਟ। CSV ਜਾਂ PDF ਦੀ ਵਰਤੋਂ ਕਰੋ',
    'No data found for specified state/district': 'ਨਿਰਧਾਰਤ ਰਾਜ ਅਤੇ ਜਿਲ੍ਹਾ ਲਈ ਕੋਈ ਡੇਟਾ ਨਹੀਂ ਮਿਲਿਆ',
    'Failed to generate report': 'ਰਿਪੋਰਟ ਬਣਾਉਣ ਵਿੱਚ ਅਸਫਲ। ਦੁਬਾਰਾ ਪ੍ਰਯਾਸ ਕਰੋ',
    'Invalid state parameter': 'ਅਮਾਨਤ ਰਾਜ ਪੈਰਾਮੀਟਰ ਪ੍ਰਦਾਨ ਕੀਤਾ ਗਿਆ',
    'Invalid district parameter': 'ਅਮਾਨਤ ਜਿਲ੍ਹਾ ਪੈਰਾਮੀਟਰ ਪ੍ਰਦਾਨ ਕੀਤਾ ਗਿਆ',
    'Invalid date range': 'ਅਮਾਨਤ ਤਾਰੀਖ ਰੇਂਜ ਪ੍ਰਦਾਨ ਕੀਤੀ ਗਈ',
    'Too many requests from this IP, please try again later.': 'ਬਹੁਤ ਸਾਰੀਆਂ ਬੇਨਤੀਆਂ। ਦੁਬਾਰਾ ਪ੍ਰਯਾਸ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇੰਤਜ਼ਾਰ ਕਰੋ',
    'Internal server error': 'ਅੰਦਰੂਨੀ ਸਰਵਰ ਗਲਤੀ। ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਪ੍ਰਯਾਸ ਕਰੋ',
    'Could not detect state from coordinates': 'ਪ੍ਰਦਾਨ ਕੀਤੇ ਨਿਰਦੇਸ਼ਾਂ ਤੋਂ ਤੁਹਾਡਾ ਰਾਜ ਖੋਜ ਨਹੀਂ ਸਕਿਆ',
    'Could not detect district from coordinates': 'ਪ੍ਰਦਾਨ ਕੀਤੇ ਨਿਰਦੇਸ਼ਾਂ ਤੋਂ ਤੁਹਾਡਾ ਜਿਲ੍ਹਾ ਖੋਜ ਨਹੀਂ ਸਕਿਆ'
  },

  // Telugu (తెలుగు)
  te: {
    'State and district required': 'రాష్ట్రం మరియు జిల్లా అవసరమైనవి',
    'Invalid format. Use csv or pdf.': 'చెల్లని ఫార్మాట్. CSV లేదా PDF ఉపయోగించండి',
    'No data found for specified state/district': 'పేర్కొన్న రాష్ట్రం మరియు జిల్లా కోసం ఎటువంటి డేటా కనుగొనబడలేదు',
    'Failed to generate report': 'రిపోర్ట్ ఉత్పత్తి చేయడం విఫలమైంది. మళ్లీ ప్రయత్నించండి',
    'Invalid state parameter': 'చెల్లని రాష్ట్ర పారామీటర్ అందించారు',
    'Invalid district parameter': 'చెల్లని జిల్లా పారామీటర్ అందించారు',
    'Invalid date range': 'చెల్లని తేదీ పరిధి అందించారు',
    'Too many requests from this IP, please try again later.': 'చాలా ఎక్కువ అభ్యర్థనలు. మరలా ప్రయత్నించే ముందు ఎదురుచూడండి',
    'Internal server error': 'అంతర్గత సర్వర్ ত్రుటి. తరువాత మళ్లీ ప్రయత్నించండి',
    'Could not detect state from coordinates': 'అందించిన కోఆర్డినేట్‌ల నుండి మీ రాష్ట్రాన్ని గుర్తించలేకపోయాను',
    'Could not detect district from coordinates': 'అందించిన కోఆర్డినేట్‌ల నుండి మీ జిల్లాను గుర్తించలేకపోయాను'
  },

  // Kannada (ಕನ್ನಡ)
  kn: {
    'State and district required': 'ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆ ಅಗತ್ಯ',
    'Invalid format. Use csv or pdf.': 'ಅಮಾನ್ಯ ಫಾರ್ಮ್ಯಾಟ್. CSV ಅಥವಾ PDF ಬಳಸಿ',
    'No data found for specified state/district': 'ನಿರ್ದಿಷ್ಟ ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಗೆ ಡೇಟಾ ಕಂಡುಬಂದಿಲ್ಲ',
    'Failed to generate report': 'ವರದಿ ರಚನೆ ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    'Invalid state parameter': 'ಅಮಾನ್ಯ ರಾಜ್ಯ ಪ್ರಾಚಲ ಒದಗಿಸಲಾಗಿದೆ',
    'Invalid district parameter': 'ಅಮಾನ್ಯ ಜಿಲ್ಲೆ ಪ್ರಾಚಲ ಒದಗಿಸಲಾಗಿದೆ',
    'Invalid date range': 'ಅಮಾನ್ಯ ದಿನಾಂಕ ಶ್ರೇಣಿ ಒದಗಿಸಲಾಗಿದೆ',
    'Too many requests from this IP, please try again later.': 'ಬಹಳ ಹೆಚ್ಚು ವಿನಂತಿಗಳು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸುವ ಮೊದಲು ಸ್ವಲ್ಪ ಸಮಯ ಹೊತ್ತಿಲಿ',
    'Internal server error': 'ಆಂತರಿಕ ಸರ್ವರ ದೋಷ. ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    'Could not detect state from coordinates': 'ಒದಗಿಸಿದ ನಿರ್ದೇಶಾಂಕಗಳಿಂದ ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ',
    'Could not detect district from coordinates': 'ಒದಗಿಸಿದ ನಿರ್ದೇಶಾಂಕಗಳಿಂದ ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ'
  },

  // Malayalam (മലയാളം)
  ml: {
    'State and district required': 'സംസ്ഥാനവും ജില്ലയും ആവശ്യമാണ്',
    'Invalid format. Use csv or pdf.': 'അസാധുവായ ഫോർമാറ്റ്. CSV അല്ലെങ്കിൽ PDF ഉപയോഗിക്കുക',
    'No data found for specified state/district': 'നിർദിഷ്ട സംസ്ഥാനത്തിനും ജില്ലയ്ക്കും ഡാറ്റ കണ്ടെത്തിയില്ല',
    'Failed to generate report': 'റിപ്പോർട്ട് സൃഷ്ടിക്കുന്നത് പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക',
    'Invalid state parameter': 'അസാധുവായ സംസ്ഥാന പരാമീറ്റർ നൽകി',
    'Invalid district parameter': 'അസാധുവായ ജില്ല പരാമീറ്റർ നൽകി',
    'Invalid date range': 'അസാധുവായ തീയതി പരിധി നൽകി',
    'Too many requests from this IP, please try again later.': 'വളരെ കൂടുതൽ അഭ്യർത്ഥനകൾ. വീണ്ടും ശ്രമിക്കുന്നതിന് മുമ്പ് കാത്തിരിക്കുക',
    'Internal server error': 'ആന്തരിക സേവകൻ പിശക്. പിന്നീട് വീണ്ടും ശ്രമിക്കുക',
    'Could not detect state from coordinates': 'നൽകിയ കോർഡിനേറ്റുകളിൽ നിന്ന് നിങ്ങളുടെ സംസ്ഥാനം കണ്ടെത്താൻ കഴിഞ്ഞില്ല',
    'Could not detect district from coordinates': 'നൽകിയ കോർഡിനേറ്റുകളിൽ നിന്ന് നിങ്ങളുടെ ജില്ല കണ്ടെത്താൻ കഴിഞ്ഞില്ല'
  },

  // Odia (ଓଡ଼ିଆ)
  or: {
    'State and district required': 'ରାଜ୍ୟ ଏବଂ ଜିଲ୍ଲା ଆବଶ୍ୟକ',
    'Invalid format. Use csv or pdf.': 'ଅବୈଧ ଫର୍ମାଟ। CSV କିମ୍ବା PDF ବ୍ୟବହାର କରନ୍ତୁ',
    'No data found for specified state/district': 'ନିର୍ଦ୍ଦିଷ୍ଟ ରାଜ୍ୟ ଏବଂ ଜିଲ୍ଲା ପାଇଁ କୋଠାବି ଡାଟା ମିଳିଲା ନାହିଁ',
    'Failed to generate report': 'ରିପୋର୍ଟ ତିଆରି ବିଫଳ ହେଲା। ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ',
    'Invalid state parameter': 'ଅବୈଧ ରାଜ୍ୟ ମାପଦଣ୍ଡ ଦିଆଗଲା',
    'Invalid district parameter': 'ଅବୈଧ ଜିଲ୍ଲା ମାପଦଣ୍ଡ ଦିଆଗଲା',
    'Invalid date range': 'ଅବୈଧ ତାରିଖ ପରିସୀମା ଦିଆଗଲା',
    'Too many requests from this IP, please try again later.': 'ବହୁତ ଅଧିକ ଅନୁରୋଧ। ପୁନର୍ବାର ଚେଷ୍ଟା କରିବା ପୂର୍ବରେ ଅପେକ୍ଷା କରନ୍ତୁ',
    'Internal server error': 'ଆଭ୍ୟନ୍ତରୀଣ ସାର୍ଭର ତ୍ରୁଟି। ପରେ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ',
    'Could not detect state from coordinates': 'ପ୍ରଦତ୍ତ ସମନ୍ୱୟ ସିଷ୍ଟମ ଠାରୁ ଆପଣଙ୍କ ରାଜ୍ୟ ଚିହ୍ନଟ କରିବାକୁ ପାରିଲେ ନାହିଁ',
    'Could not detect district from coordinates': 'ପ୍রଦତ୍ତ ସମନ୍ୱୟ ସିଷ୍ଟମ ଠାରୁ ଆପଣଙ୍କ ଜିଲ୍ଲା ଚିହ୍ନଟ କରିବାକୁ ପାରିଲେ ନାହିଁ'
  },

  // Urdu (اردو)
  ur: {
    'State and district required': 'ریاست اور ضلع ضروری ہیں',
    'Invalid format. Use csv or pdf.': 'غلط فارمیٹ۔ CSV یا PDF استعمال کریں',
    'No data found for specified state/district': 'مخصوص ریاست اور ضلع کے لیے کوئی ڈیٹا نہیں ملا',
    'Failed to generate report': 'رپورٹ تیار کرنے میں ناکامی۔ دوبارہ کوشش کریں',
    'Invalid state parameter': 'غلط ریاستی پیرامیٹر فراہم کیا گیا',
    'Invalid district parameter': 'غلط ضلع پیرامیٹر فراہم کیا گیا',
    'Invalid date range': 'غلط تاریخ کی رینج فراہم کی گئی',
    'Too many requests from this IP, please try again later.': 'بہت سی درخواستیں۔ دوبارہ کوشش کرنے سے پہلے انتظار کریں',
    'Internal server error': 'اندرونی سرور کی خرابی۔ بعد میں دوبارہ کوشش کریں',
    'Could not detect state from coordinates': 'فراہم کردہ نقاط سے آپ کی ریاست کا پتہ نہیں لگا سکے',
    'Could not detect district from coordinates': 'فراہم کردہ نقاط سے آپ کا ضلع کا پتہ نہیں لگا سکے'
  }
};

// Get translated error message
const getTranslatedError = (errorKey, language = 'en') => {
  const lang = language.toLowerCase() || 'en';
  
  // Return translated error or fallback to English
  return errorTranslations[lang]?.[errorKey] || 
         errorTranslations['en']?.[errorKey] || 
         errorKey;
};

// Get all supported languages
const getSupportedLanguages = () => {
  return Object.keys(errorTranslations);
};

// Add translation to error response
const translateErrorResponse = (errorMessage, language = 'en') => {
  const translatedMessage = getTranslatedError(errorMessage, language);
  return {
    error: translatedMessage,
    language: language,
    originalKey: errorMessage
  };
};

module.exports = {
  getTranslatedError,
  getSupportedLanguages,
  translateErrorResponse,
  errorTranslations
};