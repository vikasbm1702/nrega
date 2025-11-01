const redis = require('redis');
const logger = require('../utils/logger');

let client = null;
let isConnected = false;

// Initialize Redis client (v4+ with promisified API)
const initializeCache = async () => {
  try {
    client = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis: Max reconnect attempts reached');
            return new Error('Redis max retries');
          }
          return Math.min(retries * 100, 3000);
        }
      }
    });

    client.on('error', (err) => {
      logger.warn('Redis Client Error:', err.message);
      isConnected = false;
    });

    client.on('connect', () => {
      logger.info('Redis cache connected successfully');
      isConnected = true;
    });

    client.on('ready', () => {
      logger.info('Redis cache is ready');
      isConnected = true;
    });

    // Connect to Redis
    await client.connect();
    isConnected = true;
    return client;
  } catch (error) {
    logger.warn('Redis initialization failed (cache disabled):', error.message);
    client = null;
    isConnected = false;
    return null;
  }
};

// Get cached data (Redis v4+ promisified API)
const get = async (key) => {
  try {
    if (!client || !isConnected) return null;
    
    const data = await client.get(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (parseErr) {
        logger.warn(`Cache parse error for key ${key}`);
        return null;
      }
    }
    return null;
  } catch (error) {
    logger.warn(`Cache get error for key ${key}:`, error.message);
    return null;
  }
};

// Set cached data with expiry (Redis v4+ promisified API)
const set = async (key, value, expirySeconds = 3600) => {
  try {
    if (!client || !isConnected) return false;

    await client.setEx(key, expirySeconds, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.warn(`Cache set error for key ${key}:`, error.message);
    return false;
  }
};

// Delete cached data (Redis v4+ promisified API)
const del = async (key) => {
  try {
    if (!client || !isConnected) return false;

    const response = await client.del(key);
    return response === 1;
  } catch (error) {
    logger.warn(`Cache delete error for key ${key}:`, error.message);
    return false;
  }
};

// Clear all cache (Redis v4+ promisified API)
const clear = async () => {
  try {
    if (!client || !isConnected) return false;

    await client.flushDb();
    logger.info('Cache flushed successfully');
    return true;
  } catch (error) {
    logger.warn('Cache flush error:', error.message);
    return false;
  }
};

// Middleware for caching GET requests
const cacheMiddleware = (expirySeconds = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests and if Redis is available
    if (req.method !== 'GET' || !client || !isConnected) {
      return next();
    }

    try {
      const key = `${req.originalUrl || req.url}`;
      const cachedData = await get(key);

      if (cachedData) {
        logger.debug(`Cache hit for ${key}`);
        return res.json(cachedData);
      }

      // Override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = function (data) {
        // Don't await, let it happen in background
        set(key, data, expirySeconds).catch(err => {
          logger.warn('Background cache set failed:', err.message);
        });
        return originalJson(data);
      };

      next();
    } catch (error) {
      logger.warn('Cache middleware error:', error.message);
      next();
    }
  };
};

// Disconnect Redis gracefully
const disconnect = async () => {
  if (client) {
    try {
      await client.quit();
      logger.info('Redis client disconnected gracefully');
    } catch (error) {
      logger.warn('Error disconnecting Redis:', error.message);
    }
  }
};

module.exports = {
  initializeCache,
  get,
  set,
  del,
  clear,
  cacheMiddleware,
  disconnect
};