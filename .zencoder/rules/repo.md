# Repository Information

## Project Metadata
- **Name**: MGNREGA Dashboard
- **Type**: Full-Stack Web Application (React + Node.js + MongoDB)
- **Repository**: C:\Users\VIKAS B M\Desktop\nrega
- **Test Framework**: Playwright
- **Language**: JavaScript/Node.js (Backend), JavaScript/React (Frontend)

## Technology Stack
- **Frontend**: React.js with i18n (multilingual support)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Testing**: Playwright (E2E tests)
- **Task Scheduling**: node-cron
- **Data Processing**: json2csv, pdfkit
- **Logging**: Winston

## Key Features Implemented
1. ✅ Multilingual Support (12 Indian regional languages)
2. ✅ Location Detection (GPS + reverse geocoding)
3. ✅ Accessibility Features (text-to-speech, font size control, high contrast)
4. ✅ PWA Support (offline functionality via service workers)
5. ✅ Scheduled Data Sync from data.gov.in
6. ✅ District Comparison Analytics
7. ✅ Gender Distribution Analytics
8. ✅ Project Category Breakdown

## Production Readiness Status
- **Phase 1+2 Score**: 6.5/10 (Up from 3.5/10)
- **Rural India Design**: 6.5/10 (Added error translations for 12 languages)
- **Production Architecture**: 5.2/10 (Added caching, pagination, request limits)

## Recent Improvements (Phase 1 & Phase 2)

### Phase 1: Quick Wins (✅ Completed)
1. ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
2. ✅ **Response Compression**: Gzip compression enabled
3. ✅ **Input Validation**: All API inputs validated with express-validator
4. ✅ **Database Indexes**: 8 comprehensive indexes added for query optimization

### Phase 2: Production Hardening (✅ Completed)
1. ✅ **Redis Caching Layer**: 
   - Cached states/districts queries (1-hour TTL)
   - Middleware-based automatic caching for GET requests
   - Fallback to direct query if Redis unavailable
   - Expected: 95% cache hit rate, 10-100ms response times

2. ✅ **Error Translation (12 Languages)**:
   - Hindi (हिंदी), Tamil (தமிழ்), Bengali (বাঙ্গালি), Marathi (मराठी)
   - Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Telugu (తెలుగు)
   - Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Odia (ଓଡ଼ିଆ), Urdu (اردو)
   - Service: `server/src/services/errorTranslationService.js`

3. ✅ **Pagination Support**:
   - Query parameters: `?limit=100&offset=0`
   - Default limit: 100, Max limit: 1000
   - Response format: `{ data: [...], pagination: { limit, offset, total, pages, currentPage } }`
   - Prevents memory bloat on large datasets

4. ✅ **Request Size Limits**:
   - Max body size: 10KB for express.urlencoded
   - Prevents large payload attacks
   - Rate limiting enforced per IP

### Validation Coverage:
- ✅ State/District parameters: Length, format, XSS prevention
- ✅ Latitude/Longitude: Range validation (-90 to 90, -180 to 180)
- ✅ Date ranges: YYYY-MM format validation
- ✅ Year/Month: Integer range validation

### Database Indexes:
- Compound: `{ state, district, year, month }`
- Individual: `{ state }`, `{ district }`, `{ year }`, `{ month }`
- Time-based: `{ state, year DESC, month DESC }`
- Timestamp: `{ lastUpdated DESC }`, `{ createdAt DESC }`

## Phase 3: User Experience & Scalability (Next 3 Months)

### 3.1: Voice Interface (Weeks 1-2)
- Audio-first navigation for low-literacy users
- Text-to-speech for all dashboard data
- Speech recognition for state/district selection
- Support for 12 regional languages
- Offline voice processing via Web Audio API

### 3.2: Visual Data Representations (Weeks 3-4)
- Pictorial representations instead of abstract numbers
- Icon-based metrics (👥 for workers, 💰 for expenditure, 📅 for workdays)
- Color-coded status indicators (green=good, yellow=warning, red=critical)
- Animated charts for trend visualization
- Mobile-friendly responsive design

### 3.3: Mobile App (Weeks 5-8)
- React Native app for iOS/Android
- Offline data sync
- Push notifications for updates
- Mobile-optimized UI with larger touch targets
- Support for low-bandwidth scenarios

### 3.4: Load Balancing & Deployment (Weeks 9-12)
- **Nginx Load Balancing**: Multiple server instances behind Nginx
- **Docker Containerization**: 
  - Dockerfile for Node.js backend
  - Docker Compose for multi-container setup
  - MongoDB + Redis containers
- **Kubernetes Orchestration** (optional): Auto-scaling, rolling updates
- **CI/CD Pipeline**: GitHub Actions for automated testing & deployment
- **SSL/TLS Certificates**: HTTPS enforcement

### Expected Improvements Post-Phase 3:
- **Performance**: 500ms average response time
- **Scalability**: Handle 10,000+ concurrent users
- **Accessibility**: WCAG 2.1 AA compliance
- **Production Score**: 8.5/10+

## File Structure Reference
- **Backend**: `/server/src/` (index.js, routes, models, services)
- **Frontend**: `/client/src/` (App.js, components, i18n.js)
- **Tests**: `/tests/e2e/` (Playwright test files)
- **Config**: `playwright.config.js`, `.env` files

## Database Models
- **District**: MGNREGA district-wise data with 30+ fields
- Indexes created for: state, district, year, month, timestamps

## API Endpoints
- `GET /api/districts/states` - List all states
- `GET /api/districts/states/:state/districts` - List districts by state
- `GET /api/districts/:state/:district` - District data with analytics
- `GET /api/districts/:state/compare/:district` - Compare with nearby districts
- `POST /api/districts/sync` - Trigger on-demand data sync
- `POST /api/districts/reverse-geocode` - Location detection from coordinates

## Environment Setup
- MongoDB connection: `process.env.MONGODB_URI`
- Server port: `process.env.PORT` (default 5000)
- Client port: 3000 (React dev server)

## Testing & QA
- Framework: Playwright
- Test location: `/tests/e2e/`
- Run tests: `npx playwright test`
- Current test coverage: 17 test cases for project description feature