import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive translation resources for Indian regional languages
const resources = {
  // English
  en: {
    translation: {
      // Header
      'header.title': 'MGNREGA Performance Dashboard',
      'header.officialSite': 'Official Website',
      'header.language': 'Language',
      
      // Selection & Navigation
      'select.state': 'Select your state',
      'select.district': 'Select your district',
      'select.placeholder': 'Choose option',
      'nav.back': 'Back',
      'nav.home': 'Home',
      
      // Dashboard & Stats
      'dashboard.title': 'MGNREGA Performance Dashboard',
      'dashboard.loading': 'Loading data...',
      'dashboard.noData': 'No data available',
      'dashboard.error': 'Error loading dashboard',
      
      'stats.totalWorkers': 'Total Workers',
      'stats.expenditure': 'Total Expenditure',
      'stats.workdays': 'Work Days Generated',
      'stats.wages': 'Average Daily Wages',
      
      // Comparison
      'compare.title': 'Compare with other districts',
      'compare.tooltip': 'Compare Districts',
      'compare.noData': 'No comparison data',
      'compare.metric': 'Metric',
      'compare.value': 'Value',
      
      // Trends
      'trend.title': 'Monthly Trend',
      'trend.months': 'Last 12 Months',
      'trend.custom': 'Custom Date Range',
      'trend.loading': 'Loading trend data...',
      
      // Gender Distribution
      'gender.distribution': 'Gender Distribution',
      'gender.male': 'Male Workers',
      'gender.female': 'Female Workers',
      'gender.transgender': 'Transgender Workers',
      'gender.percentage': 'Percentage',
      
      // Project Categories
      'project.categories': 'Project Categories',
      'project.description': 'Project Description',
      'project.majorProjects': 'Major Project Categories',
      'project.ruralRoads': 'Rural Roads',
      'project.irrigation': 'Irrigation',
      'project.waterStructures': 'Water Structures',
      'project.otherProjects': 'Other Projects',
      'project.expenditure': 'Project Expenditure',
      
      // Project Details - Major Categories
      'project.ruralRoads.desc': 'Construction and maintenance of rural roads for better connectivity',
      'project.ruralRoads.focus': 'Focus: Infrastructure development in villages',
      'project.ruralRoads.impact': 'Enables market access and reduces isolation',
      
      'project.irrigation.desc': 'Development of irrigation structures for agricultural productivity',
      'project.irrigation.focus': 'Focus: Water resource management and crop productivity',
      'project.irrigation.impact': 'Increases agricultural output and farmer income',
      
      'project.waterStructures.desc': 'Construction of water harvesting and conservation structures',
      'project.waterStructures.focus': 'Focus: Water security and groundwater recharge',
      'project.waterStructures.impact': 'Improves water availability and sustainability',
      
      'project.agriculture.label': 'Agriculture & Allied Activities',
      'project.agriculture.desc': 'Promotion of agricultural practices and allied activities',
      'project.agriculture.focus': 'Focus: Rural economy strengthening',
      'project.agriculture.impact': 'Supports livelihood diversification',
      
      'project.categoryB.label': 'Category B Works',
      'project.categoryB.desc': 'Skilled works and semi-skilled work implementation',
      'project.categoryB.focus': 'Focus: Skill development and technical expertise',
      'project.categoryB.impact': 'Enhances worker skills and earning potential',
      
      'project.nrm.label': 'Natural Resource Management',
      'project.nrm.desc': 'Environmental conservation and resource management',
      'project.nrm.focus': 'Focus: Sustainability and environmental protection',
      'project.nrm.impact': 'Preserves natural resources for future generations',
      
      // Other Projects Details
      'project.otherDesc': 'Other Project Types',
      'project.otherDetails': 'Including public facilities, community infrastructure, and specialized projects',
      'project.sectorDiversity': 'Multi-sector approach ensures comprehensive rural development',
      
      // Location Detection
      'location.detect': 'Detect my location',
      'location.detecting': 'Detecting location...',
      'location.detected': 'Location detected successfully',
      'location.error': 'Could not detect location',
      'location.permission': 'Location permission denied',
      'location.notSupported': 'Geolocation not supported',
      
      // Actions
      'action.share': 'Share Dashboard',
      'action.download': 'Download Report',
      'action.help': 'Help',
      'action.export': 'Export Data',
      'action.print': 'Print',
      'action.apply': 'Apply',
      'action.cancel': 'Cancel',
      'action.search': 'Search',
      
      // Share options
      'share.title': 'Share Dashboard',
      'share.email': 'Share via Email',
      'share.link': 'Copy Link',
      'share.whatsapp': 'Share via WhatsApp',
      'share.copied': 'Link copied to clipboard',
      
      // Tooltips & Help
      'tooltip.totalWorkers': 'Total number of workers employed in MGNREGA',
      'tooltip.expenditure': 'Total amount spent on wages and materials',
      'tooltip.workdays': 'Total person-days of employment generated',
      'tooltip.wages': 'Average wage paid per worker per day',
      
      // Messages
      'message.success': 'Operation completed successfully',
      'message.error': 'An error occurred. Please try again.',
      'message.loading': 'Loading...',
      'message.noResults': 'No results found',
      
      // Date Range
      'date.startDate': 'Start Date',
      'date.endDate': 'End Date',
      'date.year': 'Year',
      'date.month': 'Month',
      
      // Buttons
      'btn.submit': 'Submit',
      'btn.close': 'Close',
      'btn.ok': 'OK',
      'btn.view': 'View',
      'btn.edit': 'Edit',
      'btn.delete': 'Delete',
      'btn.reset': 'Reset',
      'btn.refresh': 'Refresh'
    }
  },

  // Hindi (हिंदी)
  hi: {
    translation: {
      // Header
      'header.title': 'मनरेगा प्रदर्शन डैशबोर्ड',
      'header.officialSite': 'आधिकारिक वेबसाइट',
      'header.language': 'भाषा',
      
      // Selection & Navigation
      'select.state': 'अपना राज्य चुनें',
      'select.district': 'अपना जिला चुनें',
      'select.placeholder': 'विकल्प चुनें',
      'nav.back': 'पीछे',
      'nav.home': 'होम',
      
      // Dashboard & Stats
      'dashboard.title': 'मनरेगा प्रदर्शन डैशबोर्ड',
      'dashboard.loading': 'डेटा लोड हो रहा है...',
      'dashboard.noData': 'कोई डेटा उपलब्ध नहीं',
      'dashboard.error': 'डैशबोर्ड लोड करने में त्रुटि',
      
      'stats.totalWorkers': 'कुल श्रमिक',
      'stats.expenditure': 'कुल व्यय',
      'stats.workdays': 'उत्पन्न कार्य दिवस',
      'stats.wages': 'औसत दैनिक मजदूरी',
      
      // Comparison
      'compare.title': 'अन्य जिलों से तुलना करें',
      'compare.tooltip': 'जिलों की तुलना करें',
      'compare.noData': 'कोई तुलना डेटा नहीं',
      'compare.metric': 'मीट्रिक',
      'compare.value': 'मूल्य',
      
      // Trends
      'trend.title': 'मासिक प्रवृत्ति',
      'trend.months': 'पिछले 12 महीने',
      'trend.custom': 'कस्टम डेट रेंज',
      'trend.loading': 'प्रवृत्ति डेटा लोड हो रहा है...',
      
      // Gender Distribution
      'gender.distribution': 'लिंग वितरण',
      'gender.male': 'पुरुष श्रमिक',
      'gender.female': 'महिला श्रमिक',
      'gender.transgender': 'ट्रांसजेंडर श्रमिक',
      'gender.percentage': 'प्रतिशत',
      
      // Project Categories
      'project.categories': 'परियोजना श्रेणियां',
      'project.description': 'परियोजना विवरण',
      'project.majorProjects': 'प्रमुख परियोजना श्रेणियां',
      'project.ruralRoads': 'ग्रामीण सड़कें',
      'project.irrigation': 'सिंचाई',
      'project.waterStructures': 'जल संरचनाएं',
      'project.otherProjects': 'अन्य परियोजनाएं',
      'project.expenditure': 'परियोजना व्यय',
      
      // Project Details - Major Categories
      'project.ruralRoads.desc': 'बेहतर कनेक्टिविटी के लिए ग्रामीण सड़कों का निर्माण और रखरखाव',
      'project.ruralRoads.focus': 'फोकस: गांवों में बुनियादी ढांचे का विकास',
      'project.ruralRoads.impact': 'बाजार पहुंच सक्षम करता है और अलगाववादिता कम करता है',
      
      'project.irrigation.desc': 'कृषि उत्पादकता के लिए सिंचाई संरचनाओं का विकास',
      'project.irrigation.focus': 'फोकस: जल संसाधन प्रबंधन और फसल उत्पादकता',
      'project.irrigation.impact': 'कृषि उत्पादन और किसान आय में वृद्धि',
      
      'project.waterStructures.desc': 'जल संचयन और संरक्षण संरचनाओं का निर्माण',
      'project.waterStructures.focus': 'फोकस: जल सुरक्षा और भूजल पुनर्भरण',
      'project.waterStructures.impact': 'जल उपलब्धता और स्थिरता में सुधार',
      
      'project.agriculture.label': 'कृषि और संबंधित गतिविधियां',
      'project.agriculture.desc': 'कृषि प्रथाओं और संबंधित गतिविधियों का प्रचार',
      'project.agriculture.focus': 'फोकस: ग्रामीण अर्थव्यवस्था को मजबूत करना',
      'project.agriculture.impact': 'आजीविका विविधीकरण का समर्थन करता है',
      
      'project.categoryB.label': 'श्रेणी B कार्य',
      'project.categoryB.desc': 'कुशल कार्य और अर्ध-कुशल कार्य कार्यान्वयन',
      'project.categoryB.focus': 'फोकस: कौशल विकास और तकनीकी विशेषज्ञता',
      'project.categoryB.impact': 'कार्यकर्ता कौशल और आय क्षमता में वृद्धि',
      
      'project.nrm.label': 'प्राकृतिक संसाधन प्रबंधन',
      'project.nrm.desc': 'पर्यावरणीय संरक्षण और संसाधन प्रबंधन',
      'project.nrm.focus': 'फोकस: स्थिरता और पर्यावरण संरक्षण',
      'project.nrm.impact': 'भविष्य की पीढ़ियों के लिए प्राकृतिक संसाधनों को संरक्षित करता है',
      
      // Other Projects Details
      'project.otherDesc': 'अन्य परियोजना प्रकार',
      'project.otherDetails': 'सार्वजनिक सुविधाओं, सामुदायिक बुनियादी ढांचे और विशेष परियोजनाओं सहित',
      'project.sectorDiversity': 'बहु-क्षेत्रीय दृष्टिकोण व्यापक ग्रामीण विकास सुनिश्चित करता है',
      
      // Location Detection
      'location.detect': 'मेरा स्थान पता लगाएं',
      'location.detecting': 'स्थान का पता लगाया जा रहा है...',
      'location.detected': 'स्थान सफलतापूर्वक पता चल गया',
      'location.error': 'स्थान का पता नहीं लगा सका',
      'location.permission': 'स्थान अनुमति अस्वीकार कर दी गई',
      'location.notSupported': 'भू-स्थिति समर्थित नहीं है',
      
      // Actions
      'action.share': 'डैशबोर्ड साझा करें',
      'action.download': 'रिपोर्ट डाउनलोड करें',
      'action.help': 'मदद',
      'action.export': 'डेटा निर्यात करें',
      'action.print': 'प्रिंट करें',
      'action.apply': 'लागू करें',
      'action.cancel': 'रद्द करें',
      'action.search': 'खोज',
      
      // Share options
      'share.title': 'डैशबोर्ड साझा करें',
      'share.email': 'ईमेल के माध्यम से साझा करें',
      'share.link': 'लिंक कॉपी करें',
      'share.whatsapp': 'WhatsApp के माध्यम से साझा करें',
      'share.copied': 'लिंक क्लिपबोर्ड पर कॉपी किया गया',
      
      // Tooltips & Help
      'tooltip.totalWorkers': 'मनरेगा में नियुक्त श्रमिकों की कुल संख्या',
      'tooltip.expenditure': 'मजदूरी और सामग्री पर खर्च की गई कुल राशि',
      'tooltip.workdays': 'कुल उत्पन्न रोजगार दिवस',
      'tooltip.wages': 'प्रति श्रमिक प्रति दिन दी गई औसत मजदूरी',
      
      // Messages
      'message.success': 'ऑपरेशन सफलतापूर्वक पूर्ण हुआ',
      'message.error': 'एक त्रुटि हुई। कृपया फिर से प्रयास करें।',
      'message.loading': 'लोड हो रहा है...',
      'message.noResults': 'कोई परिणाम नहीं मिला',
      
      // Date Range
      'date.startDate': 'शुरुआत की तारीख',
      'date.endDate': 'समाप्ति की तारीख',
      'date.year': 'वर्ष',
      'date.month': 'महीना',
      
      // Buttons
      'btn.submit': 'जमा करें',
      'btn.close': 'बंद करें',
      'btn.ok': 'ठीक है',
      'btn.view': 'देखें',
      'btn.edit': 'संपादित करें',
      'btn.delete': 'हटाएं',
      'btn.reset': 'रीसेट करें',
      'btn.refresh': 'ताज़ा करें'
    }
  },

  // Marathi (मराठी)
  mr: {
    translation: {
      'header.title': 'मनरेगा कार्यप्रदर्शन डॅशबोर्ड',
      'header.officialSite': 'अधिकृत वेबसाइट',
      'header.language': 'भाषा',
      'select.state': 'आपले राज्य निवडा',
      'select.district': 'आपल्या जिल्ह्याची निवड करा',
      'select.placeholder': 'पर्याय निवडा',
      'nav.back': 'परत',
      'nav.home': 'होम',
      'dashboard.title': 'मनरेगा कार्यप्रदर्शन डॅशबोर्ड',
      'dashboard.loading': 'डेटा लोड होत आहे...',
      'dashboard.noData': 'कोणताही डेटा उपलब्ध नाही',
      'dashboard.error': 'डॅशबोर्ड लोड करताना त्रुटी',
      'stats.totalWorkers': 'एकूण कामगार',
      'stats.expenditure': 'एकूण व्यय',
      'stats.workdays': 'निर्माण केलेले कार्य दिवस',
      'stats.wages': 'सरासरी दैनिक मजूरी',
      'compare.title': 'इतर जिल्ह्यांशी तुलना करा',
      'compare.tooltip': 'जिल्ह्यांची तुलना करा',
      'compare.noData': 'कोणताही तुलना डेटा नाही',
      'trend.title': 'मासिक ट्रेंड',
      'trend.months': 'गेले 12 महिने',
      'gender.distribution': 'लिंग वितरण',
      'gender.male': 'पुरुष कामगार',
      'gender.female': 'महिला कामगार',
      'gender.transgender': 'ट्रांसजेंडर कामगार',
      'project.categories': 'प्रकल्प श्रेणी',
      'project.description': 'प्रकल्प विवरण',
      'project.majorProjects': 'मुख्य प्रकल्प श्रेणी',
      'project.ruralRoads': 'ग्रामीण रस्त्या',
      'project.irrigation': 'सिंचन',
      'project.waterStructures': 'जल संरचना',
      'project.otherProjects': 'इतर प्रकल्प',
      'project.expenditure': 'प्रकल्प व्यय',
      
      // Project Details - Major Categories
      'project.ruralRoads.desc': 'ग्रामीण रस्त्यांचे बांधकाम आणि रखरखाव',
      'project.ruralRoads.focus': 'लक्ष्य: गावांमध्ये अवसंरचना विकास',
      'project.ruralRoads.impact': 'बाजारपेठेत प्रवेश सुलभ करते आणि अलगावा कमी करते',
      
      'project.irrigation.desc': 'कृषी उत्पादकता साठी सिंचन संरचनांचा विकास',
      'project.irrigation.focus': 'लक्ष्य: जल संसाधन व्यवस्थापन',
      'project.irrigation.impact': 'कृषी उत्पादन व शेतकरी उत्पन्नात वाढ',
      
      'project.waterStructures.desc': 'जलसंचय व संरक्षण संरचना बांधकाम',
      'project.waterStructures.focus': 'लक्ष्य: जल सुरक्षा आणि भूजल पुनर्भरण',
      'project.waterStructures.impact': 'जल उपलब्धता व टिकाऊपणा सुधार',
      
      'project.agriculture.label': 'कृषी व संबंधित क्रियाकलाप',
      'project.agriculture.desc': 'कृषी पद्धती व संबंधित क्रियाकलापांचा प्रचार',
      'project.agriculture.focus': 'लक्ष्य: ग्रामीण अर्थव्यवस्था मजबूत करणे',
      'project.agriculture.impact': 'जीविकोपार्जन विविधीकरण समर्थन',
      
      'project.categoryB.label': 'श्रेणी B कार्य',
      'project.categoryB.desc': 'कुशल कार्य व अर्ध-कुशल कार्य क्रियान्वयन',
      'project.categoryB.focus': 'लक्ष्य: कौशल्य विकास',
      'project.categoryB.impact': 'कामगारांचे कौशल्य व उत्पन्न क्षमता वाढवणे',
      
      'project.nrm.label': 'नैसर्गिक संसाधन व्यवस्थापन',
      'project.nrm.desc': 'पर्यावरण संरक्षण व संसाधन व्यवस्थापन',
      'project.nrm.focus': 'लक्ष्य: स्थिरता व पर्यावरण संरक्षण',
      'project.nrm.impact': 'भविष्य पीढीसाठी नैसर्गिक संसाधन संरक्षण',
      
      // Other Projects Details
      'project.otherDesc': 'इतर प्रकल्प प्रकार',
      'project.otherDetails': 'सार्वजनिक सुविधा, सामाजिक अवसंरचना व विशेष प्रकल्पांसह',
      'project.sectorDiversity': 'बहु-क्षेत्र दृष्टिकोन संपूर्ण ग्रामीण विकास सुनिश्चित करते',
      
      'location.detect': 'माझे स्थान शोधा',
      'location.detecting': 'स्थान शोधत आहे...',
      'action.share': 'डॅशबोर्ड सामायिक करा',
      'action.download': 'अहवाल डाउनलोड करा',
      'action.help': 'मदत',
      'btn.submit': 'सादर करा',
      'btn.close': 'बंद करा',
      'message.success': 'ऑपरेशन यशस्वी झाले',
      'message.error': 'त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.'
    }
  },

  // Telugu (తెలుగు)
  te: {
    translation: {
      'header.title': 'మన్‌రేగా పనితీరు డ్యాష్‌బోర్డ్',
      'header.officialSite': 'అధికారిక వెబ్‌సైట్',
      'header.language': 'భాష',
      'select.state': 'మీ రాష్ట్రం ఎంచుకోండి',
      'select.district': 'మీ జిల్లా ఎంచుకోండి',
      'select.placeholder': 'ఎంపికను ఎంచుకోండి',
      'nav.back': 'వెనక్కి',
      'nav.home': 'హోమ్',
      'dashboard.title': 'మన్‌రేగా పనితీరు డ్యాష్‌బోర్డ్',
      'dashboard.loading': 'డేటా లోడ్ అవుతోంది...',
      'dashboard.noData': 'ఎటువంటి డేటా లేదు',
      'dashboard.error': 'డ్యాష్‌బోర్డ్ లోడ్ చేయడంలో లోపం',
      'stats.totalWorkers': 'మొత్తం కార్మికులు',
      'stats.expenditure': 'మొత్తం ఖర్చు',
      'stats.workdays': 'ఉత్పత్తి చేయిన కార్యదినాలు',
      'stats.wages': 'సగటు రోజువారీ వేతనం',
      'compare.title': 'ఇతర జిల్లాలతో పోల్చండి',
      'compare.tooltip': 'జిల్లాలను పోల్చండి',
      'compare.noData': 'పోల్చిన డేటా లేదు',
      'trend.title': 'నెలవారీ ధోరణి',
      'trend.months': 'గత 12 నెలలు',
      'gender.distribution': 'లింగ వితరణ',
      'gender.male': 'పురుష కార్మికులు',
      'gender.female': 'స్త్రీ కార్మికులు',
      'gender.transgender': 'ట్రాన్స్‌జెండర్ కార్మికులు',
      'project.categories': 'ప్రాజెక్ట్ వర్గాలు',
      'project.ruralRoads': 'గ్రామీణ రహదారులు',
      'project.irrigation': 'సేద',
      'project.waterStructures': 'నీటి నిర్మాణాలు',
      'location.detect': 'నా ప్రదేశం గుర్తించండి',
      'location.detecting': 'ప్రదేశం గుర్తించుతోంది...',
      'action.share': 'డ్యాష్‌బోర్డ్ భాగస్వామ్యం చేయండి',
      'action.download': 'నివేదికను డౌన్‌లోడ్ చేయండి',
      'action.help': 'సహాయం',
      'btn.submit': 'సమర్పించండి',
      'btn.close': 'మూసివేయండి',
      'message.success': 'ఆపరేషన్ విజయవంతమైంది',
      'message.error': 'ఒక లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
    }
  },

  // Tamil (தமிழ்)
  ta: {
    translation: {
      'header.title': 'மனரேகா செயல்திறன் டேஷ்போர்டு',
      'header.officialSite': 'அதிகாரப்பூர்வ வெப்சைட்',
      'header.language': 'மொழி',
      'select.state': 'உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
      'select.district': 'உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
      'select.placeholder': 'விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
      'nav.back': 'திரும்பவும்',
      'nav.home': 'முகப்பு',
      'dashboard.title': 'மனரேகா செயல்திறன் டேஷ்போர்டு',
      'dashboard.loading': 'தரவு ஏற்றப்படுகிறது...',
      'dashboard.noData': 'தரவு இல்லை',
      'dashboard.error': 'டேஷ்போர்டு ஏற்ற பிழை',
      'stats.totalWorkers': 'மொத்த தொழிலாளர்கள்',
      'stats.expenditure': 'மொத்த செலவு',
      'stats.workdays': 'உত்பத்தி செய்யப்பட்ட வேலைநாட்கள்',
      'stats.wages': 'சராசரி நாளிய ஊதியம்',
      'compare.title': 'மற்ற மாவட்டங்களுடன் ஒப்பிடுக',
      'compare.tooltip': 'மாவட்டங்களை ஒப்பிடுக',
      'compare.noData': 'ஒப்பீட்டு தரவு இல்லை',
      'trend.title': 'மாதாந்திர போக்கு',
      'trend.months': 'கடந்த 12 மாதங்கள்',
      'gender.distribution': 'பாலியல் விநியோகம்',
      'gender.male': 'ஆண் தொழிலாளர்கள்',
      'gender.female': 'பெண் தொழிலாளர்கள்',
      'gender.transgender': 'திருநங்கை தொழிலாளர்கள்',
      'project.categories': 'திட்ட வகைகள்',
      'project.ruralRoads': 'கிராமப்புற சாலைகள்',
      'project.irrigation': 'பாசனம்',
      'project.waterStructures': 'நீர் கட்டமைப்புகள்',
      'location.detect': 'என் இடத்தைக் கண்டறியவும்',
      'location.detecting': 'இடத்தைக் கண்டறிகிறது...',
      'action.share': 'டேஷ்போர்டைப் பகிரவும்',
      'action.download': 'அறிக்கையைப் பதிவிறக்கவும்',
      'action.help': 'உதவி',
      'btn.submit': 'சமர்ப்பிக்கவும்',
      'btn.close': 'மூடுக',
      'message.success': 'செயல்பாடு வெற்றிகரமாக முடிந்தது',
      'message.error': 'ஒரு பிழை ஏற்பட்டது. தயவு செய்து மீண்டும் முயற்சி செய்யவும்.'
    }
  },

  // Kannada (ಕನ್ನಡ)
  kn: {
    translation: {
      'header.title': 'ಮನರೇಗ ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      'header.officialSite': 'ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್',
      'header.language': 'ಭಾಷೆ',
      'select.state': 'ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      'select.district': 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      'select.placeholder': 'ಆಯ್ಕೆ ಆರಿಸಿ',
      'nav.back': 'ಹಿಂದಕ್ಕೆ',
      'nav.home': 'ಮುಖಪೃಷ್ಠ',
      'dashboard.title': 'ಮನರೇಗ ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      'dashboard.loading': 'ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      'dashboard.noData': 'ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ',
      'dashboard.error': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಲೋಡ್ ಮಾಡುವ ದೋಷ',
      'stats.totalWorkers': 'ಒಟ್ಟು ಕಾರ್ಮಿಕರು',
      'stats.expenditure': 'ಒಟ್ಟು ವೆಚ್ಚ',
      'stats.workdays': 'ರಚಿಸಿದ ಕೆಲಸದ ದಿನಗಳು',
      'stats.wages': 'ಸರಾಸರಿ ದೈನಿಕ ವೇತನ',
      'compare.title': 'ಇತರ ಜಿಲ್ಲೆಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ',
      'compare.tooltip': 'ಜಿಲ್ಲೆಗಳನ್ನು ಹೋಲಿಸಿ',
      'compare.noData': 'ಹೋಲಿಕೆ ಡೇಟಾ ನಿಠಿ',
      'trend.title': 'ತಾಂತ್ರಿಕ ಪ್ರವೃತ್ತಿ',
      'trend.months': 'ಕೊನೆಯ 12 ತಿಂಗಳುಗಳು',
      'gender.distribution': 'ಲೈಂಗಿಕ ವಿತರಣೆ',
      'gender.male': 'ಪುರುಷ ಕಾರ್ಮಿಕರು',
      'gender.female': 'ಮಹಿಳೆ ಕಾರ್ಮಿಕರು',
      'gender.transgender': 'ಟ್ರಾನ್ಸ್‌ಜೆಂಡರ್ ಕಾರ್ಮಿಕರು',
      'project.categories': 'ಯೋಜನೆ ವರ್ಗಗಳು',
      'project.ruralRoads': 'ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳು',
      'project.irrigation': 'ನೀರಿನ ನಿರ್ವಹಣೆ',
      'project.waterStructures': 'ನೀರಿನ ರಚನೆಗಳು',
      'location.detect': 'ನನ್ನ ಸ್ಥಳವನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ',
      'location.detecting': 'ಸ್ಥಳವನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತಿದೆ...',
      'action.share': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಹಂಚಿಕೊಳ್ಳಿ',
      'action.download': 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      'action.help': 'ಸಹಾಯ',
      'btn.submit': 'ಸಲ್ಲಿಸಿ',
      'btn.close': 'ಮುಚ್ಚಿ',
      'message.success': 'ಕಾರ್ಯಾಚರಣೆ ಯಶಸ್ವೀ',
      'message.error': 'ಒಂದು ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
    }
  },

  // Gujarati (ગુજરાતી)
  gu: {
    translation: {
      'header.title': 'મનરેગા કામગીરી ડેશબોર્ડ',
      'header.officialSite': 'સત્તાવાર વેબસાઇટ',
      'header.language': 'ભાષા',
      'select.state': 'તમારા રાજ્યને પસંદ કરો',
      'select.district': 'તમારા જિલ્લાને પસંદ કરો',
      'select.placeholder': 'વિકલ્પ પસંદ કરો',
      'nav.back': 'પાછળ',
      'nav.home': 'ઘર',
      'dashboard.title': 'મનરેગા કામગીરી ડેશબોર્ડ',
      'dashboard.loading': 'ડેટા લોડ થઇ રહ્યો છે...',
      'dashboard.noData': 'કોઇ ડેટા ઉપલબ્ધ નથી',
      'dashboard.error': 'ડેશબોર્ડ લોડ કરવામાં ભૂલ',
      'stats.totalWorkers': 'કુલ કર્મચારીઓ',
      'stats.expenditure': 'કુલ ખર્ચ',
      'stats.workdays': 'તૈયાર કરેલ કર્મદિવસો',
      'stats.wages': 'સરેરાશ દૈનિક વેતન',
      'compare.title': 'અન્ય જિલ્લાઓ સાથે સરખામણી કરો',
      'compare.tooltip': 'જિલ્લાઓની તુલના કરો',
      'compare.noData': 'તુલનાત્મક ડેટા નથી',
      'trend.title': 'માસિક વલણ',
      'trend.months': 'છેલ્લા 12 મહિનાઓ',
      'gender.distribution': 'જાતિ વિતરણ',
      'gender.male': 'પુરુષ કર્મચારીઓ',
      'gender.female': 'મહિલા કર્મચારીઓ',
      'gender.transgender': 'ટ્રાન્સજેન્ડર કર્મચારીઓ',
      'project.categories': 'પ્રોજેક્ટ શ્રેણીઓ',
      'project.ruralRoads': 'ગ્રામીણ રસ્તાઓ',
      'project.irrigation': 'સિંચાઇ',
      'project.waterStructures': 'જળ માળખા',
      'location.detect': 'મારું સ્થાન શોધો',
      'location.detecting': 'સ્થાન શોધી રહ્યા છીએ...',
      'action.share': 'ડેશબોર્ડ શેર કરો',
      'action.download': 'અહેવાલ ડાઉનલોડ કરો',
      'action.help': 'મદદ',
      'btn.submit': 'સમર્પિત કરો',
      'btn.close': 'બંધ કરો',
      'message.success': 'કામગીરી સફળતાપૂર્વક પૂર્ણ થઇ',
      'message.error': 'એક ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.'
    }
  },

  // Bengali (বাংলা)
  bn: {
    translation: {
      'header.title': 'মনরেগা কর্মক্ষমতা ড্যাশবোর্ড',
      'header.officialSite': 'অফিসিয়াল ওয়েবসাইট',
      'header.language': 'ভাষা',
      'select.state': 'আপনার রাজ্য নির্বাচন করুন',
      'select.district': 'আপনার জেলা নির্বাচন করুন',
      'select.placeholder': 'বিকল্প নির্বাচন করুন',
      'nav.back': 'ফিরে যান',
      'nav.home': 'বাড়ি',
      'dashboard.title': 'মনরেগা কর্মক্ষমতা ড্যাশবোর্ড',
      'dashboard.loading': 'ডেটা লোড হচ্ছে...',
      'dashboard.noData': 'কোন ডেটা উপলব্ধ নয়',
      'dashboard.error': 'ড্যাশবোর্ড লোড করতে ত্রুটি',
      'stats.totalWorkers': 'মোট শ্রমিক',
      'stats.expenditure': 'মোট ব্যয়',
      'stats.workdays': 'তৈরি কর্মদিবস',
      'stats.wages': 'গড় দৈনিক মজুরি',
      'compare.title': 'অন্যান্য জেলার সাথে তুলনা করুন',
      'compare.tooltip': 'জেলা তুলনা করুন',
      'compare.noData': 'তুলনামূলক ডেটা নেই',
      'trend.title': 'মাসিক প্রবণতা',
      'trend.months': 'গত ১২ মাস',
      'gender.distribution': 'লিঙ্গ বিতরণ',
      'gender.male': 'পুরুষ শ্রমিক',
      'gender.female': 'মহিলা শ্রমিক',
      'gender.transgender': 'ট্রান্সজেন্ডার শ্রমিক',
      'project.categories': 'প্রকল্প বিভাগ',
      'project.ruralRoads': 'গ্রামীণ সড়ক',
      'project.irrigation': 'সেচ',
      'project.waterStructures': 'জল কাঠামো',
      'location.detect': 'আমার অবস্থান খুঁজুন',
      'location.detecting': 'অবস্থান খুঁজছেন...',
      'action.share': 'ড্যাশবোর্ড শেয়ার করুন',
      'action.download': 'প্রতিবেদন ডাউনলোড করুন',
      'action.help': 'সহায়তা',
      'btn.submit': 'জমা দিন',
      'btn.close': 'বন্ধ করুন',
      'message.success': 'অপারেশন সফলভাবে সম্পন্ন হয়েছে',
      'message.error': 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
    }
  },

  // Punjabi (ਪੰਜਾਬੀ)
  pa: {
    translation: {
      'header.title': 'ਮਨਰੇਗਾ ਪ੍ਰਦਰਸ਼ਨ ਡੈਸ਼ਬੋਰਡ',
      'header.officialSite': 'ਅਧਿਕਾਰਤ ਵੈਬਸਾਈਟ',
      'header.language': 'ਭਾਸ਼ਾ',
      'select.state': 'ਆਪਣਾ ਸੂਬਾ ਚੁਣੋ',
      'select.district': 'ਆਪਣਾ ਜ਼ਿਲਾ ਚੁਣੋ',
      'select.placeholder': 'ਵਿਕਲਪ ਚੁਣੋ',
      'nav.back': 'ਵਾਪਸ',
      'nav.home': 'ਘਰ',
      'dashboard.title': 'ਮਨਰੇਗਾ ਪ੍ਰਦਰਸ਼ਨ ਡੈਸ਼ਬੋਰਡ',
      'dashboard.loading': 'ਡਾਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      'dashboard.noData': 'ਕੋਈ ਡਾਟਾ ਉਪਲਬਧ ਨਹੀਂ',
      'dashboard.error': 'ਡੈਸ਼ਬੋਰਡ ਲੋਡ ਕਰਨ ਵਿੱਚ ਗਲਤੀ',
      'stats.totalWorkers': 'ਕੁਲ ਮਜਦੂਰ',
      'stats.expenditure': 'ਕੁਲ ਖਰਚ',
      'stats.workdays': 'ਤਿਆਰ ਕੀਤੇ ਕੰਮ ਦਿਨ',
      'stats.wages': 'ਔਸਤ ਰੋਜ਼ਾਨਾ ਮਜ਼ਦੂਰੀ',
      'compare.title': 'ਦੂਸਰੇ ਜ਼ਿਲਿਆਂ ਨਾਲ ਤੁਲਨਾ ਕਰੋ',
      'compare.tooltip': 'ਜ਼ਿਲ੍ਹਿਆਂ ਦੀ ਤੁਲਨਾ ਕਰੋ',
      'compare.noData': 'ਕੋਈ ਤੁਲਨਾ ਡਾਟਾ ਨਹੀਂ',
      'trend.title': 'ਮਾਸਿਕ ਰੁਝਾਨ',
      'trend.months': 'ਪਿਛਲੇ 12 ਮਹੀਨੇ',
      'gender.distribution': 'ਲਿੰਗ ਵੰਡ',
      'gender.male': 'ਮਰਦ ਮਜਦੂਰ',
      'gender.female': 'ਔਰਤ ਮਜਦੂਰ',
      'gender.transgender': 'ਟ੍ਰਾਨਸਜੈਂਡਰ ਮਜਦੂਰ',
      'project.categories': 'ਪ੍ਰੋਜ਼ੈਕਟ ਸ਼੍ਰੇਣੀਆਂ',
      'project.ruralRoads': 'ਪਿੰਡ ਸੜਕਾਂ',
      'project.irrigation': 'ਸਿੰਚਾਈ',
      'project.waterStructures': 'ਪਾਣੀ ਦੇ ਢਾਂਚੇ',
      'location.detect': 'ਮੇਰੀ ਥਾਂ ਲੱਭੋ',
      'location.detecting': 'ਥਾਂ ਲੱਭ ਰਹੇ ਹੋ...',
      'action.share': 'ਡੈਸ਼ਬੋਰਡ ਸਾਂਝਾ ਕਰੋ',
      'action.download': 'ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ',
      'action.help': 'ਮਦਦ',
      'btn.submit': 'ਜਮ਼ਾ ਕਰੋ',
      'btn.close': 'ਬੰਦ ਕਰੋ',
      'message.success': 'ਓਪਰੇਸ਼ਨ ਸਫਲਤਾ ਨਾਲ ਪੂਰਾ ਹੋਇਆ',
      'message.error': 'ਇੱਕ ਗਲਤੀ ਆ ਗਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
    }
  },

  // Odia (ଓଡ଼ିଆ)
  or: {
    translation: {
      'header.title': 'ମନରେଗା କାର୍ଯ୍ୟକାରିତା ଡ୍ୟାସବୋର୍ଡ',
      'header.officialSite': 'ସରକାରୀ ୱେବସାଇଟ',
      'header.language': 'ଭାଷା',
      'select.state': 'ଆପଣଙ୍କ ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ',
      'select.district': 'ଆପଣଙ୍କ ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ',
      'select.placeholder': 'ବିକଳ୍ପ ବାଛନ୍ତୁ',
      'nav.back': 'ପଛକୁ',
      'nav.home': 'ଘର',
      'dashboard.title': 'ମନରେଗା କାର୍ଯ୍ୟକାରିତା ଡ୍ୟାସବୋର୍ଡ',
      'dashboard.loading': 'ଡାଟା ଲୋଡ ହୋଇଛି...',
      'dashboard.noData': 'କୋନ ଡାଟା ନାହିଁ',
      'dashboard.error': 'ଡ୍ୟାସବୋର୍ଡ ଲୋଡ ତ୍ରୁଟି',
      'stats.totalWorkers': 'ମୋଟ ଶ୍ରମିକ',
      'stats.expenditure': 'ମୋଟ ଖର୍ଚ୍ଚ',
      'stats.workdays': 'ଉତ୍ପାଦିତ ଯୋଗାଯୋଗ ଦିନ',
      'stats.wages': 'ସାଧାରଣ ଦୈନିକ ବେତନ',
      'compare.title': 'ଅନ୍ୟ ଜିଲ୍ଲା ସହ ତୁଳନା କରନ୍ତୁ',
      'compare.tooltip': 'ଜିଲ୍ଲା ତୁଳନା ଶୀର୍ଷ',
      'compare.noData': 'ତୁଳନା ଡାଟା ନାହିଁ',
      'trend.title': 'ମାସିକ ପ୍ରବୃତ୍ତି',
      'trend.months': 'ଗତ 12 ମାସ',
      'gender.distribution': 'ଲିଙ୍ଗ ବିତରଣ',
      'gender.male': 'ପୁରୁଷ ଶ୍ରମିକ',
      'gender.female': 'ମହିଳା ଶ୍ରମିକ',
      'gender.transgender': 'ଟ୍ରାନ୍ସଜେଣ୍ଡର ଶ୍ରମିକ',
      'project.categories': 'ପ୍ରକଳ୍ପ ବର୍ଗ',
      'project.ruralRoads': 'ଗ୍ରାମୀଣ ରାସ୍ତା',
      'project.irrigation': 'ଜଳସେଚନ',
      'project.waterStructures': 'ଜଳ ସଂରଚନା',
      'location.detect': 'ମୋ ସ୍ଥାନ ଖୋଜ',
      'location.detecting': 'ସ୍ଥାନ ଖୋଜ ଜାରି...',
      'action.share': 'ଡ୍ୟାସବୋର୍ଡ ଅଂଶୀଦାର',
      'action.download': 'ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ ଯୋଗ୍ୟ',
      'action.help': 'ସାହାଯ୍ୟ',
      'btn.submit': 'ଜମା',
      'btn.close': 'ବନ୍ଦ କରନ୍ତୁ',
      'message.success': 'ଅପରେସନ ସଫଳ ହୋଇଛି',
      'message.error': 'ଏକ ତ୍ରୁଟି ଘଟିଛି। ଦୟକରି ପୁନରାବୃତ୍ତି ଶୀର୍ଷକ ଶୀର୍ଷକ ଶୀର୍ଷକ'
    }
  },

  // Malayalam (മലയാളം)
  ml: {
    translation: {
      'header.title': 'മനരേഗ പ്രകടന ഡാഷ്‌ബോര്‍ഡ്',
      'header.officialSite': 'ഔദ്യോഗിക വെബ്‌സൈറ്റ്',
      'header.language': 'ഭാഷ',
      'select.state': 'നിങ്ങളുടെ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
      'select.district': 'നിങ്ങളുടെ ജില്ല തിരഞ്ഞെടുക്കുക',
      'select.placeholder': 'ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക',
      'nav.back': 'പിന്നോട്ടുപോകുക',
      'nav.home': 'വീട്',
      'dashboard.title': 'മനരേഗ പ്രകടന ഡാഷ്‌ബോര്‍ഡ്',
      'dashboard.loading': 'ഡാറ്റ നിലവിലാക്കുന്നു...',
      'dashboard.noData': 'ഡാറ്റ ലഭ്യമല്ല',
      'dashboard.error': 'ഡാഷ്‌ബോര്‍ഡ് നിലവിലാക്കുന്നതിൽ പിഴവ്',
      'stats.totalWorkers': 'മൊത്തം തൊഴിലാളികൾ',
      'stats.expenditure': 'മൊത്തം ചെലവ്',
      'stats.workdays': 'സൃഷ്ടിയായ പ്രവൃത്തി ദിനങ്ങൾ',
      'stats.wages': 'ശരാശരി ദൈനിക വേതനം',
      'compare.title': 'മറ്റ് ജില്ലകളുമായി താരതമ്യം ചെയ്യുക',
      'compare.tooltip': 'ജില്ലകൾ താരതമ്യം ചെയ്യുക',
      'compare.noData': 'താരതമ്യ ഡാറ്റ ഇല്ല',
      'trend.title': 'പ്രതിമാസ പ്രവണത',
      'trend.months': 'കഴിഞ്ഞ 12 മാസം',
      'gender.distribution': 'ലിംഗ വിതരണം',
      'gender.male': 'പുരുഷ തൊഴിലാളികൾ',
      'gender.female': 'സ്ത്രീ തൊഴിലാളികൾ',
      'gender.transgender': 'ട്രാൻസ്‌ജെൻഡർ തൊഴിലാളികൾ',
      'project.categories': 'പദ്ധതി വിഭാഗങ്ങൾ',
      'project.ruralRoads': 'ഗ്രാമീണ റോഡുകൾ',
      'project.irrigation': 'നീരാവാഹികൾ',
      'project.waterStructures': 'ജല ഘടനകൾ',
      'location.detect': 'എന്റെ സ്ഥാനം കണ്ടെത്തുക',
      'location.detecting': 'സ്ഥാനം കണ്ടെത്തുന്നു...',
      'action.share': 'ഡാഷ്‌ബോര്‍ഡ് പങ്കിടുക',
      'action.download': 'റിപ്പോര്‍ട്ട് ഡൗണ്‍ലോഡ് ചെയ്യുക',
      'action.help': 'സഹായം',
      'btn.submit': 'സമര്‍പ്പിക്കുക',
      'btn.close': 'അടയ്‌ക്കുക',
      'message.success': 'പ്രവര്‍ത്തനം വിജയകരമായി പൂര്‍ത്തിയായി',
      'message.error': 'ഒരു പിഴവ് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
    }
  },

  // Assamese (অসমীয়া)
  as: {
    translation: {
      'header.title': 'মনৰেগা কাৰ্যক্ষমতা ড্যাশবোর্ড',
      'header.officialSite': 'অফিচিয়াল ৱেবছাইট',
      'header.language': 'ভাষা',
      'select.state': 'আপোনাৰ ৰাজ্য বাছি লওক',
      'select.district': 'আপোনাৰ জিলা বাছি লওক',
      'select.placeholder': 'বিকল্প বাছি লওক',
      'nav.back': 'পিছিয়ে যাওক',
      'nav.home': 'ঘৰ',
      'dashboard.title': 'মনৰেগা কাৰ্যক্ষমতা ড্যাশবোর্ড',
      'dashboard.loading': 'ডেটা লোড হৈ আছে...',
      'dashboard.noData': 'কোনো ডেটা উপলব্ধ নাই',
      'dashboard.error': 'ড্যাশবোর্ড লোড কৰোঁতে ত্ৰুটি',
      'stats.totalWorkers': 'মুঠ শ্ৰমিক',
      'stats.expenditure': 'মুঠ ব্যয়',
      'stats.workdays': 'সৃষ্টি কৰা কাৰ্যদিন',
      'stats.wages': 'গড় দৈনিক মজুৰি',
      'compare.title': 'অন্যান্য জিলাৰ সৈতে তুলনা কৰক',
      'compare.tooltip': 'জিলা তুলনা কৰক',
      'compare.noData': 'তুলনা ডেটা নাই',
      'trend.title': 'মাসিক প্রৱণতা',
      'trend.months': 'গত ১२ মাহ',
      'gender.distribution': 'লিঙ্গ বিতৰণ',
      'gender.male': 'পুৰুষ শ্ৰমিক',
      'gender.female': 'মহিলা শ্ৰমিক',
      'gender.transgender': 'ট্ৰান্সজেন্ডাৰ শ্ৰমিক',
      'project.categories': 'প্ৰকল্প শ্ৰেণী',
      'project.ruralRoads': 'গ্ৰামীণ পথ',
      'project.irrigation': 'সেচ',
      'project.waterStructures': 'জল কাঠামো',
      'location.detect': 'মোৰ অৱস্থান বিচাৰ কৰক',
      'location.detecting': 'অৱস্থান বিচাৰ কৰা হৈ আছে...',
      'action.share': 'ড্যাশবোর্ড শেয়াৰ কৰক',
      'action.download': 'প্ৰতিবেদন ডাউনলোড কৰক',
      'action.help': 'সহায়তা',
      'btn.submit': 'জমা দিয়ক',
      'btn.close': 'বন্ধ কৰক',
      'message.success': 'কাৰ্যক্ষমতা সফলভাৱে সম্পূৰ্ণ হৈছে',
      'message.error': 'এটা ত্ৰুটি হৈছে। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Read from localStorage or default to English
    interpolation: {
      escapeValue: false
    },
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation'
  });

// Save language preference to localStorage when language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;